import { Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { PropertyValidator, PropertyCreate } from '../models/Property';
import { getPropertyById, StoredProperty } from '../storage/propertyStore';
import { addListing, getAllListings as getStoredListings } from '../storage/listingStore';
import { Listing } from '../models/Listing';
import { generateListingWithVertexAI } from '../services/vertexai.service';
import { ListingRepository } from '../repositories/listing.repository';
import { PropertyRepository } from '../repositories/property.repository';
import { type Property as PropertyModel } from '../models/Property';

// Load environment variables
dotenv.config();

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODELS = [
  'tiiuae/falcon-7b-instruct', // Free, reliable instruct model
  'google/flan-t5-base',      // Free, general-purpose text generation
  'gpt2'                     // Free, basic text generation
];

const listingRepository = new ListingRepository();
const propertyRepository = new PropertyRepository();

/**
 * Generate a rental listing using Hugging Face Inference API
 */
async function generateListingWithHuggingFace(prompt: string): Promise<string> {
  try {
    if (!HF_API_KEY || HF_API_KEY.trim() === '' || HF_API_KEY === 'undefined') {
      console.warn('Hugging Face API key not configured, using fallback response');
      return `🏠 Beautiful Property Available!\n\nExperience modern living in this spacious property with great amenities. Perfect location with easy access to transportation. Available now for immediate move-in. Contact us today to schedule a viewing!\n\n${prompt}`;
    }

    let lastError = null;
    for (const model of HF_MODELS) {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `Create a professional rental listing: ${prompt}`,
          parameters: {
            max_length: 150,
            temperature: 0.8,
            do_sample: true,
            return_full_text: false
          }
        })
      });
      console.log(`Hugging Face API response status for model ${model}:`, response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Hugging Face API response data:', data);
        if (Array.isArray(data) && data.length > 0) {
          const generatedText = data[0].generated_text || data[0].text || '';
          if (generatedText) return generatedText;
        } else if (typeof data === 'string') {
          return data;
        } else if (data && typeof data === 'object' && 'generated_text' in data) {
          return (data as any).generated_text;
        }
      } else {
        lastError = `Model ${model} failed: ${response.status} ${response.statusText}`;
        // Try next model if 404 or 500
        if (response.status !== 404 && response.status !== 500) break;
      }
    }
    console.error('All Hugging Face models failed.', lastError);
    return `🏠 Beautiful Property Available!\n\nExperience modern living in this spacious property with great amenities. Perfect location with easy access to transportation. Available now for immediate move-in. Contact us today to schedule a viewing!\n\n${prompt}`;
  } catch (error) {
    console.error('Hugging Face API Error:', error);
    return `🏠 Beautiful Property Available!\n\nExperience modern living in this spacious property with great amenities. Perfect location with easy access to transportation. Available now for immediate move-in. Contact us today to schedule a viewing!\n\n${prompt}`;
  }
}

/**
 * Generate a prompt for the AI based on property details
 */
function createListingPrompt(property: PropertyModel): string {
  return `Create a professional rental listing for:
- ${property.title}
- ${property.numberOfBedrooms} bedroom, ${property.numberOfBathrooms} bathroom
- Located at ${property.address}, ${property.city}, ${property.state}
- Rent: $${property.rent}/month
- Amenities: ${property.amenities.join(', ')}
- Description: ${property.description}
- Pet friendly: ${property.petFriendly ? 'Yes' : 'No'}
- Utilities included: ${property.utilitiesIncluded ? 'Yes' : 'No'}

Make it attractive and professional for potential renters.`;
}

/**
 * Express route handler for generating a rental listing via AI
 * Now requires propertyId in the request body.
 */
