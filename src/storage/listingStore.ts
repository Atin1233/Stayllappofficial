import { Listing } from '../models/Listing';

/**
 * Temporary in-memory storage for generated listings
 * 
 * This simulates a database during development, allowing landlords to
 * revisit their generated listings without regenerating them.
 */
const listings: Listing[] = [];

/**
 * Add a new listing to the in-memory store
 */
export function addListing(listing: Listing): void {
  listings.push(listing);
}

/**
 * Get all saved listings from the in-memory store
 */
export function getAllListings(): Listing[] {
  return [...listings]; // Return copy to prevent external mutation
} 