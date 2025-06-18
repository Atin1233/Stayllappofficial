import { Request, Response } from 'express';
import { PropertyValidator, PropertyCreate, PropertyCreateInputSchema } from '../models/Property';
import { addProperty, getAllProperties as getStoredProperties, getPropertyById, deletePropertyById } from '../storage/propertyStore';

/**
 * Express route handler for creating a new property
 */
export async function createProperty(req: Request, res: Response): Promise<void> {
  try {
    // 1. Log the incoming request data
    console.log('Property creation request body:', req.body);
    
    // 2. Validate property data from request body using input schema
    const propertyData = req.body;
    
    // Fix property type case (convert to lowercase)
    if (propertyData.propertyType) {
      propertyData.propertyType = propertyData.propertyType.toLowerCase();
    }
    
    console.log('Processed property data:', propertyData);
    
    const validated: PropertyCreate = PropertyCreateInputSchema.parse(propertyData);
    console.log('Validated property data:', validated);

    // 3. Store the property in memory
    const newProperty = addProperty(validated);
    console.log('Created property:', newProperty);

    // 4. Return the created property
    res.status(201).json({
      success: true,
      property: newProperty,
      message: 'Property created successfully'
    });
  } catch (error: any) {
    console.error('Property creation error:', error);
    
    // If it's a Zod validation error, provide more detailed error info
    if (error.name === 'ZodError') {
      const validationErrors = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
      res.status(400).json({
        success: false,
        error: `Validation failed: ${validationErrors}`
      });
    } else {
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create property.'
      });
    }
  }
}

/**
 * Express route handler for getting all properties
 */
export async function getAllProperties(req: Request, res: Response): Promise<void> {
  try {
    const properties = getStoredProperties();
    
    res.status(200).json({
      success: true,
      properties,
      count: properties.length
    });
  } catch (error: any) {
    console.error('Get properties error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve properties.'
    });
  }
}

/**
 * Express route handler for getting a property by ID
 */
export async function getProperty(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Property ID is required'
      });
      return;
    }
    
    const property = getPropertyById(id);
    
    if (!property) {
      res.status(404).json({
        success: false,
        error: 'Property not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      property
    });
  } catch (error: any) {
    console.error('Get property error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve property.'
    });
  }
}

/**
 * Express route handler for deleting a property by ID
 */
export async function deleteProperty(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Property ID is required'
      });
      return;
    }
    
    const deleted = deletePropertyById(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Property not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete property error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete property.'
    });
  }
} 