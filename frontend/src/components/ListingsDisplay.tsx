import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { listingAPI, analyticsAPI } from '../services/api';

interface Listing {
  id: string;
  listingText: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    rent: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
  };
}

// Custom hook for tracking listing analytics
const useListingAnalytics = (listingId: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const viewTrackedRef = useRef(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Start tracking when listing is visible
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        if (!viewTrackedRef.current) {
          // Record an initial view after 2 seconds
          analyticsAPI.recordView(listingId, 2); 
          viewTrackedRef.current = true; // Mark as viewed
        }
      }, 2000);
    } else {
      // Clear timer and record total view duration when out of view
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (startTimeRef.current && viewTrackedRef.current) {
        const duration = (Date.now() - startTimeRef.current) / 1000;
        analyticsAPI.recordView(listingId, duration);
        startTimeRef.current = null; // Reset start time
      }
    }
  }, [listingId]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // observes intersections relative to the viewport
      threshold: 0.5, // 50% of the item must be visible
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  return ref; // Return the ref to be attached to the component
};

const ListingCard: React.FC<{ 
  listing: Listing; 
  onInquiry: (id: string) => void; 
  onFavorite: (id: string) => void; 
  onCopy: (text: string, id: string) => void; 
  onDelete: (id: string) => void;
  copiedId: string | null; 
}> = ({ listing, onInquiry, onFavorite, onCopy, onDelete, copiedId }) => {
  const analyticsRef = useListingAnalytics(listing.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div ref={analyticsRef} key={listing.id} className="card p-6 group hover:scale-[1.02] transition-all duration-300">
      {/* Property Info Header */}
      <div className="border-b border-surface-600/30 pb-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {listing.property ? listing.property.title : <span className="text-destructive-400">[No property data]</span>}
            </h3>
            <p className="text-surface-300">
              {listing.property ? `${listing.property.address}, ${listing.property.city}, ${listing.property.state}` : <span className="text-destructive-400">[No address]</span>}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-surface-400">
              <span>{listing.property ? `${listing.property.numberOfBedrooms} bed` : ''}</span>
              <span>{listing.property ? `${listing.property.numberOfBathrooms} bath` : ''}</span>
              <span>{listing.property ? `$${listing.property.rent}/month` : ''}</span>
            </div>
          </div>
          <div className="text-right text-sm text-surface-400">
            <div>Created: {formatDate(listing.createdAt)}</div>
          </div>
        </div>
      </div>

      {/* Listing Text */}
      <div className="mb-4">
        <div className="bg-surface-700/50 rounded-lg p-4 border border-surface-600/30">
          <div className="whitespace-pre-wrap text-surface-200 leading-relaxed">
            {listing.listingText}
          </div>
        </div>
      </div>

      {/* Updated Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button
            onClick={() => onCopy(listing.listingText, listing.id)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg ${
              copiedId === listing.id
                ? 'bg-success-600 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200`}
          >
            {copiedId === listing.id ? 'Copied!' : 'Copy Listing'}
          </button>

          <button
            onClick={() => onInquiry(listing.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-success-600 hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-500 transition-colors duration-200"
          >
            Inquire
          </button>

          <button
            onClick={() => onFavorite(listing.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            Favorite
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onDelete(listing.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-destructive-600 hover:bg-destructive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive-500 transition-colors duration-200"
          >
            Delete
          </button>
          <div className="text-sm text-surface-400">
            ID: {listing.id}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingsDisplay: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listingAPI.getAll();
      setListings(response.data.listings || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const copyToClipboard = async (text: string, listingId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(listingId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInquiry = async (listingId: string) => {
    try {
      await analyticsAPI.recordInquiry(listingId);
      toast.success('Inquiry sent! A representative will be in touch.');
    } catch (err) {
      console.error('Failed to record inquiry:', err);
      toast.error('Could not send inquiry.');
    }
  };

  const handleFavorite = async (listingId: string) => {
    try {
      await analyticsAPI.recordFavorite(listingId);
      toast.success('Added to favorites!');
    } catch (err) {
      console.error('Failed to record favorite:', err);
      toast.error('Could not add to favorites.');
    }
  };

  const handleDelete = async (listingId: string) => {
    if (window.confirm('Are you sure you want to delete this listing permanently?')) {
      try {
        await listingAPI.delete(listingId);
        toast.success('Listing deleted successfully.');
        fetchListings(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete listing:', err);
        toast.error('Could not delete the listing.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Your Listings</h1>
          <div className="w-24 sm:w-32 h-10 bg-surface-600 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 lg:p-6 animate-pulse">
              <div className="h-5 lg:h-6 bg-surface-600 rounded mb-3 lg:mb-4"></div>
              <div className="h-3 lg:h-4 bg-surface-600 rounded w-3/4 mb-2"></div>
              <div className="h-3 lg:h-4 bg-surface-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
        <div className="card p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-destructive-400 text-lg lg:text-xl">!</span>
            </div>
            <div>
              <p className="text-destructive-400 font-medium">{error}</p>
              <p className="text-surface-400 text-sm">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
        <div className="card p-8 lg:p-16 text-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
            <span className="text-primary-400 text-2xl lg:text-3xl">📄</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">No listings yet</h2>
          <p className="text-surface-400 text-base lg:text-lg mb-6 lg:mb-8 max-w-md mx-auto">
            Create your first property to generate a listing. Your AI-generated listings will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Your Listings</h1>
          <p className="text-base lg:text-lg text-surface-300">Manage and copy your AI-generated property listings</p>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onInquiry={handleInquiry}
            onFavorite={handleFavorite}
            onCopy={copyToClipboard}
            onDelete={handleDelete}
            copiedId={copiedId}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingsDisplay; 