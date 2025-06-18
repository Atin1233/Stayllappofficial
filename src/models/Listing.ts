/**
 * Listing model for Stayll's AI-generated rental listings
 * 
 * This model stores the results of AI listing generation for dashboard display
 * and later reuse in the core automation workflow.
 */
export interface Listing {
  /** Unique identifier for the listing */
  id: string;
  
  /** The AI-generated rental copy */
  listingText: string;
  
  /** Timestamp of when the listing was created */
  createdAt: Date;
  
  /** The ID of the property this listing is linked to */
  propertyId: string;
  
  /** Original property data used to generate the listing (snapshot) */
  propertyData: any;
} 