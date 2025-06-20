import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  recordListingView,
  recordListingInquiry,
  recordListingFavorite,
  getListingAnalytics,
  getUserListingsAnalytics
} from '../controllers/analytics.controller';

const router = Router();

// Public routes (no authentication required)
router.post('/listings/:listingId/view', recordListingView);
router.post('/listings/:listingId/inquiry', recordListingInquiry);
router.post('/listings/:listingId/favorite', recordListingFavorite);

// Protected routes (authentication required)
router.get('/listings/:listingId', authenticateToken, getListingAnalytics);
router.get('/user/listings', authenticateToken, getUserListingsAnalytics);

export default router; 