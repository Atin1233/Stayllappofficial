import { Router, RequestHandler } from 'express';
import { generateListing, getAllListings, deleteListing } from '../controllers/listing.controller';
import { authenticateToken } from '../middleware/auth.middleware';

/**
 * Express router for listing-related routes
 * Handles AI-powered rental listing generation
 */
const router = Router();

/**
 * POST /generate-listing
 * Generates an AI-powered rental listing from property data
 * 
 * Request body should contain property data matching PropertyCreate schema
 * Returns JSON with generated listing text and listing ID
 */
// Temporarily removed authentication for development
router.post('/generate-listing', generateListing as RequestHandler);

/**
 * GET /
 * Retrieves all generated listings for dashboard display
 * 
 * Returns JSON with array of all listings and count
 */
router.get('/', getAllListings as RequestHandler);

/**
 * DELETE /:id
 * Deletes a listing by its ID
 */
router.delete('/:id', deleteListing as RequestHandler);

export default router; 