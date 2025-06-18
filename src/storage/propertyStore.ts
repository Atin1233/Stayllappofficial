import { PropertyCreate } from '../models/Property';

/**
 * Property interface for storage
 */
export interface StoredProperty extends PropertyCreate {
  id: string;
  createdAt: Date;
}

/**
 * Temporary in-memory storage for properties
 * 
 * This simulates a database during development, allowing landlords to
 * manage their properties before full database integration in Phase 3.
 */
const properties: StoredProperty[] = [];

/**
 * Add a new property to the in-memory store
 */
export function addProperty(property: PropertyCreate): StoredProperty {
  const newProperty: StoredProperty = {
    ...property,
    id: Math.random().toString(36).substr(2, 9), // Simple ID for now
    createdAt: new Date()
  };
  
  properties.push(newProperty);
  return newProperty;
}

/**
 * Get all saved properties from the in-memory store
 */
export function getAllProperties(): StoredProperty[] {
  return [...properties]; // Return copy to prevent external mutation
}

/**
 * Get a property by ID
 */
export function getPropertyById(id: string): StoredProperty | undefined {
  return properties.find(property => property.id === id);
}

/**
 * Delete a property by ID
 */
export function deletePropertyById(id: string): boolean {
  const index = properties.findIndex(property => property.id === id);
  if (index !== -1) {
    properties.splice(index, 1);
    return true;
  }
  return false;
} 