import { VertexAI } from '@google-cloud/vertexai';
import axios from 'axios';

const project = 'stayll';
const location = 'us-central1';
const model = 'gemini-2.0-flash-lite'; // Google's general-purpose text generation model

const vertexAI = new VertexAI({ project, location });

// Place safeGetText at the top of the file
function safeGetText(result: any): string {
  if (
    result &&
    result.response &&
    Array.isArray(result.response.candidates) &&
    result.response.candidates.length > 0
  ) {
    const candidate = result.response.candidates[0];
    if (
      candidate &&
      candidate.content &&
      typeof candidate.content === 'object' &&
      candidate.content !== null &&
      'parts' in candidate.content
    ) {
      const parts = (candidate.content as { parts?: any[] }).parts;
      if (
        Array.isArray(parts) &&
        parts.length > 0 &&
        parts[0] &&
        typeof parts[0] === 'object' &&
        parts[0] !== null &&
        'text' in parts[0] &&
        typeof parts[0].text === 'string'
      ) {
        return parts[0].text;
      }
    }
  }
  return '';
}

export async function generateListingWithVertexAI(prompt: string): Promise<string> {
  // Create a promise with a timeout
  const timeoutPromise = new Promise<string>((_, reject) => {
    setTimeout(() => reject(new Error("VertexAI API request timed out")), 10000); // 10 second timeout
  });
  
  try {
    // Use Promise.race to race between the API call and the timeout
    const apiPromise = async () => {
      try {
        const generativeModel = vertexAI.getGenerativeModel({ model });
        const result = await generativeModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        // Use optional chaining and fallback
        let responseText = 'Unable to generate listing at this time.';
        if (
          result &&
          result.response &&
          Array.isArray(result.response.candidates) &&
          result.response.candidates[0] &&
          result.response.candidates[0].content &&
          typeof result.response.candidates[0].content === 'object' &&
          'parts' in result.response.candidates[0].content &&
          Array.isArray((result.response.candidates[0].content as any).parts) &&
          (result.response.candidates[0].content as any).parts[0] &&
          typeof (result.response.candidates[0].content as any).parts[0].text === 'string'
        ) {
          responseText = (result.response.candidates[0].content as any).parts[0].text;
        }
        
        // Remove markdown bolding (**) from the response
        return typeof responseText === 'string' ? responseText.replace(/\*\*/g, '') : 'Unable to generate listing at this time.';
      } catch (error) {
        console.error('Vertex AI Error:', error);
        throw error;
      }
    };
    
    return await Promise.race([apiPromise(), timeoutPromise]);
  } catch (error) {
    console.error('Vertex AI Error with timeout:', error);
    return generateFallbackListing(prompt);
  }
}

// Generate a fallback listing when VertexAI is unavailable
function generateFallbackListing(prompt: string): string {
  console.log('Using fallback listing generator due to VertexAI error');
  
  // Extract basic information from the prompt
  const bedroomMatch = prompt.match(/(\d+)\s*bedroom/i);
  const bathroomMatch = prompt.match(/(\d+(?:\.\d+)?)\s*bath/i);
  const locationMatch = prompt.match(/Located at\s+([^-]+)/i);
  const rentMatch = prompt.match(/\$(\d+(?:,\d+)?)/i);
  
  const bedrooms = bedroomMatch ? bedroomMatch[1] : '?';
  const bathrooms = bathroomMatch ? bathroomMatch[1] : '?';
  const location = locationMatch ? locationMatch[1].trim() : 'this great location';
  const rent = rentMatch ? rentMatch[1] : '?';
  
  // Generate a basic professional listing
  return `LUXURY ${bedrooms} BEDROOM, ${bathrooms} BATHROOM HOME AVAILABLE NOW!

Experience elevated living in this spacious ${bedrooms} bedroom, ${bathrooms} bathroom property located at ${location}. This meticulously maintained home offers modern features and premium amenities for discerning residents.

Priced at just $${rent}/month, this property won't be available for long! Featuring high-end finishes, spacious rooms, and an ideal location, this home offers exceptional value and comfort.

Key features include:
- ${bedrooms} spacious bedrooms
- ${bathrooms} well-appointed bathrooms
- Modern kitchen with premium appliances
- Elegant living spaces with abundant natural light
- Convenient location with easy access to amenities

Contact us today to schedule a viewing of this exceptional property before it's gone!`;
}

export interface RentAnalysisResult {
  suggestedRent: number;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  marketComparison: {
    aboveMarket: boolean;
    percentageDifference: number;
  };
  recommendations: string[];
}

