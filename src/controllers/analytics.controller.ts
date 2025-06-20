import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    userType: string;
  };
}

const analyticsService = new AnalyticsService();

/**
 * Record a view for a listing
 */
export async function recordListingView(req: Request, res: Response): Promise<void> {
  try {
    const listingId = req.params.listingId;
    const { viewDuration } = req.body;

    if (!listingId) {
      res.status(400).json({
        success: false,
        error: 'Listing ID is required'
      });
      return;
    }

    await analyticsService.recordView(listingId, viewDuration || 0);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to record listing view'
    });
  }
}

/**
 * Record an inquiry for a listing
 */
export async function recordListingInquiry(req: Request, res: Response): Promise<void> {
  try {
    const listingId = req.params.listingId;
    
    if (!listingId) {
      res.status(400).json({
        success: false,
        error: 'Listing ID is required'
      });
      return;
    }

    await analyticsService.recordInquiry(listingId);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to record listing inquiry'
    });
  }
}

/**
 * Record a favorite action for a listing
 */
export async function recordListingFavorite(req: Request, res: Response): Promise<void> {
  try {
    const listingId = req.params.listingId;
    
    if (!listingId) {
      res.status(400).json({
        success: false,
        error: 'Listing ID is required'
      });
      return;
    }

    await analyticsService.recordFavorite(listingId);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to record listing favorite'
    });
  }
}

/**
 * Get analytics for a specific listing
 */
export async function getListingAnalytics(req: Request, res: Response): Promise<void> {
  try {
    const listingId = req.params.listingId;
    
    if (!listingId) {
      res.status(400).json({
        success: false,
        error: 'Listing ID is required'
      });
      return;
    }

    const analytics = await analyticsService.getListingAnalytics(listingId);
    
    if (!analytics) {
      res.status(404).json({
        success: false,
        error: 'Analytics not found for this listing'
      });
      return;
    }

    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get listing analytics'
    });
  }
}

/**
 * Get analytics for all listings owned by the user
 */
export async function getUserListingsAnalytics(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }

    const analytics = await analyticsService.getUserListingsAnalytics(userId);
    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get user listings analytics'
    });
  }
}

/**
 * Get summary analytics for the user's dashboard
 */
export async function getDashboardSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, error: 'User not authenticated' });
      return;
    }

    const summary = await analyticsService.getDashboardSummary(userId);
    res.status(200).json({
      success: true,
      summary
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get dashboard summary'
    });
  }
} 