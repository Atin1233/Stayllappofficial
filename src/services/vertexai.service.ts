import { VertexAI } from '@google-cloud/vertexai';
import axios from 'axios';

const project = 'stayll';
const location = 'us-central1';
const model = 'gemini-2.0-flash-lite'; // Google's general-purpose text generation model

const vertexAI = new VertexAI({ project, location });

export async function generateListingWithVertexAI(prompt: string): Promise<string> {
  try {
    const generativeModel = vertexAI.getGenerativeModel({ model });
    const result = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate listing at this time.';
    
    // Remove markdown bolding (**) from the response
    const cleanedText = responseText.replace(/\*\*/g, '');
    
    return cleanedText;
  } catch (error) {
    console.error('Vertex AI Error:', error);
    return 'Unable to generate listing at this time.';
  }
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
    
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
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
    const baseRent = propertyData.numberOfBedrooms * 800 + propertyData.numberOfBathrooms * 200;
    const locationMultiplier = getLocationMultiplier(propertyData.city, propertyData.state);
    const amenitiesBonus = propertyData.amenities.length * 50;
    const utilitiesBonus = propertyData.utilitiesIncluded ? 100 : 0;
    const petBonus = propertyData.petFriendly ? 50 : 0;
    
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
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
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