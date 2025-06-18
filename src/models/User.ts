import { z } from 'zod';

/**
 * User model for Stayll's authentication system
 * 
 * This model handles user registration, login, and profile management
 * for landlords and property managers using the platform.
 */

// Base user schema for validation
const UserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  userType: z.enum(['landlord', 'property_manager', 'admin']).default('landlord'),
  isActive: z.boolean().default(true)
});

// Schema for user creation (without id and timestamps)
const UserCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  userType: z.enum(['landlord', 'property_manager', 'admin']).optional().default('landlord')
});

// Schema for user updates (all fields optional except email)
const UserUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  userType: z.enum(['landlord', 'property_manager', 'admin']).optional(),
  isActive: z.boolean().optional()
});

// Schema for login
const UserLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// User interface for TypeScript
export interface User {
  id: string;
  email: string;
  password: string; // Will be hashed
  firstName: string;
  lastName: string;
  phone?: string;
  companyName?: string;
  userType: 'landlord' | 'property_manager' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User creation interface (without id and timestamps)
export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | undefined;
  companyName?: string | undefined;
  userType?: 'landlord' | 'property_manager' | 'admin' | undefined;
}

// User update interface
export interface UserUpdate {
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
  companyName?: string | undefined;
  userType?: 'landlord' | 'property_manager' | 'admin' | undefined;
  isActive?: boolean | undefined;
}

// Login interface
export interface UserLogin {
  email: string;
  password: string;
}

// Validation functions
export const UserValidator = {
  validateCreate: (data: unknown): UserCreate => {
    return UserCreateSchema.parse(data);
  },
  
  validateUpdate: (data: unknown): UserUpdate => {
    return UserUpdateSchema.parse(data);
  },
  
  validateLogin: (data: unknown): UserLogin => {
    return UserLoginSchema.parse(data);
  }
};

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  userType: string;
  iat?: number;
  exp?: number;
} 