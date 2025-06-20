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

const ListingCard: React.FC<{ listing: Listing; onInquiry: (id: string) => void; onFavorite: (id: string) => void; onCopy: (text: string, id: string) => void; copiedId: string | null; }> = ({ listing, onInquiry, onFavorite, onCopy, copiedId }) => {
  const analyticsRef = useListingAnalytics(listing.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div ref={analyticsRef} key={listing.id} className="bg-white shadow rounded-lg p-6">
      {/* Property Info Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {listing.property ? listing.property.title : <span className="text-red-500">[No property data]</span>}
            </h3>
            <p className="text-gray-600">
              {listing.property ? `${listing.property.address}, ${listing.property.city}, ${listing.property.state}` : <span className="text-red-500">[No address]</span>}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{listing.property ? `${listing.property.numberOfBedrooms} bed` : ''}</span>
              <span>{listing.property ? `${listing.property.numberOfBathrooms} bath` : ''}</span>
              <span>{listing.property ? `$${listing.property.rent}/month` : ''}</span>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>Created: {formatDate(listing.createdAt)}</div>
          </div>
        </div>
      </div>

      {/* Listing Text */}
      <div className="mb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {listing.listingText}
          </div>
        </div>
      </div>

      {/* Updated Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button
            onClick={() => onCopy(listing.listingText, listing.id)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
              copiedId === listing.id
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {copiedId === listing.id ? 'Copied!' : 'Copy Listing'}
          </button>

          <button
            onClick={() => onInquiry(listing.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Inquire
          </button>

          <button
            onClick={() => onFavorite(listing.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Favorite
          </button>
        </div>

        <div className="text-sm text-gray-500">
          ID: {listing.id}
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

  useEffect(() => {
    let isMounted = true;

    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await listingAPI.getAll();
        if (isMounted) {
          setListings(response.data.listings || []);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.error || 'Failed to fetch listings');
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      isMounted = false;
    };
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-500">Create your first property to generate a listing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Listings</h2>
        <p className="text-gray-600 mt-1">Manage and copy your AI-generated property listings</p>
      </div>

      <div className="space-y-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onInquiry={handleInquiry}
            onFavorite={handleFavorite}
            onCopy={copyToClipboard}
            copiedId={copiedId}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingsDisplay; 