import { Router } from 'express';
import {
  createProperty,
  getAllProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  bulkDeleteProperties,
  analyzeNewPropertyRent,
  analyzePropertyRent as analyzeExistingPropertyRent,
  exportProperties,
  analyzePropertyPhotos,
} from '../controllers/property.controller';
import { authenticateToken, requireLandlordOrAdmin } from '../middleware/auth.middleware';

/**
 * Express router for property-related routes
 * Handles property CRUD operations
 */
const router = Router();

/**
 * POST /
 * Creates a new property
 * 
 * Request body should contain property data matching PropertyCreate schema
 * Returns JSON with created property and success message
 */
// Temporarily removed authentication for development
router.post('/', createProperty);

/**
 * GET /
 * Retrieves all properties for dashboard display
 * 
 * Returns JSON with array of all properties and count
 */
router.get('/', getAllProperties);

/**
 * GET /:id
 * Retrieves a specific property by ID
 * 
 * Returns JSON with the requested property
 */
router.get('/:id', getProperty);

/**
 * PUT /:id
 * Updates a specific property by ID
 * 
 * Returns JSON with updated property
 */
router.put('/:id', authenticateToken, updateProperty);

/**
 * DELETE /:id
 * Deletes a specific property by ID
 * 
 * Returns JSON with success message
 */
router.delete('/:id', authenticateToken, deleteProperty);

/**
 * POST /:id/analyze-rent
 * Analyzes rent price for an existing property using AI
 * 
 * Returns JSON with rent analysis including suggested price and market comparison
 */
router.post('/:id/analyze-rent', authenticateToken, analyzeExistingPropertyRent);

/**
 * POST /analyze-rent
 * Analyzes rent price for a new property (without saving) using AI
 * 
 * Request body should contain property data for analysis
 * Returns JSON with rent analysis including suggested price and market comparison
 */
router.post('/analyze-rent', authenticateToken, analyzeNewPropertyRent);

/**
 * POST /:id/analyze-photos
 * Analyzes photos for a specific property
 * 
 * Returns JSON with photo analysis results
 */
router.post('/:id/analyze-photos', authenticateToken, analyzePropertyPhotos);

/**
 * POST /bulk-delete
 * Deletes multiple properties by ID
 * 
 * Returns JSON with success message
 */
router.post('/bulk-delete', authenticateToken, bulkDeleteProperties);

/**
 * POST /export
 * Exports properties
 * 
 * Returns JSON with success message
 */
router.post('/export', authenticateToken, exportProperties);

export default router; 