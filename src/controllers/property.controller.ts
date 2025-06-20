import { Request, Response } from 'express';
import {
  addProperty,
  getAllProperties as getStoredProperties,
  getPropertyById,
  deletePropertyById,
  updatePropertyById,
  bulkDeletePropertiesById,
} from '../storage/propertyStore';
import { PropertyCreate, PropertyUpdateSchema, PropertyCreateInputSchema } from '../models/Property';
import { analyzePropertyPhotos as analyzePhotosService, analyzeRentPrice } from '../services/vertexai.service';
import { Parser } from 'json2csv';

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

/**
 * Express route handler for analyzing rent price using AI
 */
export async function analyzePropertyRent(req: Request, res: Response): Promise<void> {
  try {
    const { propertyId } = req.params;
    
    if (!propertyId) {
      res.status(400).json({
        success: false,
        error: 'Property ID is required'
      });
      return;
    }
    
    const property = getPropertyById(propertyId);
    
    if (!property) {
      res.status(404).json({
        success: false,
        error: 'Property not found'
      });
      return;
    }
    
    // Analyze rent price using Vertex AI
    const analysisData: any = {
      numberOfBedrooms: property.numberOfBedrooms,
      numberOfBathrooms: property.numberOfBathrooms,
      city: property.city,
      state: property.state,
      propertyType: property.propertyType,
      amenities: property.amenities,
      petFriendly: property.petFriendly,
      utilitiesIncluded: property.utilitiesIncluded,
      currentRent: property.rent
    };
    
    if (property.squareFootage) {
      analysisData.squareFootage = property.squareFootage;
    }
    
    const rentAnalysis = await analyzeRentPrice(analysisData);
    
    res.status(200).json({
      success: true,
      analysis: rentAnalysis,
      property: {
        id: property.id,
        title: property.title,
        currentRent: property.rent
      }
    });
  } catch (error: any) {
    console.error('Rent analysis error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze rent price.'
    });
  }
}

/**
 * Express route handler for analyzing rent price for a new property (without saving)
 */
export async function analyzeNewPropertyRent(req: Request, res: Response): Promise<void> {
  try {
    const propertyData = req.body;
    
    if (!propertyData) {
      res.status(400).json({
        success: false,
        error: 'Property data is required'
      });
      return;
    }
    
    // Validate required fields
    const requiredFields = ['numberOfBedrooms', 'numberOfBathrooms', 'city', 'state', 'propertyType'];
    for (const field of requiredFields) {
      if (!propertyData[field]) {
        res.status(400).json({
          success: false,
          error: `${field} is required for rent analysis`
        });
        return;
      }
    }
    
    // Analyze rent price using Vertex AI
    const rentAnalysis = await analyzeRentPrice({
      numberOfBedrooms: propertyData.numberOfBedrooms,
      numberOfBathrooms: propertyData.numberOfBathrooms,
      squareFootage: propertyData.squareFootage,
      city: propertyData.city,
      state: propertyData.state,
      propertyType: propertyData.propertyType,
      amenities: propertyData.amenities || [],
      petFriendly: propertyData.petFriendly || false,
      utilitiesIncluded: propertyData.utilitiesIncluded || false,
      currentRent: propertyData.rent
    });
    
    res.status(200).json({
      success: true,
      analysis: rentAnalysis
    });
  } catch (error: any) {
    console.error('New property rent analysis error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze rent price.'
    });
  }
}

export async function bulkDeleteProperties(req: Request, res: Response): Promise<void> {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({
        success: false,
        error: 'An array of property IDs is required.'
      });
      return;
    }
    
    const deletedCount = bulkDeletePropertiesById(ids);
    
    if (deletedCount === 0) {
      res.status(404).json({
        success: false,
        error: 'No matching properties found to delete.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: `${deletedCount} properties deleted successfully.`
    });
  } catch (error: any) {
    console.error('Bulk delete property error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete properties.'
    });
  }
}

export async function updateProperty(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, error: 'Property ID is required' });
      return;
    }
    const validatedBody = PropertyUpdateSchema.parse(req.body);

    // Create a new object for updates, excluding any undefined values
    const updates: Partial<PropertyCreate> = {};
    for (const key in validatedBody) {
      if (validatedBody[key as keyof typeof validatedBody] !== undefined) {
        (updates as any)[key] = validatedBody[key as keyof typeof validatedBody];
      }
    }
    
    const updatedProperty = updatePropertyById(id, updates);
    
    if (!updatedProperty) {
      res.status(404).json({
        success: false,
        error: 'Property not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      property: updatedProperty,
      message: 'Property updated successfully'
    });
  } catch (error: any) {
    console.error('Update property error:', error);
    
    if (error.name === 'ZodError') {
      const validationErrors = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
      res.status(400).json({
        success: false,
        error: `Validation failed: ${validationErrors}`
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update property.'
      });
    }
  }
}

export async function exportProperties(req: Request, res: Response): Promise<void> {
  try {
    const { ids, format } = req.body;
    let propertiesToExport;

    if (ids && Array.isArray(ids) && ids.length > 0) {
      propertiesToExport = ids.map(id => getPropertyById(id)).filter(p => p !== undefined);
    } else {
      propertiesToExport = getStoredProperties();
    }

    if (propertiesToExport.length === 0) {
      res.status(404).json({ success: false, error: 'No properties found to export.' });
      return;
    }

    // Default to CSV if format is not specified
    const exportFormat = (format || 'csv').toLowerCase();

    if (exportFormat === 'json') {
      // Export as JSON file
      res.header('Content-Type', 'application/json');
      res.attachment('properties.json');
      res.send(JSON.stringify(propertiesToExport, null, 2));
      return;
    }

    // Default: Export as CSV
    const fields = [
      'id', 'title', 'address', 'city', 'state', 'zip',
      'propertyType', 'rent', 'numberOfBedrooms', 'numberOfBathrooms',
      'squareFootage', 'petFriendly', 'utilitiesIncluded', 'availabilityDate',
      'description', 'amenities', 'photos', 'createdAt'
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(propertiesToExport);

    res.header('Content-Type', 'text/csv');
    res.attachment('properties.csv');
    res.send(csv);

  } catch (error: any) {
    console.error('Export properties error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to export properties.'
    });
  }
}

export async function analyzePropertyPhotos(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, error: 'Property ID is required' });
      return;
    }
    const property = getPropertyById(id);

    if (!property) {
      res.status(404).json({ success: false, error: 'Property not found' });
      return;
    }

    if (!property.photos || property.photos.length === 0) {
      res.status(400).json({ success: false, error: 'No photos found for this property to analyze.' });
      return;
    }

    const analysis = await analyzePhotosService(property.photos);

    res.status(200).json({ success: true, analysis });

  } catch (error: any) {
    console.error('Photo analysis controller error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze property photos.'
    });
  }
} 