export async function generateListing(req: Request, res: Response): Promise<void> {
  console.log('DEBUG: /api/listings/generate-listing hit with body:', req.body);
  const { propertyId, userId } = req.body;
  if (!propertyId || !userId) {
    res.status(400).json({ success: false, error: 'propertyId and userId are required.' });
    return;
  }

  try {
    console.log(`DEBUG: Attempting to find property with ID: ${propertyId}`);
    let property;
    let useDatabase = true;
    // Before DB fetch
    console.log('DEBUG: Before propertyRepository.getPropertyById');
    property = await propertyRepository.getPropertyById(propertyId || '');
    // After DB fetch
    console.log('DEBUG: After propertyRepository.getPropertyById:', property ? 'Found' : 'Not found');
    if (!property) {
      console.log(`DEBUG: Property not found in database, trying in-memory store`);
      const inMemoryProperty = getPropertyById(propertyId || '');
      if (inMemoryProperty) {
        console.log(`DEBUG: Property found in in-memory store: ${inMemoryProperty.title}`);
        property = {
          ...inMemoryProperty,
          updatedAt: new Date(),
          isActive: true
        };
        useDatabase = false;
      }
    }
    console.log(`DEBUG: Property search result:`, property ? `Found property: ${property.title}` : 'Property not found');
    if (!property) {
      res.status(404).json({ success: false, error: 'Property not found.' });
      return;
    }
    const prompt = createListingPrompt(property);
    console.log(`DEBUG: Generated prompt for AI:`, prompt);
    // Before AI call
    console.log('DEBUG: Before generateListingWithVertexAI');
    // Add timeout to AI call
    let listingText;
    try {
      listingText = await Promise.race([
        generateListingWithVertexAI(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error('VertexAI service timeout')), 15000))
      ]);
      console.log('DEBUG: After generateListingWithVertexAI');
    } catch (aiError) {
      const err = aiError instanceof Error ? aiError : new Error(String(aiError));
      console.error('VertexAI service error or timeout:', err);
      res.status(500).json({ success: false, error: err.message || 'VertexAI service failed.' });
      return;
    }
    if (useDatabase) {
      // Before DB listing creation
      console.log('DEBUG: Before listingRepository.createListing');
      try {
        const newListing = await listingRepository.createListing({
          listingText,
          propertyId,
          userId,
        });
        // After DB listing creation
        console.log(`DEBUG: Listing created successfully with ID: ${newListing.id}`);
        res.status(201).json({
          success: true,
          listing: newListing,
        });
      } catch (error: any) {
        console.error('Database listing creation error:', error);
        // If database creation fails, fall back to in-memory listing
        console.log(`DEBUG: Database listing creation failed, falling back to in-memory listing`);
        const inMemoryListing = createInMemoryListing(listingText, propertyId, userId);
        res.status(201).json({
          success: true,
          listing: inMemoryListing,
        });
      }
    } else {
      // If we're using an in-memory property, create an in-memory listing
      console.log(`DEBUG: Creating in-memory listing for property: ${propertyId}, user: ${userId}`);
      const inMemoryListing = createInMemoryListing(listingText, propertyId, userId);
      res.status(201).json({
        success: true,
        listing: inMemoryListing,
      });
    }
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Listing generation error:', errorMessage);
    res.status(500).json({ success: false, error: errorMessage });
  }
}

/**
 * Helper function to create an in-memory listing
 */
function createInMemoryListing(listingText: string, propertyId: string, userId: string): Listing {
  const listingId = `listing_${Date.now()}`;
  // Ensure propertyId is a string
  const safePropertyId = propertyId || '';
  const property = getPropertyById(safePropertyId);
  const listing: Listing = {
    id: listingId,
    listingText,
    propertyId: safePropertyId,
    createdAt: new Date(),
    propertyData: property ? { ...property, isActive: true } : undefined
  };
  // Store the listing in memory
  addListing(listing);
  return listing;
}

/**
 * Express route handler for getting all listings
 */
export async function getAllListings(req: Request, res: Response): Promise<void> {
  try {
    const listings = await listingRepository.getAllListings();
    res.status(200).json({
      success: true,
      listings,
      count: listings.length,
    });
  } catch (error: any) {
    console.error('Get listings error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve listings.' });
  }
}

export async function deleteListing(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const deletedListing = await listingRepository.delete(id);
    if (deletedListing) {
      res.status(200).json({ success: true, message: 'Listing deleted successfully.' });
    } else {
      res.status(404).json({ success: false, error: 'Listing not found.' });
    }
  } catch (error: any) {
    console.error(`Delete listing error for ID ${id}:`, error);
    res.status(500).json({ success: false, error: 'Failed to delete listing.' });
  }
} 