export async function analyzeRentPrice(propertyData: {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  squareFootage?: number;
  city: string;
  state: string;
  propertyType: string;
  amenities: string[];
  petFriendly: boolean;
  utilitiesIncluded: boolean;
  currentRent?: number;
}): Promise<RentAnalysisResult> {
  try {
    const generativeModel = vertexAI.getGenerativeModel({ model });
    
    const prompt = `As a real estate market analyst, analyze the optimal rent price for this property:

Property Details:
- ${propertyData.numberOfBedrooms} bedroom, ${propertyData.numberOfBathrooms} bathroom
- ${propertyData.squareFootage ? `${propertyData.squareFootage} sq ft` : 'Square footage not specified'}
- Location: ${propertyData.city}, ${propertyData.state}
- Property Type: ${propertyData.propertyType}
- Amenities: ${propertyData.amenities.join(', ')}
- Pet Friendly: ${propertyData.petFriendly ? 'Yes' : 'No'}
- Utilities Included: ${propertyData.utilitiesIncluded ? 'Yes' : 'No'}
${propertyData.currentRent ? `- Current Rent: $${propertyData.currentRent}/month` : ''}

Please provide a detailed rent analysis in the following JSON format:
{
  "suggestedRent": <number>,
  "confidence": "<high|medium|low>",
  "reasoning": "<detailed explanation of the suggested rent>",
  "marketComparison": {
    "aboveMarket": <boolean>,
    "percentageDifference": <number>
  },
  "recommendations": ["<recommendation1>", "<recommendation2>"]
}

Consider factors like:
- Local market rates for similar properties
- Property amenities and features
- Location desirability
- Seasonal market trends
- Property condition and age
- Utility inclusion impact

Return only the JSON response, no additional text.`;

    const result = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    
    let responseText = safeGetText(result);
    
    // Clean the response text by removing markdown code block formatting
    const cleanedResponse = responseText
      .replace(/```json\s*/g, '')  // Remove ```json
      .replace(/```\s*$/g, '')     // Remove closing ```
      .trim();
    
    // Parse the JSON response
    const analysis = JSON.parse(cleanedResponse) as RentAnalysisResult;
    
    return analysis;
  } catch (error) {
    console.error('Rent Analysis Error:', error);
    
    // Fallback analysis
    const safePropertyData = (propertyData || {}) as {
      numberOfBedrooms?: number;
      numberOfBathrooms?: number;
      city?: string;
      state?: string;
      amenities?: any[];
      utilitiesIncluded?: boolean;
      petFriendly?: boolean;
    };
    const baseRent = (safePropertyData.numberOfBedrooms ?? 0) * 800 + (safePropertyData.numberOfBathrooms ?? 0) * 200;
    const locationMultiplier = getLocationMultiplier(safePropertyData.city ?? '', safePropertyData.state ?? '');
    const amenitiesBonus = (safePropertyData.amenities?.length ?? 0) * 50;
    const utilitiesBonus = safePropertyData.utilitiesIncluded ? 100 : 0;
    const petBonus = safePropertyData.petFriendly ? 50 : 0;
    
    const suggestedRent = Math.round((baseRent + amenitiesBonus + utilitiesBonus + petBonus) * locationMultiplier);
    
    return {
      suggestedRent,
      confidence: 'low',
      reasoning: 'Unable to perform detailed market analysis. Using basic calculation based on property features.',
      marketComparison: {
        aboveMarket: false,
        percentageDifference: 0
      },
      recommendations: [
        'Consider getting a professional market analysis',
        'Compare with similar properties in your area',
        'Factor in seasonal market trends'
      ]
    };
  }
}

function getLocationMultiplier(city: string, state: string): number {
  // Basic location multipliers (in a real app, this would come from market data)
  const highCostAreas = ['new york', 'san francisco', 'los angeles', 'boston', 'washington'];
  const mediumCostAreas = ['chicago', 'seattle', 'denver', 'austin', 'miami'];
  
  const location = `${city} ${state}`.toLowerCase();
  
  if (highCostAreas.some(area => location.includes(area))) {
    return 1.5;
  } else if (mediumCostAreas.some(area => location.includes(area))) {
    return 1.2;
  }
  
  return 1.0;
}

export interface PhotoAnalysisResult {
  overallFeedback: string;
  suggestions: string[];
  missingPhotos: string[];
  photoSpecificFeedback: {
    photoUrl: string;
    feedback: string;
  }[];
}

export async function analyzePropertyPhotos(photoUrls: string[]): Promise<PhotoAnalysisResult> {
  try {
    const generativeModel = vertexAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

    const prompt = `As a real estate photography expert, analyze these property photos. Provide feedback on quality, composition, and suggestions for improvement. Identify key features and suggest any missing photos that would improve the listing.

    Return the analysis in this exact JSON format, with no additional text:
    {
      "overallFeedback": "<General feedback on the set of photos>",
      "suggestions": ["<Actionable suggestion 1>", "<Suggestion 2>"],
      "missingPhotos": ["<e.g., 'Bathroom', 'Kitchen', 'Exterior Front'>"],
      "photoSpecificFeedback": [
        { "photoUrl": "<url_of_photo_1>", "feedback": "<Specific feedback for this photo>" },
        { "photoUrl": "<url_of_photo_2>", "feedback": "<Specific feedback for this photo>" }
      ]
    }`;

    const imageParts = await Promise.all(
      photoUrls.map(async (url) => {
        try {
          const response = await axios.get(url, { responseType: 'arraybuffer' });
          const base64 = Buffer.from(response.data, 'binary').toString('base64');
          return {
            inlineData: {
              data: base64,
              mimeType: response.headers['content-type'] || 'image/jpeg',
            },
          };
        } catch (error) {
          console.error(`Failed to download or process image ${url}:`, error);
          return null; // Return null for failed downloads
        }
      })
    );

    // Filter out any null values from failed image downloads
    const validImageParts = imageParts.filter(part => part !== null);

    if (validImageParts.length === 0) {
      throw new Error('No valid photos could be processed.');
    }

    const request = {
        contents: [{ role: 'user', parts: [{ text: prompt }, ...validImageParts] }],
    };

    const result = await generativeModel.generateContent(request);
    let responseText = safeGetText(result);
    const cleanedResponse = responseText
      .replace(/```json\s*/g, '')
      .replace(/```\s*$/g, '')
      .trim();
    return JSON.parse(cleanedResponse) as PhotoAnalysisResult;

  } catch (error) {
    console.error('Photo Analysis Error:', error);
    return {
      overallFeedback: 'Could not analyze photos at this time. Please ensure photos are accessible and try again.',
      suggestions: [],
      missingPhotos: [],
      photoSpecificFeedback: []
    };
  }
} 