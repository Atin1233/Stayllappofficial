import React, { useState } from 'react';
import { propertyAPI, listingAPI } from '../services/api';
import RentAnalysis from './RentAnalysis';

interface PropertyFormProps {
  onPropertyCreated: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onPropertyCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    squareFootage: '',
    rent: '',
    description: '',
    amenities: '',
    availabilityDate: '',
    photos: '',
    propertyType: 'apartment',
    petFriendly: false,
    utilitiesIncluded: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showRentAnalysis, setShowRentAnalysis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate amenities and photos before submitting
    const amenitiesArr = formData.amenities.split(',').map(item => item.trim()).filter(Boolean);
    const photosArr = formData.photos.split(',').map(item => item.trim()).filter(Boolean);
    if (amenitiesArr.length === 0) {
      setError('Please enter at least one amenity (comma separated).');
      setLoading(false);
      return;
    }
    if (photosArr.length === 0) {
      setError('Please enter at least one photo URL (comma separated).');
      setLoading(false);
      return;
    }

    // Validate numeric fields
    const rent = parseFloat(formData.rent);
    if (isNaN(rent) || rent <= 0) {
      setError('Please enter a valid rent amount.');
      setLoading(false);
      return;
    }

    const squareFootage = formData.squareFootage ? parseInt(formData.squareFootage, 10) : undefined;
    if (formData.squareFootage && (isNaN(squareFootage) || squareFootage <= 0)) {
        setError('Please enter a valid square footage.');
        setLoading(false);
        return;
    }

    try {
      // Manually construct the object to ensure type correctness
      const propertyData: { [key: string]: any } = {
        title: formData.title,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        numberOfBedrooms: parseInt(formData.numberOfBedrooms.toString(), 10),
        numberOfBathrooms: parseFloat(formData.numberOfBathrooms.toString()),
        rent: rent,
        description: formData.description,
        amenities: amenitiesArr,
        availabilityDate: formData.availabilityDate ? new Date(formData.availabilityDate).toISOString() : new Date().toISOString(),
        photos: photosArr,
        propertyType: formData.propertyType,
        petFriendly: formData.petFriendly,
        utilitiesIncluded: formData.utilitiesIncluded,
      };

      if (squareFootage && !isNaN(squareFootage)) {
        propertyData.squareFootage = squareFootage;
      }

      console.log('Sending property data:', propertyData);

      // Create property
      const propertyResponse = await propertyAPI.create(propertyData);
      console.log('Property creation response:', propertyResponse.data);
      const propertyId = propertyResponse.data.property.id;

      // Try to generate listing (optional - don't fail if this doesn't work)
      try {
        await listingAPI.generateListing(propertyId);
        setSuccess('Property created and listing generated successfully!');
      } catch (listingError: any) {
        console.warn('Listing generation failed:', listingError);
        setSuccess('Property created successfully! (Listing generation failed - you can generate it later)');
      }

      setFormData({
        title: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        numberOfBedrooms: 1,
        numberOfBathrooms: 1,
        squareFootage: '',
        rent: '',
        description: '',
        amenities: '',
        availabilityDate: '',
        photos: '',
        propertyType: 'apartment',
        petFriendly: false,
        utilitiesIncluded: false,
      });

      onPropertyCreated();
    } catch (err: any) {
      console.error('Property creation error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleRentSuggested = (suggestedRent: number) => {
    setFormData({
      ...formData,
      rent: suggestedRent.toString()
    });
  };

  const canAnalyzeRent = formData.city && formData.state && formData.numberOfBedrooms && formData.numberOfBathrooms;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Property Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="numberOfBedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="numberOfBedrooms"
                      name="numberOfBedrooms"
                      min="0"
                      required
                      value={formData.numberOfBedrooms}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="numberOfBathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="numberOfBathrooms"
                      name="numberOfBathrooms"
                      min="0"
                      step="0.5"
                      required
                      value={formData.numberOfBathrooms}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                      Square Footage (sqft)
                    </label>
                    <input
                      type="number"
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
                      Monthly Rent ($)
                    </label>
                    <input
                      type="number"
                      id="rent"
                      name="rent"
                      required
                      value={formData.rent}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Rent Analysis Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowRentAnalysis(!showRentAnalysis)}
                  disabled={!canAnalyzeRent}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {showRentAnalysis ? 'Hide' : 'Get AI Rent Suggestions'}
                </button>
                {!canAnalyzeRent && (
                  <span className="text-sm text-gray-500">
                    Fill in city, state, bedrooms, and bathrooms to analyze rent
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the property, its features, and what makes it special..."
                />
              </div>

              {/* Amenities */}
              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., parking, gym, pool, washer/dryer"
                />
              </div>

              {/* Availability and Photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="availabilityDate" className="block text-sm font-medium text-gray-700">
                    Available Date
                  </label>
                  <input
                    type="date"
                    id="availabilityDate"
                    name="availabilityDate"
                    required
                    value={formData.availabilityDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                    Photo URLs (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="photos"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="petFriendly"
                    name="petFriendly"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.petFriendly}
                    onChange={handleChange}
                  />
                  <label htmlFor="petFriendly" className="ml-2 block text-sm text-gray-900">
                    Pet Friendly
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="utilitiesIncluded"
                    name="utilitiesIncluded"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.utilitiesIncluded}
                    onChange={handleChange}
                  />
                  <label htmlFor="utilitiesIncluded" className="ml-2 block text-sm text-gray-900">
                    Utilities Included
                  </label>
                </div>
              </div>

              <div className="mt-8">
                  <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-400"
                  >
                      {loading ? 'Creating Property...' : 'Create Property & Generate Listing'}
                  </button>
              </div>
            </form>
          </div>

          {/* Rent Analysis Tool */}
          <div className="bg-white shadow rounded-lg p-6">
            <RentAnalysis 
                propertyData={{
                    ...formData,
                    squareFootage: formData.squareFootage ? parseInt(formData.squareFootage, 10) : undefined,
                    rent: formData.rent ? parseFloat(formData.rent) : undefined,
                    amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
                }}
                onRentSuggested={handleRentSuggested}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm; 