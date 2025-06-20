import React, { useState, useEffect, useCallback } from 'react';
import { propertyAPI, listingAPI } from '../services/api';
import { Toaster, toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { type Property as PropertyModel } from '../../../src/models/Property';

// Combine the imported model with the ID since the ID comes from the store, not the model schema
type Property = PropertyModel & { id: string };

type EditFormState = Omit<Partial<Property>, 'amenities' | 'photos'> & {
  amenities: string; // Stored as a comma-separated string for the form
  photos: string; // Stored as a comma-separated string for the form
};

type PhotoAnalysisResult = {
  overallFeedback: string;
  suggestions: string[];
  missingPhotos: string[];
  photoSpecificFeedback: {
    photoUrl: string;
    feedback: string;
  }[];
};

const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState('');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

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
    setGenerateError('');
    try {
      await listingAPI.generateListing(propertyId);
      // Only update state if the component is still mounted
      if (generatingId === propertyId) {
        alert('Listing generated! Check the listings tab.');
        setGeneratingId(null);
      }
    } catch (err: any) {
      // Only update state if the component is still mounted
      if (generatingId === propertyId) {
        setGenerateError(err.response?.data?.error || 'Failed to generate listing');
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
    setAnalysisModalOpen(true);
    try {
      const response = await propertyAPI.analyzePhotos(propertyId);
      if (response.data.success) {
        setAnalysisResult(response.data.analysis);
        toast.success('Photo analysis successful!');
      } else {
        toast.error(response.data.error || 'Failed to analyze photos.');
        setAnalysisModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to analyze photos:', error);
      toast.error('An error occurred during photo analysis.');
      setAnalysisModalOpen(false);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const closeAnalysisModal = () => {
    setAnalysisModalOpen(false);
    setAnalysisResult(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Properties</h2>
          <div className="flex space-x-2">
            {selectedProperties.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Selected ({selectedProperties.length})
              </button>
            )}
            <select
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value as 'csv' | 'json')}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON (Syndication)</option>
            </select>
            <button
              onClick={handleExportFormat}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Export {selectedProperties.length > 0 ? `(${selectedProperties.length})` : 'All'} as {exportFormat.toUpperCase()}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found. Add your first property to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 border-b">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedProperties.length === properties.length && properties.length > 0}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">Select All</label>
            </div>
            {properties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-6 flex items-start">
                <input
                  type="checkbox"
                  checked={selectedProperties.includes(property.id)}
                  onChange={() => handleSelectProperty(property.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                />
                <div className="ml-4 flex-grow">
                  {editingPropertyId === property.id ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Property Type</label>
                          <select
                            name="propertyType"
                            value={editForm.propertyType}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="any">Any</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="condo">Condo</option>
                            <option value="cooperative">Cooperative</option>
                            <option value="mobile_home">Mobile Home</option>
                            <option value="planned_development">Planned Development</option>
                            <option value="multiplex">Multiplex</option>
                            <option value="duplex">Duplex</option>
                            <option value="triplex">Triplex</option>
                            <option value="four_plex">Four Plex</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={editForm.address}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={editForm.city}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            value={editForm.state}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">ZIP</label>
                          <input
                            type="text"
                            name="zip"
                            value={editForm.zip}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                          <input
                            type="number"
                            name="numberOfBedrooms"
                            value={editForm.numberOfBedrooms}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                          <input
                            type="number"
                            name="numberOfBathrooms"
                            value={editForm.numberOfBathrooms}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Rent ($)</label>
                          <input
                            type="number"
                            name="rent"
                            value={editForm.rent}
                            onChange={handleEditChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="petFriendly"
                            checked={editForm.petFriendly}
                            onChange={handleEditChange}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="utilitiesIncluded"
                            checked={editForm.utilitiesIncluded}
                            onChange={handleEditChange}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Utilities Included</span>
                        </label>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditingPropertyId(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                          <p className="text-gray-600">{property.address}, {property.city}, {property.state} {property.zip}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingPropertyId(property.id)}
                            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Type:</span> {property.propertyType}
                        </div>
                        <div>
                          <span className="font-medium">Bedrooms:</span> {property.numberOfBedrooms}
                        </div>
                        <div>
                          <span className="font-medium">Bathrooms:</span> {property.numberOfBathrooms}
                        </div>
                        <div>
                          <span className="font-medium">Rent:</span> ${property.rent}/month
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        <p>{property.description}</p>
                      </div>

                      <div className="mt-4 flex space-x-4 text-sm">
                        {property.petFriendly && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Pet Friendly</span>
                        )}
                        {property.utilitiesIncluded && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Utilities Included</span>
                        )}
                        <button
                          onClick={() => handleGenerateListing(property.id)}
                          disabled={generatingId === property.id}
                          className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 disabled:opacity-50"
                        >
                          {generatingId === property.id ? 'Generating...' : 'Generate Listing'}
                        </button>
                        {generateError && (
                          <div className="text-red-600 mt-2">{generateError}</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleAnalyzePhotos(property.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Analyze Photos
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster position="bottom-right" />
      {isAnalysisModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Photo Analysis</h3>
              <div className="mt-2 px-7 py-3">
                {analysisLoading ? (
                  <p>Analyzing photos...</p>
                ) : (
                  analysisResult && (
                    <div className="text-sm text-gray-700 text-left">
                      <h4 className="font-semibold">Overall Feedback:</h4>
                      <p>{analysisResult.overallFeedback}</p>

                      <h4 className="font-semibold mt-4">Suggestions:</h4>
                      <ul className="list-disc list-inside">
                        {analysisResult.suggestions.map((suggestion, i) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>

                      <h4 className="font-semibold mt-4">Missing Photos:</h4>
                       <ul className="list-disc list-inside">
                        {analysisResult.missingPhotos.map((photo, i) => (
                          <li key={i}>{photo}</li>
                        ))}
                      </ul>

                      <h4 className="font-semibold mt-4">Photo-Specific Feedback:</h4>
                      {analysisResult.photoSpecificFeedback.map((item, i) => (
                        <div key={i} className="mt-2">
                          <img src={item.photoUrl} alt="property" className="w-32 h-32 object-cover rounded-md inline-block mr-4"/>
                          <p className="inline-block align-top w-2/3">{item.feedback}</p>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeAnalysisModal}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement; 