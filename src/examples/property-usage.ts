import { 
  PropertyValidator, 
  PropertyHelpers, 
  DEFAULT_PROPERTY_VALUES,
  type Property,
  type PropertyCreate 
} from '../models/Property';

/**
 * Example usage of the Property model for Stayll's auto listing generation
 */

// Example 1: Creating a property with validation
function createPropertyExample() {
  console.log('=== Creating a Property ===');
  
  const propertyData: PropertyCreate = {
    title: "Modern 2BR Apartment in Downtown",
    address: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    rent: 3200,
    description: "Beautiful modern apartment with stunning city views, hardwood floors, and updated kitchen. Perfect for professionals seeking a convenient downtown location.",
    amenities: ["Air Conditioning", "Dishwasher", "Balcony", "Hardwood Floors", "Walk-in Closet"],
    availabilityDate: new Date('2024-02-01'),
    photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg"
    ],
    propertyType: "apartment",
    petFriendly: true,
    utilitiesIncluded: false
  };

  try {
    const validatedProperty = PropertyValidator.validateCreate(propertyData);
    console.log('✅ Property created successfully:', validatedProperty.title);
    return validatedProperty;
  } catch (error) {
    console.error('❌ Property validation failed:', error);
    return null;
  }
}

// Example 2: Safe validation with error handling
function safeValidationExample() {
  console.log('\n=== Safe Validation Example ===');
  
  const invalidData = {
    title: "", // Empty title should fail
    address: "123 Test St",
    city: "Test City",
    state: "T", // Invalid state format
    zip: "123", // Invalid ZIP format
    numberOfBedrooms: -1, // Invalid number
    numberOfBathrooms: 1,
    rent: 2000,
    description: "Short", // Too short
    amenities: [], // Empty array should fail
    photos: ["not-a-url"] // Invalid URL
  };

  const result = PropertyValidator.safeValidate(invalidData);
  
  if (result.success) {
    console.log('✅ Validation successful');
  } else {
    console.log('❌ Validation failed with errors:');
    result.errors.forEach(error => console.log(`  - ${error}`));
  }
}

// Example 3: Using helper functions
function helperFunctionsExample(property: PropertyCreate) {
  console.log('\n=== Helper Functions Example ===');
  
  // Format address
  const formattedAddress = PropertyHelpers.formatAddress(property);
  console.log('📍 Formatted address:', formattedAddress);
  
  // Generate title
  const autoTitle = PropertyHelpers.generateTitle(property);
  console.log('🏠 Auto-generated title:', autoTitle);
  
  // Estimate square footage
  const estimatedSqFt = PropertyHelpers.estimateSquareFootage(
    property.numberOfBedrooms, 
    property.numberOfBathrooms
  );
  console.log('📐 Estimated square footage:', estimatedSqFt);
  
  // Validate amenities
  const validAmenities = PropertyHelpers.validateAmenities(property.amenities);
  console.log('✅ Valid amenities:', validAmenities);
}

// Example 4: Property updates
function propertyUpdateExample() {
  console.log('\n=== Property Update Example ===');
  
  const updateData = {
    rent: 3400, // Increased rent
    description: "Updated description with more details about the neighborhood and amenities.",
    amenities: ["Air Conditioning", "Dishwasher", "Balcony", "Hardwood Floors", "Walk-in Closet", "Gym"],
    petFriendly: false // Changed pet policy
  };

  try {
    const validatedUpdate = PropertyValidator.validateUpdate(updateData);
    console.log('✅ Update data validated:', validatedUpdate);
  } catch (error) {
    console.error('❌ Update validation failed:', error);
  }
}

// Example 5: Form initialization
function formInitializationExample() {
  console.log('\n=== Form Initialization Example ===');
  
  // Use default values for form initialization
  const formData = { ...DEFAULT_PROPERTY_VALUES };
  console.log('📝 Form initialized with defaults:', {
    title: formData.title,
    numberOfBedrooms: formData.numberOfBedrooms,
    numberOfBathrooms: formData.numberOfBathrooms,
    propertyType: formData.propertyType,
    petFriendly: formData.petFriendly
  });
}

// Run all examples
function runExamples() {
  console.log('🚀 Stayll Property Model Examples\n');
  
  const property = createPropertyExample();
  safeValidationExample();
  
  if (property) {
    helperFunctionsExample(property);
  }
  
  propertyUpdateExample();
  formInitializationExample();
  
  console.log('\n✅ All examples completed!');
}

// Export for use in other files
export {
  createPropertyExample,
  safeValidationExample,
  helperFunctionsExample,
  propertyUpdateExample,
  formInitializationExample,
  runExamples
}; 