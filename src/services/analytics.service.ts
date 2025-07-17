import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AnalyticsService {
  async recordView(listingId: string, viewDuration: number): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({ where: { listingId } });
    if (analytics) {
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
        },
      });
    } else {
      await prisma.listingAnalytics.create({
        data: { listingId, views: 1, averageViewTime: viewDuration, lastViewed: new Date() },
      });
    }
  }

  async recordInquiry(listingId: string): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({ where: { listingId } });
    if (analytics) {
      const newInquiries = analytics.inquiries + 1;
      const newClickThroughRate = analytics.views > 0 ? (newInquiries / analytics.views) * 100 : 0;
      await prisma.listingAnalytics.update({
        where: { listingId },
        data: { inquiries: { increment: 1 }, clickThroughRate: newClickThroughRate },
      });
    } else {
      await prisma.listingAnalytics.create({ data: { listingId, inquiries: 1 } });
    }
  }

  async recordFavorite(listingId: string): Promise<void> {
    const analytics = await prisma.listingAnalytics.findUnique({ where: { listingId } });
    if (analytics) {
      await prisma.listingAnalytics.update({
        where: { listingId },
        data: { favorited: { increment: 1 } },
      });
    } else {
      await prisma.listingAnalytics.create({ data: { listingId, favorited: 1 } });
    }
  }

  async getListingAnalytics(listingId: string) {
    return prisma.listingAnalytics.findUnique({ where: { listingId } });
  }

  async getAllListingsAnalytics() {
    return prisma.listingAnalytics.findMany({ include: { listing: { include: { property: true } } } });
  }

  async getUserListingsAnalytics(userId: string) {
    const userListings = await prisma.listing.findMany({
      where: { userId },
      include: { analytics: true, property: true },
    });
    const totalViews = userListings.reduce((sum: number, l: any) => sum + (l.analytics?.views || 0), 0);
    const totalInquiries = userListings.reduce((sum: number, l: any) => sum + (l.analytics?.inquiries || 0), 0);
    const totalFavorites = userListings.reduce((sum: number, l: any) => sum + (l.analytics?.favorited || 0), 0);
    return {
      totalViews,
      totalInquiries,
      totalFavorites,
      listingsCount: userListings.length,
      listings: userListings.map(l => ({
        id: l.id,
        propertyTitle: l.property.title,
        views: l.analytics?.views || 0,
        inquiries: l.analytics?.inquiries || 0,
        favorited: l.analytics?.favorited || 0,
      })),
    };
  }

  async getDashboardSummary(userId: string) {
    const userProperties = await prisma.property.findMany({ where: { userId } });
    const activeProperties = userProperties.length;
    const totalRent = userProperties.reduce((sum: number, p: any) => sum + p.rent, 0);
    const averageRent = activeProperties > 0 ? totalRent / activeProperties : 0;
    const userListings = await prisma.listing.findMany({ where: { userId } });
    const activeListings = userListings.length;
    const listingIds = userListings.map(l => l.id);
    const analytics = await prisma.listingAnalytics.findMany({ where: { listingId: { in: listingIds } } });
    const newInquiries = analytics.reduce((sum: number, a: any) => sum + a.inquiries, 0);
    return {
      activeProperties,
      activeListings,
      newInquiries,
      averageRent,
    };
  }
} 