import { Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { PropertyValidator, PropertyCreate } from '../models/Property';
import { getPropertyById, StoredProperty } from '../storage/propertyStore';
import { addListing, getAllListings as getStoredListings } from '../storage/listingStore';
import { Listing } from '../models/Listing';
import { generateListingWithVertexAI } from '../services/vertexai.service';

// Load environment variables
dotenv.config();

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODELS = [
  'tiiuae/falcon-7b-instruct', // Free, reliable instruct model
  'google/flan-t5-base',      // Free, general-purpose text generation
  'gpt2'                     // Free, basic text generation
];

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
function createListingPrompt(property: StoredProperty): string {
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
  try {
    const { propertyId } = req.body;
    if (!propertyId) {
      res.status(400).json({
        success: false,
        error: 'propertyId is required in the request body.'
      });
      return;
    }

    // Look up the property by ID
    const property = getPropertyById(propertyId);
    if (!property) {
      res.status(404).json({
        success: false,
        error: 'Property not found.'
      });
      return;
    }

    // 1. Validate property data (optional, since it's already validated on creation)
    // const validated: PropertyCreate = PropertyValidator.validateCreate(property);

    // 2. Generate a prompt for the AI
    const prompt = createListingPrompt(property);

    // 3. Send prompt to Vertex AI
    const listingText = await generateListingWithVertexAI(prompt);

    // 4. Create a Listing object with UUID, propertyId, and propertyData snapshot
    const newListing: Listing = {
      id: uuidv4(),
      listingText,
      createdAt: new Date(),
      propertyId,
      propertyData: property
    };
    
    // 5. Store the listing in memory
    addListing(newListing);

    // 6. Return the generated listing as JSON
    res.status(200).json({
      success: true,
      listing: listingText,
      listingId: newListing.id,
      propertyId: newListing.propertyId
    });
  } catch (error: any) {
    console.error('Listing generation error:', error);
    
    // Handle validation or AI errors
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to generate listing.'
    });
  }
}

/**
 * Express route handler for getting all listings
 */
export async function getAllListings(req: Request, res: Response): Promise<void> {
  try {
    const listings = getStoredListings();
    
    res.status(200).json({
      success: true,
      listings,
      count: listings.length
    });
  } catch (error: any) {
    console.error('Get listings error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve listings.'
    });
  }
} 