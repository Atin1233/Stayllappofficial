import { PropertyCreate } from '../models/Property';
import { v4 as uuidv4 } from 'uuid';

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
let properties: StoredProperty[] = [];

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
  const initialLength = properties.length;
  properties = properties.filter(p => p.id !== id);
  return properties.length < initialLength;
}

export function bulkDeletePropertiesById(ids: string[]): number {
  const initialLength = properties.length;
  const idSet = new Set(ids);
  properties = properties.filter(p => !idSet.has(p.id));
  return initialLength - properties.length;
}

export function updatePropertyById(id: string, updates: Partial<PropertyCreate>): StoredProperty | null {
  const propertyToUpdate = properties.find(p => p.id === id);

  if (!propertyToUpdate) {
    return null;
  }
  
  const updatedProperty: StoredProperty = {
    ...propertyToUpdate,
    ...updates,
  };
  
  properties = properties.map(p => (p.id === id ? updatedProperty : p));
  return updatedProperty;
} 