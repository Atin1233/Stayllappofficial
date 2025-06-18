import React, { useState, useEffect } from 'react';
import { listingAPI } from '../services/api';

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

const ListingsDisplay: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      console.log('Fetching listings...');
      const response = await listingAPI.getAll();
      console.log('Listings response:', response.data);
      setListings(response.data.listings || []);
    } catch (err: any) {
      console.error('Error fetching listings:', err);
      setError(err.response?.data?.error || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, listingId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(listingId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(listingId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <div key={listing.id} className="bg-white shadow rounded-lg p-6">
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
                  <div>Updated: {formatDate(listing.updatedAt)}</div>
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

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => copyToClipboard(listing.listingText, listing.id)}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    copiedId === listing.id
                      ? 'bg-green-600 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {copiedId === listing.id ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Listing
                    </>
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(listing.property ? listing.property.title : '', `${listing.id}-title`)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={!listing.property}
                >
                  Copy Title
                </button>
              </div>

              <div className="text-sm text-gray-500">
                ID: {listing.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="text-center">
          <p className="text-gray-600">
            Total Listings: <span className="font-semibold text-gray-900">{listings.length}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Click "Copy Listing" to copy the full listing text to your clipboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingsDisplay; 