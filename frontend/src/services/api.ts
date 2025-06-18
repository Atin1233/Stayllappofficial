import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
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
};

// Listing API
export const listingAPI = {
  getAll: () => api.get('/listings'),
  getById: (id: string) => api.get(`/listings/${id}`),
  create: (listingData: any) => api.post('/listings', listingData),
  generateListing: (propertyId: string) => api.post(`/listings/generate-listing`, { propertyId }),
  delete: (id: string) => api.delete(`/listings/${id}`),
};

export default api; 