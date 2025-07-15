import { PrismaClient } from '@prisma/client';
import { PropertyCreate, PropertyUpdate, Property } from '../models/Property';

/**
 * Property Repository for database operations
 * 
 * This repository handles all property-related database operations,
 * replacing the in-memory storage with persistent database storage.
 */

const prisma = new PrismaClient();

export class PropertyRepository {
  /**
   * Create a new property
   */
  async createProperty(propertyData: PropertyCreate, userId: string): Promise<Property> {
    // Ensure required fields are present
    if (!propertyData.title || !propertyData.address || !propertyData.city || 
        !propertyData.state || !propertyData.zip || !propertyData.rent) {
      throw new Error('Missing required fields');
    }

    // Remove 'id' if present
    const { id, ...propertyDataWithoutId } = propertyData as any;

    // Create property in database
    const newProperty = await prisma.property.create({
      data: {
        ...propertyDataWithoutId,
        amenities: JSON.stringify(propertyData.amenities), // Convert array to JSON string
        photos: JSON.stringify(propertyData.photos), // Convert array to JSON string
        propertyType: propertyData.propertyType?.toUpperCase() as any || 'APARTMENT',
        userId: userId
      }
    });

    return this.convertPrismaPropertyToProperty(newProperty);
  }

  /**
   * Get property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    const property = await prisma.property.findUnique({
      where: { id },
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
    });

    return property ? this.convertPrismaPropertyToProperty(property) : null;
  }

  /**
   * Get all properties
   */
  async getAllProperties(): Promise<Property[]> {
    const properties = await prisma.property.findMany({
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
      },
      orderBy: { createdAt: 'desc' }
    });

