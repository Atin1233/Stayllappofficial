import { UserCreate, User, UserUpdate } from '../models/User';
import bcrypt from 'bcryptjs';

/**
 * User interface for storage
 */
export interface StoredUser extends User {
  // Already includes id, createdAt, updatedAt from User interface
}

/**
 * Temporary in-memory storage for users
 * 
 * This simulates a database during development, allowing user authentication
 * before full database integration in Phase 4.
 */
const users: StoredUser[] = [];

/**
 * Add a new user to the in-memory store
 */
export async function addUser(userData: UserCreate): Promise<StoredUser> {
  // Check if user already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash the password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const newUser: StoredUser = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9), // Simple ID for now
    password: hashedPassword,
    userType: userData.userType || 'landlord', // Ensure userType has a value
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    phone: userData.phone ?? '',
    companyName: userData.companyName ?? '',
  };
  
  users.push(newUser);
  return newUser;
}

/**
 * Get all users from the in-memory store
 */
export function getAllUsers(): StoredUser[] {
  return [...users]; // Return copy to prevent external mutation
}

/**
 * Get a user by ID
 */
export function getUserById(id: string): StoredUser | undefined {
  return users.find(user => user.id === id);
}

/**
 * Get a user by email
 */
export function getUserByEmail(email: string): StoredUser | undefined {
  return users.find(user => user.email === email);
}

/**
 * Update a user by ID
 */
export async function updateUserById(id: string, updateData: UserUpdate): Promise<StoredUser | null> {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const existingUser = users[userIndex];
  if (!existingUser) {
    return null;
  }

  const updatedUser: StoredUser = {
    id: existingUser.id,
    email: (updateData as any).email ?? existingUser.email,
    password: (updateData as any).password ?? existingUser.password,
    firstName: updateData.firstName ?? existingUser.firstName,
    lastName: updateData.lastName ?? existingUser.lastName,
    userType: updateData.userType ?? existingUser.userType,
    isActive: updateData.isActive ?? existingUser.isActive,
    createdAt: existingUser.createdAt,
    updatedAt: new Date(),
    phone: updateData.phone ?? existingUser.phone ?? '',
    companyName: updateData.companyName ?? existingUser.companyName ?? '',
  };

  users[userIndex] = updatedUser;
  return updatedUser;
}

/**
 * Delete a user by ID (soft delete by setting isActive to false)
 */
export function deleteUserById(id: string): boolean {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return false;
  }
  if (users[userIndex]) {
    users[userIndex].isActive = false;
    users[userIndex].updatedAt = new Date();
    return true;
  }
  return false;
}

/**
 * Verify user credentials
 */
export async function verifyUserCredentials(email: string, password: string): Promise<StoredUser | null> {
  const user = getUserByEmail(email);
  if (!user || !user.isActive) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return user;
} 