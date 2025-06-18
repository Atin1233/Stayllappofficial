import { Router, RequestHandler } from 'express';
import { createProperty, getAllProperties, getProperty, deleteProperty } from '../controllers/property.controller';

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
router.post('/', createProperty as RequestHandler);

/**
 * GET /
 * Retrieves all properties for dashboard display
 * 
 * Returns JSON with array of all properties and count
 */
router.get('/', getAllProperties as RequestHandler);

/**
 * GET /:id
 * Retrieves a specific property by ID
 * 
 * Returns JSON with the requested property
 */
router.get('/:id', getProperty as RequestHandler);

/**
 * DELETE /:id
 * Deletes a specific property by ID
 * 
 * Returns JSON with success message
 */
router.delete('/:id', deleteProperty as RequestHandler);

export default router; 