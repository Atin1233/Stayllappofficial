import React, { useState } from 'react';
import { propertyAPI, listingAPI } from '../services/api';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare property data
      const propertyData = {
        ...formData,
        numberOfBedrooms: parseInt(formData.numberOfBedrooms.toString()),
        numberOfBathrooms: parseInt(formData.numberOfBathrooms.toString()),
        squareFootage: formData.squareFootage ? parseInt(formData.squareFootage) : null,
        rent: parseFloat(formData.rent),
        availabilityDate: new Date(formData.availabilityDate).toISOString(),
        amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
        photos: formData.photos.split(',').map(item => item.trim()).filter(Boolean),
      };

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

  return (
    <div className="max-w-4xl mx-auto p-6">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                Property Type *
              </label>
              <select
                id="propertyType"
                name="propertyType"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="studio">Studio</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="numberOfBedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms *
              </label>
              <input
                type="number"
                id="numberOfBedrooms"
                name="numberOfBedrooms"
                min="0"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.numberOfBedrooms}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="numberOfBathrooms" className="block text-sm font-medium text-gray-700">
                Bathrooms *
              </label>
              <input
                type="number"
                id="numberOfBathrooms"
                name="numberOfBathrooms"
                min="0"
                step="0.5"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.numberOfBathrooms}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                Square Footage
              </label>
              <input
                type="number"
                id="squareFootage"
                name="squareFootage"
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.squareFootage}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
                Monthly Rent *
              </label>
              <input
                type="number"
                id="rent"
                name="rent"
                min="0"
                step="0.01"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.rent}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.description}
              onChange={handleChange}
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
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Parking, Gym, Pool, WiFi"
              value={formData.amenities}
              onChange={handleChange}
            />
          </div>

          {/* Photos */}
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
              Photo URLs (comma-separated)
            </label>
            <input
              type="text"
              id="photos"
              name="photos"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
              value={formData.photos}
              onChange={handleChange}
            />
          </div>

          {/* Availability Date */}
          <div>
            <label htmlFor="availabilityDate" className="block text-sm font-medium text-gray-700">
              Availability Date *
            </label>
            <input
              type="date"
              id="availabilityDate"
              name="availabilityDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.availabilityDate}
              onChange={handleChange}
            />
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

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating Property...' : 'Create Property & Generate Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm; 