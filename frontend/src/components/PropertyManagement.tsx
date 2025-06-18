import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  squareFootage?: number;
  rent: number;
  description: string;
  amenities: string[];
  availabilityDate: string;
  photos: string[];
  propertyType: string;
  petFriendly: boolean;
  utilitiesIncluded: boolean;
  createdAt: string;
  updatedAt: string;
}

const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
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

  useEffect(() => {
    loadProperties();
  }, []);

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

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setEditForm({
      title: property.title,
      address: property.address,
      city: property.city,
      state: property.state,
      zip: property.zip,
      numberOfBedrooms: property.numberOfBedrooms,
      numberOfBathrooms: property.numberOfBathrooms,
      squareFootage: property.squareFootage?.toString() || '',
      rent: property.rent.toString(),
      description: property.description,
      amenities: property.amenities.join(', '),
      availabilityDate: new Date(property.availabilityDate).toISOString().split('T')[0],
      photos: property.photos.join(', '),
      propertyType: property.propertyType,
      petFriendly: property.petFriendly,
      utilitiesIncluded: property.utilitiesIncluded,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    setSaving(true);
    try {
      const propertyData = {
        ...editForm,
        numberOfBedrooms: parseInt(editForm.numberOfBedrooms.toString()),
        numberOfBathrooms: parseInt(editForm.numberOfBathrooms.toString()),
        squareFootage: editForm.squareFootage ? parseInt(editForm.squareFootage) : null,
        rent: parseFloat(editForm.rent),
        availabilityDate: new Date(editForm.availabilityDate).toISOString(),
        amenities: editForm.amenities.split(',').map(item => item.trim()).filter(Boolean),
        photos: editForm.photos.split(',').map(item => item.trim()).filter(Boolean),
      };

      await propertyAPI.update(editingProperty.id, propertyData);
      setEditingProperty(null);
      loadProperties(); // Reload the list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update property');
    } finally {
      setSaving(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Properties</h2>

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
            {properties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg p-6">
                {editingProperty?.id === property.id ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select
                          name="propertyType"
                          value={editForm.propertyType}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="condo">Condo</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="studio">Studio</option>
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                        onChange={handleChange}
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
                          onChange={handleChange}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pet Friendly</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="utilitiesIncluded"
                          checked={editForm.utilitiesIncluded}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Utilities Included</span>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setEditingProperty(null)}
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
                          onClick={() => handleEdit(property)}
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
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyManagement; 