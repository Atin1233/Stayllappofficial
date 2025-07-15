import { z } from 'zod';

/**
 * Property data model for Stayll's auto listing generation feature.
 * 
 * This model defines the structure for property information that landlords
 * submit to generate polished rental listings via AI automation.
 */
export const PropertySchema = z.object({
  // Basic property identification
  id: z.string().optional(),
  title: z.string().min(1, 'Property title is required').max(100, 'Title must be less than 100 characters'),
  
  // Location information
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., CA, NY)'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'ZIP code must be valid format'),
  
  // Property specifications
  numberOfBedrooms: z.number().int().min(0, 'Number of bedrooms must be 0 or greater'),
  numberOfBathrooms: z.number().min(0, 'Number of bathrooms must be 0 or greater'),
  squareFootage: z.number().int().min(1, 'Square footage must be greater than 0').optional(),
  
  // Financial information
  rent: z.number().min(0, 'Rent must be 0 or greater'),
  
  // Description and details
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description must be less than 2000 characters'),
  
  // Features and amenities
  amenities: z.array(z.string()).min(1, 'At least one amenity is required').max(50, 'Maximum 50 amenities allowed'),
  
  // Availability and media
  availabilityDate: z.preprocess((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }, z.date()).default(() => new Date()),
  photos: z.array(z.string().min(1, "Photo URLs cannot be empty")).min(1, 'At least one photo is required').max(20, 'Maximum 20 photos allowed'),
  
  // Optional metadata
  propertyType: z.enum([
    'any',
    'house',
    'apartment',
    'townhouse',
    'condo',
    'cooperative',
    'mobile_home',
    'planned_development',
    'other',
    'multiplex',
    'duplex',
    'triplex',
    'four_plex'
  ]).default('house'),
  parkingSpaces: z.number().int().min(0).optional(),
  petFriendly: z.boolean().default(false),
  utilitiesIncluded: z.boolean().default(false),
  
  // System fields
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  isActive: z.boolean().default(true),
});

/**
 * TypeScript type derived from the Zod schema
 */
export type Property = z.infer<typeof PropertySchema>;

/**
 * Partial property type for updates
 */
export type PartialProperty = Partial<Property>;

/**
 * Property creation input type (excludes system fields)
 */
export const PropertyCreateSchema = PropertySchema.omit({
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

export type PropertyCreate = z.infer<typeof PropertyCreateSchema>;

/**
 * Property creation input type that accepts string dates
 */
export const PropertyCreateInputSchema = PropertyCreateSchema.extend({
  availabilityDate: z.preprocess((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }, z.date()).default(() => new Date()),
});

export type PropertyCreateInput = z.infer<typeof PropertyCreateInputSchema>;

/**
 * Property update input type (all fields optional except ID)
 */
export const PropertyUpdateSchema = PropertyCreateSchema.partial();

export type PropertyUpdate = z.infer<typeof PropertyUpdateSchema>;

/**
 * Property validation functions
 */
export const PropertyValidator = {
  /**
   * Validate a property object
   */
  validate: (data: unknown): Property => {
    return PropertySchema.parse(data);
  },

  /**
   * Validate property creation data
   */
  validateCreate: (data: unknown): PropertyCreate => {
    return PropertyCreateSchema.parse(data);
  },

  /**
   * Validate property update data
   */
  validateUpdate: (data: unknown): PropertyUpdate => {
    return PropertyUpdateSchema.parse(data);
  },

  /**
   * Safe validation that returns errors instead of throwing
   */
  safeValidate: (data: unknown): { success: true; data: Property } | { success: false; errors: string[] } => {
    const result = PropertySchema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { 
        success: false, 
        errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
  },
};

/**
 * Default property values for form initialization
 */
export const DEFAULT_PROPERTY_VALUES: PropertyCreateInput = {
  title: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  numberOfBedrooms: 1,
  numberOfBathrooms: 1,
  rent: 0,
  description: '',
  amenities: [],
  availabilityDate: new Date(),
  photos: [],
  propertyType: 'house',
  petFriendly: false,
  utilitiesIncluded: false,
};

/**
 * Helper functions for property data
 */
export const PropertyHelpers = {
  /**
   * Format property address for display
   */
  formatAddress: (property: PropertyCreate): string => {
    return `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
  },

  /**
   * Calculate total square footage if not provided
   */
  estimateSquareFootage: (bedrooms: number, bathrooms: number): number => {
    // Rough estimation: 400 sq ft per bedroom + 200 sq ft per bathroom + 300 sq ft base
    return (bedrooms * 400) + (bathrooms * 200) + 300;
  },

  /**
   * Validate amenities against common property features
   */
  validateAmenities: (amenities: string[]): string[] => {
    const commonAmenities = [
      'Air Conditioning', 'Heating', 'Dishwasher', 'Washer/Dryer', 'Balcony',
      'Gym', 'Pool', 'Parking', 'Storage', 'Furnished', 'Hardwood Floors',
      'Walk-in Closet', 'Fireplace', 'Garden', 'Terrace', 'Doorman',
      'Elevator', 'Security System', 'High-Speed Internet', 'Cable TV'
    ];
    
    return amenities.filter(amenity => 
      commonAmenities.some(common => 
        amenity.toLowerCase().includes(common.toLowerCase())
      )
    );
  },

  /**
   * Generate a default title from property details
   */
  generateTitle: (property: PropertyCreate): string => {
    const bedroomText = property.numberOfBedrooms === 1 ? '1 Bedroom' : `${property.numberOfBedrooms} Bedroom`;
    const bathroomText = property.numberOfBathrooms === 1 ? '1 Bath' : `${property.numberOfBathrooms} Bath`;
    const typeText = property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1);
    
    return `${bedroomText} ${bathroomText} ${typeText} in ${property.city}`;
  },
}; 