    return properties.map(property => this.convertPrismaPropertyToProperty(property));
  }

  /**
   * Get properties by user ID
   */
  async getPropertiesByUserId(userId: string): Promise<Property[]> {
    const properties = await prisma.property.findMany({
      where: { userId },
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
      },
      orderBy: { createdAt: 'desc' }
    });

    return properties.map(property => {
      const { id, ...propertyWithoutId } = property;
      return this.convertPrismaPropertyToProperty(propertyWithoutId);
    });
  }

  /**
   * Update property by ID
   */
  async updatePropertyById(id: string, updateData: PropertyUpdate, userId: string): Promise<Property | null> {
    try {
      const updateFields: any = {};
      if (typeof updateData.title !== 'undefined') updateFields.title = updateData.title;
      if (typeof updateData.address !== 'undefined') updateFields.address = updateData.address;
      if (typeof updateData.city !== 'undefined') updateFields.city = updateData.city;
      if (typeof updateData.state !== 'undefined') updateFields.state = updateData.state;
      if (typeof updateData.zip !== 'undefined') updateFields.zip = updateData.zip;
      if (typeof updateData.numberOfBedrooms !== 'undefined') updateFields.numberOfBedrooms = updateData.numberOfBedrooms;
      if (typeof updateData.numberOfBathrooms !== 'undefined') updateFields.numberOfBathrooms = updateData.numberOfBathrooms;
      if (typeof updateData.squareFootage !== 'undefined') updateFields.squareFootage = updateData.squareFootage;
      if (typeof updateData.rent !== 'undefined') updateFields.rent = updateData.rent;
      if (typeof updateData.description !== 'undefined') updateFields.description = updateData.description;
      if (typeof updateData.amenities !== 'undefined') updateFields.amenities = JSON.stringify(updateData.amenities);
      if (typeof updateData.availabilityDate !== 'undefined') updateFields.availabilityDate = updateData.availabilityDate;
      if (typeof updateData.photos !== 'undefined') updateFields.photos = JSON.stringify(updateData.photos);
      if (typeof updateData.propertyType !== 'undefined') updateFields.propertyType = updateData.propertyType?.toUpperCase();
      if (typeof updateData.petFriendly !== 'undefined') updateFields.petFriendly = updateData.petFriendly;
      if (typeof updateData.utilitiesIncluded !== 'undefined') updateFields.utilitiesIncluded = updateData.utilitiesIncluded;
      // Remove 'id' if present
      if ('id' in updateFields) delete updateFields.id;
      const updatedProperty = await prisma.property.update({
        where: { 
          id,
          userId // Ensure user owns the property
        },
        data: updateFields,
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
      });

      return this.convertPrismaPropertyToProperty(updatedProperty);
    } catch (error) {
      // Property not found or user doesn't own it
      return null;
    }
  }

  /**
   * Delete property by ID
   */
  async deletePropertyById(id: string, userId: string): Promise<boolean> {
    try {
      await prisma.property.delete({
        where: { 
          id,
          userId // Ensure user owns the property
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Search properties
   */
  async searchProperties(filters: {
    city?: string;
    state?: string;
    minRent?: number;
    maxRent?: number;
    bedrooms?: number;
    propertyType?: string;
    petFriendly?: boolean;
  }): Promise<Property[]> {
    const whereClause: any = {};

    if (filters.city) whereClause.city = { contains: filters.city };
    if (filters.state) whereClause.state = { contains: filters.state };
    if (filters.minRent || filters.maxRent) {
      whereClause.rent = {};
      if (filters.minRent) whereClause.rent.gte = filters.minRent;
      if (filters.maxRent) whereClause.rent.lte = filters.maxRent;
    }
    if (filters.bedrooms) whereClause.numberOfBedrooms = filters.bedrooms;
    if (filters.propertyType) whereClause.propertyType = filters.propertyType.toUpperCase();
    if (filters.petFriendly !== undefined) whereClause.petFriendly = filters.petFriendly;

    const properties = await prisma.property.findMany({
      where: whereClause,
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
      },
      orderBy: { createdAt: 'desc' }
    });

    return properties.map(property => {
      const { id, ...propertyWithoutId } = property;
      return this.convertPrismaPropertyToProperty(propertyWithoutId);
    });
  }

  /**
   * Get properties count by user
   */
  async getPropertiesCountByUser(userId: string): Promise<number> {
    return await prisma.property.count({
      where: { userId }
    });
  }

  /**
   * Convert Prisma property to our Property interface
   * Handles null to undefined conversion and parses JSON fields
   */
  private convertPrismaPropertyToProperty(prismaProperty: any): Property {
    return {
      id: prismaProperty.id,
      title: prismaProperty.title,
      address: prismaProperty.address,
      city: prismaProperty.city,
      state: prismaProperty.state,
      zip: prismaProperty.zip,
      numberOfBedrooms: prismaProperty.numberOfBedrooms,
      numberOfBathrooms: prismaProperty.numberOfBathrooms,
      squareFootage: prismaProperty.squareFootage,
      rent: prismaProperty.rent,
      description: prismaProperty.description,
      amenities: typeof prismaProperty.amenities === 'string'
        ? JSON.parse(prismaProperty.amenities)
        : prismaProperty.amenities,
      availabilityDate: prismaProperty.availabilityDate,
      photos: typeof prismaProperty.photos === 'string'
        ? JSON.parse(prismaProperty.photos)
        : prismaProperty.photos,
      propertyType: prismaProperty.propertyType?.toLowerCase() || 'house',
      petFriendly: prismaProperty.petFriendly,
      utilitiesIncluded: prismaProperty.utilitiesIncluded,
      createdAt: prismaProperty.createdAt,
      updatedAt: prismaProperty.updatedAt,
      isActive: prismaProperty.isActive,
      user: prismaProperty.user
        ? {
            id: prismaProperty.user.id,
            email: prismaProperty.user.email,
            firstName: prismaProperty.user.firstName,
            lastName: prismaProperty.user.lastName,
            userType: prismaProperty.user.userType?.toLowerCase() || 'landlord'
          }
        : undefined
    };
  }
} 