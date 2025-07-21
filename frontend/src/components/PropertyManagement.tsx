import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI, listingAPI } from '../services/api';
import { Toaster, toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { type Property as PropertyModel } from '../../../src/models/Property';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Combine the imported model with the ID since the ID comes from the store, not the model schema
type Property = PropertyModel & { id: string };

type EditFormState = Omit<Partial<Property>, 'amenities' | 'photos'> & {
  amenities: string; // Stored as a comma-separated string for the form
  photos: string; // Stored as a comma-separated string for the form
};

interface PhotoAnalysisResult {
  overallFeedback: string;
  suggestions: string[];
  missingPhotos: string[];
  photoSpecificFeedback: Array<{
    photoUrl: string;
    feedback: string;
  }>;
}

const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  // const [saving, setSaving] = useState(false); // unused
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  // const [generateError, setGenerateError] = useState(''); // unused
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analyzingPropertyId, setAnalyzingPropertyId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState<EditFormState>({
    title: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    rent: 0,
    description: '',
    amenities: '',
    availabilityDate: new Date(),
    photos: '',
    propertyType: 'house',
    petFriendly: false,
    utilitiesIncluded: false,
  });

  const loadProperties = async () => {
    try {
      const response = await propertyAPI.getAll();
      setProperties(response.data.properties);
    } catch (err: any) {
      setError('Failed to load properties');
      console.error('Properties load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        const response = await propertyAPI.getAll();
        if (isMounted) {
          setProperties(response.data.properties);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Failed to load properties');
          console.error('Properties load error:', err);
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setEditForm(prev => ({ ...prev, [name]: checked }));
    } else {
        setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPropertyId) return;

    try {
        const updates = {
            ...editForm,
            // Convert comma-separated strings back to arrays
            amenities: editForm.amenities.split(',').map(s => s.trim()).filter(Boolean),
            photos: editForm.photos.split(',').map(s => s.trim()).filter(Boolean),
            // Convert string numbers to actual numbers
            numberOfBedrooms: Number(editForm.numberOfBedrooms),
            numberOfBathrooms: Number(editForm.numberOfBathrooms),
            rent: Number(editForm.rent),
        };
        
      await propertyAPI.update(editingPropertyId, updates);
      toast.success('Property updated successfully');
      setEditingPropertyId(null);
      loadProperties(); // Refresh the list
    } catch (error) {
      console.error('Failed to update property', error);
      toast.error('Failed to update property');
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await propertyAPI.delete(propertyId);
      loadProperties(); // Reload the list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete property');
    }
  };

  const handleGenerateListing = async (propertyId: string) => {
    setGeneratingId(propertyId);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) {
        alert('User ID not found. Please log in again.');
        setGeneratingId(null);
        return;
      }
      await listingAPI.generateListing(propertyId, userId);
      // Only update state if the component is still mounted
      if (generatingId === propertyId) {
        alert('Listing generated! Check the listings tab.');
        setGeneratingId(null);
      }
    } catch (err: any) {
      // Only update state if the component is still mounted
      if (generatingId === propertyId) {
        alert(err.response?.data?.error || 'Failed to generate listing');
        setGeneratingId(null);
      }
    }
  };

  const handleSelectProperty = (propertyId: string) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProperties(properties.map(p => p.id));
    } else {
      setSelectedProperties([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) {
      toast.error("No properties selected.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
      return;
    }

    try {
      // This endpoint doesn't exist yet, we'll create it.
      await propertyAPI.bulkDelete(selectedProperties);
      toast.success("Properties deleted successfully.");
      setSelectedProperties([]);
      loadProperties(); // Reload the list
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete properties.");
    }
  };

  const handleExportFormat = async () => {
    try {
      let response;
      let fileType;
      let fileName;
      if (exportFormat === 'json') {
        response = await propertyAPI.exportJson(selectedProperties);
        fileType = 'application/json;charset=utf-8;';
        fileName = 'properties.json';
      } else {
        response = await propertyAPI.export(selectedProperties);
        fileType = 'text/csv;charset=utf-8;';
        fileName = 'properties.csv';
      }
      const blob = new Blob([response.data], { type: fileType });
      saveAs(blob, fileName);
      toast.success(`Successfully exported ${selectedProperties.length} properties to ${exportFormat.toUpperCase()}.`);
    } catch (error) {
      console.error(`Failed to export properties as ${exportFormat}:`, error);
      toast.error(`Failed to export properties. Please try again.`);
    }
  };

  const handleAnalyzePhotos = async (propertyId: string) => {
    setAnalysisLoading(true);
    setAnalyzingPropertyId(propertyId);
    setAnalysisResult(null); // Clear previous results
    try {
      const response = await propertyAPI.analyzePhotos(propertyId);
      if (response.data.success) {
        setAnalysisResult(response.data.analysis);
        toast.success('Photo analysis successful!');
      } else {
        toast.error(response.data.error || 'Failed to analyze photos.');
      }
    } catch (error) {
      console.error('Failed to analyze photos:', error);
      toast.error('An error occurred during photo analysis.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Manage Properties</h1>
          <div className="flex items-center space-x-4">
            <div className="w-24 sm:w-32 h-10 bg-surface-600 rounded-lg animate-pulse"></div>
            <div className="w-24 sm:w-32 h-10 bg-surface-600 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, i) => (
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

  return (
    <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Manage Properties</h1>
          <p className="text-base lg:text-lg text-surface-300">View and manage your property portfolio</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {selectedProperties.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-destructive-500 text-destructive-400 rounded-lg hover:bg-destructive-500/10 focus:outline-none focus:ring-2 focus:ring-destructive-500 focus:ring-offset-2 transition-colors duration-200 text-sm"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              <span>Delete ({selectedProperties.length})</span>
            </button>
          )}
          <div className="flex items-center space-x-2">
            <select
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value as 'csv' | 'json')}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
            <button
              onClick={handleExportFormat}
              className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-surface-700/50 border border-surface-600/50 text-white rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 text-sm"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              <span>Export {selectedProperties.length > 0 ? `(${selectedProperties.length})` : 'All'}</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="card p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive-500/20 rounded-2xl flex items-center justify-center">
              <XMarkIcon className="h-5 w-5 lg:h-6 lg:w-6 text-destructive-400" />
            </div>
            <div>
              <p className="text-destructive-400 font-medium">{error}</p>
              <p className="text-surface-400 text-sm">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      )}

      {properties.length === 0 ? (
        <div className="card p-8 lg:p-16 text-center">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-3xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
            <PlusIcon className="h-10 w-10 lg:h-12 lg:w-12 text-primary-400" />
          </div>
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">No properties yet</h2>
          <p className="text-surface-400 text-base lg:text-lg mb-6 lg:mb-8 max-w-md mx-auto">
            Get started by adding your first property to your portfolio. You'll be able to manage listings, track analytics, and more.
          </p>
          <Link
            to="/add-property"
            className="inline-flex items-center px-4 py-3 lg:px-6 lg:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
            <span>Add New Property</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8">
          {/* Select All Controls */}
          <div className="card p-4 lg:p-6">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <label className="flex items-center space-x-2 lg:space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedProperties.length === properties.length && properties.length > 0}
                  className="w-4 h-4 lg:w-5 lg:h-5 text-primary-600 bg-surface-700 border-surface-600 rounded-lg focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-white font-medium text-sm lg:text-base">Select All Properties</span>
              </label>
              {selectedProperties.length > 0 && (
                <span className="text-surface-400 text-xs lg:text-sm">
                  {selectedProperties.length} of {properties.length} selected
                </span>
              )}
            </div>
          </div>

          {/* Properties Grid - Responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {properties.map((property) => (
              <div key={property.id} className="card p-6 group hover:scale-[1.02] transition-all duration-300">
                {/* Property Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="w-5 h-5 text-primary-600 bg-surface-700 border-surface-600 rounded-lg focus:ring-primary-500 focus:ring-2"
                    />
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                      <HomeIcon className="h-6 w-6 text-primary-400" />
                    </div>
                  </div>
                </div>

                {editingPropertyId === property.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">Type</label>
                        <select
                          name="propertyType"
                          value={editForm.propertyType}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="condo">Condo</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-300 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={editForm.city}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={editForm.state}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">ZIP</label>
                        <input
                          type="text"
                          name="zip"
                          value={editForm.zip}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">Bedrooms</label>
                        <input
                          type="number"
                          name="numberOfBedrooms"
                          value={editForm.numberOfBedrooms}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">Bathrooms</label>
                        <input
                          type="number"
                          name="numberOfBathrooms"
                          value={editForm.numberOfBathrooms}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">Rent ($)</label>
                        <input
                          type="number"
                          name="rent"
                          value={editForm.rent}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="petFriendly"
                          checked={editForm.petFriendly}
                          onChange={handleEditChange}
                          className="w-5 h-5 text-primary-600 bg-surface-700 border-surface-600 rounded-lg focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="text-surface-300 text-sm">Pet Friendly</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="utilitiesIncluded"
                          checked={editForm.utilitiesIncluded}
                          onChange={handleEditChange}
                          className="w-5 h-5 text-primary-600 bg-surface-700 border-surface-600 rounded-lg focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="text-surface-300 text-sm">Utilities Included</span>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingPropertyId(null)}
                        className="px-6 py-3 bg-surface-700/50 border border-surface-600/50 text-white rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        // disabled={saving} // unused
                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                      >
                        {/* {saving ? ( // unused
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                            <span>Saving...</span>
                          </>
                        ) : ( */}
                          <>
                            <CheckIcon className="h-5 w-5 inline mr-2" />
                            <span>Save Changes</span>
                          </>
                        {/* )} */}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Property Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
                        <p className="text-surface-400 text-sm">{property.address}, {property.city}, {property.state} {property.zip}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-surface-400 text-sm">Type:</span>
                          <span className="text-white font-medium capitalize">{property.propertyType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-surface-400 text-sm">Bedrooms:</span>
                          <span className="text-white font-medium">{property.numberOfBedrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-surface-400 text-sm">Bathrooms:</span>
                          <span className="text-white font-medium">{property.numberOfBathrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-surface-400 text-sm">Rent:</span>
                          <span className="text-white font-medium">${property.rent}/month</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {property.petFriendly && (
                          <span className="bg-success-500/20 text-success-400 px-3 py-1 rounded-full text-xs font-medium">
                            Pet Friendly
                          </span>
                        )}
                        {property.utilitiesIncluded && (
                          <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-xs font-medium">
                            Utilities Included
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleGenerateListing(property.id)}
                        // disabled={generatingId === property.id} // unused
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        <span>{generatingId === property.id ? 'Generating...' : 'Generate Listing'}</span>
                      </button>
                      
                      <button
                        onClick={() => handleAnalyzePhotos(property.id)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-surface-700/50 border border-surface-600/50 text-white font-medium rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                        disabled={analysisLoading && analyzingPropertyId === property.id}
                      >
                        <PhotoIcon className="h-4 w-4 mr-2" />
                        <span>{analysisLoading && analyzingPropertyId === property.id ? 'Analyzing...' : 'Analyze Photos'}</span>
                      </button>
                      
                      <button
                        onClick={() => setEditingPropertyId(property.id)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-surface-700/50 border border-surface-600/50 text-white font-medium rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        <span>Edit Property</span>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-destructive-500 text-destructive-400 font-medium rounded-lg hover:bg-destructive-500/10 focus:outline-none focus:ring-2 focus:ring-destructive-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        <span>Delete Property</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #475569',
            borderRadius: '12px',
          },
        }}
      />

      {/* Analysis Section */}
      {analyzingPropertyId && (
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Photo Analysis</h2>
          {analysisLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-surface-300">Analyzing photos, this may take a moment...</p>
              </div>
            </div>
          )}
          {analysisResult && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Overall Feedback:</h3>
                <p className="text-surface-300 leading-relaxed">{analysisResult.overallFeedback}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Suggestions:</h3>
                <ul className="space-y-2">
                  {analysisResult.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-surface-300">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Missing Photo Types:</h3>
                <ul className="space-y-2">
                  {analysisResult.missingPhotos.map((p, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-surface-300">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Photo-Specific Feedback:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysisResult.photoSpecificFeedback.map((p, i) => (
                    <div key={i} className="card p-4">
                      <img src={p.photoUrl} alt="Analyzed property" className="w-full h-48 object-cover rounded-xl mb-4"/>
                      <p className="text-surface-300 text-sm">{p.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyManagement; 