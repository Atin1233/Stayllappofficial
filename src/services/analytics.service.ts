import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ListingAnalytics {
  id: string;
  listingId: string;
  views: number;
  inquiries: number;
  favorited: number;
  lastViewed: Date;
  averageViewTime: number;
  clickThroughRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AnalyticsService {
  /**
   * Record a view for a listing
   */
  async recordView(listingId: string, viewDuration: number): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({
      where: { listingId }
    });

    if (analytics) {
      // Update existing analytics
      const newAvgViewTime = (analytics.averageViewTime * analytics.views + viewDuration) / (analytics.views + 1);
      const newViews = analytics.views + 1;
      const newClickThroughRate = analytics.inquiries > 0 ? (analytics.inquiries / newViews) * 100 : 0;

      await prisma.listingAnalytics.update({
        where: { listingId },
        data: {
          views: { increment: 1 },
          lastViewed: new Date(),
          averageViewTime: newAvgViewTime,
          clickThroughRate: newClickThroughRate,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new analytics
      await prisma.listingAnalytics.create({
        data: {
          listingId,
          views: 1,
          averageViewTime: viewDuration,
          lastViewed: new Date()
        }
      });
    }
  }

  /**
   * Record an inquiry for a listing
   */
  async recordInquiry(listingId: string): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({
      where: { listingId }
    });

    if (analytics) {
      const newInquiries = analytics.inquiries + 1;
      const newClickThroughRate = analytics.views > 0 ? (newInquiries / analytics.views) * 100 : 0;

      await prisma.listingAnalytics.update({
        where: { listingId },
        data: {
          inquiries: { increment: 1 },
          clickThroughRate: newClickThroughRate,
          updatedAt: new Date()
        }
      });
    } else {
      await prisma.listingAnalytics.create({
        data: {
          listingId,
          inquiries: 1
        }
      });
    }
  }

  /**
   * Record a favorite action for a listing
   */
  async recordFavorite(listingId: string): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({
      where: { listingId }
    });

    if (analytics) {
      await prisma.listingAnalytics.update({
        where: { listingId },
        data: {
          favorited: { increment: 1 },
          updatedAt: new Date()
        }
      });
    } else {
      await prisma.listingAnalytics.create({
        data: {
          listingId,
          favorited: 1
        }
      });
    }
  }

  /**
   * Get analytics for a specific listing
   */
  async getListingAnalytics(listingId: string): Promise<ListingAnalytics | null> {
    return prisma.listingAnalytics.findUnique({
      where: { listingId }
    });
  }

  /**
   * Get analytics for all listings
   */
  async getAllListingsAnalytics(): Promise<ListingAnalytics[]> {
    return prisma.listingAnalytics.findMany({
      include: {
        listing: {
          include: {
            property: true
          }
        }
      }
    });
  }

  /**
   * Get aggregated analytics for a user's listings
   */
  async getUserListingsAnalytics(userId: string) {
    const userListings = await prisma.listing.findMany({
      where: { userId },
      include: {
        analytics: true,
        property: true
      }
    });

    const totalViews = userListings.reduce((sum, listing) => sum + (listing.analytics?.views || 0), 0);
    const totalInquiries = userListings.reduce((sum, listing) => sum + (listing.analytics?.inquiries || 0), 0);
    const totalFavorites = userListings.reduce((sum, listing) => sum + (listing.analytics?.favorited || 0), 0);

    const avgViewsPerListing = userListings.length > 0 ? totalViews / userListings.length : 0;
    const avgInquiriesPerListing = userListings.length > 0 ? totalInquiries / userListings.length : 0;

    return {
      totalViews,
      totalInquiries,
      totalFavorites,
      avgViewsPerListing,
      avgInquiriesPerListing,
      listingsCount: userListings.length,
      listings: userListings.map(listing => ({
        id: listing.id,
        propertyTitle: listing.property.title,
        views: listing.analytics?.views || 0,
        inquiries: listing.analytics?.inquiries || 0,
        favorited: listing.analytics?.favorited || 0,
        lastViewed: listing.analytics?.lastViewed || null,
        averageViewTime: listing.analytics?.averageViewTime || 0
      }))
    };
  }
} 