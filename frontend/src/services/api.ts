import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      // Redirect to login page and clear history
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
};

// Property API
export const propertyAPI = {
  getAll: () => api.get('/properties'),
  getById: (id: string) => api.get(`/properties/${id}`),
  create: (propertyData: any) => api.post('/properties', propertyData),
  update: (id: string, propertyData: any) => api.put(`/properties/${id}`, propertyData),
  delete: (id: string) => api.delete(`/properties/${id}`),
  bulkDelete: (ids: string[]) => api.post('/properties/bulk-delete', { ids }),
  export: (ids?: string[]) => api.post('/properties/export', { ids }, { responseType: 'blob' }),
  exportJson: (ids?: string[]) => api.post('/properties/export', { ids, format: 'json' }, { responseType: 'blob' }),
  analyzeRent: (propertyId: string) => api.post(`/properties/${propertyId}/analyze-rent`),
  analyzeNewPropertyRent: (propertyData: any) => api.post('/properties/analyze-rent', propertyData),
  analyzePhotos: (id: string) => api.post(`/properties/${id}/analyze-photos`),
};

// Listing API
export const listingAPI = {
  getAll: () => api.get('/listings'),
  getById: (id: string) => api.get(`/listings/${id}`),
  create: (listingData: any) => api.post('/listings', listingData),
  generateListing: (propertyId: string) => api.post(`/listings/generate-listing`, { propertyId }),
  delete: (id: string) => api.delete(`/listings/${id}`),
};

// Analytics API
export const analyticsAPI = {
  recordView: (listingId: string, viewDuration: number) => 
    api.post(`/analytics/listings/${listingId}/view`, { viewDuration }),
  recordInquiry: (listingId: string) => 
    api.post(`/analytics/listings/${listingId}/inquiry`),
  recordFavorite: (listingId: string) => 
    api.post(`/analytics/listings/${listingId}/favorite`),
  getListingAnalytics: (listingId: string) => 
    api.get(`/analytics/listings/${listingId}`),
  getUserListingsAnalytics: () => 
    api.get('/analytics/user/listings'),
  getDashboardSummary: () => api.get('/analytics/summary')
};

export default api; 