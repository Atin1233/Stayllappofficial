import { PrismaClient } from '@prisma/client';
import { Listing } from '../models/Listing';

/**
 * Listing Repository for database operations
 * 
 * This repository handles all listing-related database operations,
 * replacing the in-memory storage with persistent database storage.
 */

const prisma = new PrismaClient();

export class ListingRepository {
  /**
   * Create a new listing
   */
  async createListing(listingData: {
    listingText: string;
    propertyId: string;
    userId: string;
  }): Promise<Listing> {
    // Ensure required fields are present
    if (!listingData.listingText || !listingData.propertyId || !listingData.userId) {
      throw new Error('Missing required fields: listingText, propertyId, userId');
    }

    // Create listing in database
    const newListing = await prisma.listing.create({
      data: {
        listingText: listingData.listingText,
        propertyId: listingData.propertyId,
        userId: listingData.userId
      },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      }
    });

    return this.convertPrismaListingToListing(newListing);
  }

  /**
   * Get listing by ID
   */
  async getListingById(id: string): Promise<Listing | null> {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      }
    });

    return listing ? this.convertPrismaListingToListing(listing) : null;
  }

  /**
   * Get all listings
   */
  async getAllListings(): Promise<Listing[]> {
    const listings = await prisma.listing.findMany({
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return listings.map((listing: any) => this.convertPrismaListingToListing(listing));
  }

  /**
   * Get listings by user ID
   */
  async getListingsByUserId(userId: string): Promise<Listing[]> {
    const listings = await prisma.listing.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return listings.map((listing: any) => this.convertPrismaListingToListing(listing));
  }

  /**
   * Get listings by property ID
   */
  async getListingsByPropertyId(propertyId: string): Promise<Listing[]> {
    const listings = await prisma.listing.findMany({
      where: { propertyId },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                userType: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return listings.map((listing: any) => this.convertPrismaListingToListing(listing));
  }

  /**
   * Update listing by ID
   */
  async updateListingById(id: string, updateData: {
    listingText?: string;
  }, userId: string): Promise<Listing | null> {
    try {
      const updateFields: any = {};
      if (typeof updateData.listingText !== 'undefined') {
        updateFields.listingText = updateData.listingText;
      }
      const updatedListing = await prisma.listing.update({
        where: { 
          id,
          userId // Ensure user owns the listing
        },
        data: updateFields,
        include: {
          property: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  userType: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              userType: true
            }
          }
        }
      });

      return this.convertPrismaListingToListing(updatedListing);
    } catch (error) {
      // Listing not found or user doesn't own it
      return null;
    }
  }

  /**
   * Delete listing by ID
   */
  async delete(id: string): Promise<Listing | null> {
    try {
      const deletedListing = await prisma.listing.delete({
        where: { id },
        include: {
          property: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  userType: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              userType: true
            }
          }
        }
      });
      return this.convertPrismaListingToListing(deletedListing);
    } catch (error) {
      // Record not found
      return null;
    }
  }

  /**
   * Get listings count by user
   */
  async getListingsCountByUser(userId: string): Promise<number> {
    return await prisma.listing.count({
      where: { userId }
    });
  }

  /**
   * Get listings count by property
   */
  async getListingsCountByProperty(propertyId: string): Promise<number> {
    return await prisma.listing.count({
      where: { propertyId }
    });
  }

  /**
   * Convert Prisma listing to our Listing interface
   */
  private convertPrismaListingToListing(prismaListing: any): Listing {
    return {
      id: prismaListing.id,
      listingText: prismaListing.listingText,
      createdAt: prismaListing.createdAt,
      propertyId: prismaListing.propertyId,
      propertyData: prismaListing.property ? {
        title: prismaListing.property.title,
        address: prismaListing.property.address,
        city: prismaListing.property.city,
        state: prismaListing.property.state,
        zip: prismaListing.property.zip,
        numberOfBedrooms: prismaListing.property.numberOfBedrooms,
        numberOfBathrooms: prismaListing.property.numberOfBathrooms,
        squareFootage: prismaListing.property.squareFootage || undefined,
        rent: prismaListing.property.rent,
        description: prismaListing.property.description,
        amenities: JSON.parse(prismaListing.property.amenities || '[]'),
        availabilityDate: prismaListing.property.availabilityDate,
        photos: JSON.parse(prismaListing.property.photos || '[]'),
        propertyType: prismaListing.property.propertyType.toLowerCase() as any,
        petFriendly: prismaListing.property.petFriendly,
        utilitiesIncluded: prismaListing.property.utilitiesIncluded,
        createdAt: prismaListing.property.createdAt,
        updatedAt: prismaListing.property.updatedAt,
        isActive: true
      } : undefined
    };
  }
} 