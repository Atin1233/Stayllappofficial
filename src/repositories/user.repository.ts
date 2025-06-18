import { PrismaClient } from '@prisma/client';
import { UserCreate, UserUpdate, User } from '../models/User';
import bcrypt from 'bcryptjs';

/**
 * User Repository for database operations
 * 
 * This repository handles all user-related database operations,
 * replacing the in-memory storage with persistent database storage.
 */

const prisma = new PrismaClient();

export class UserRepository {
  /**
   * Create a new user
   */
  async createUser(userData: UserCreate): Promise<User> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email || '' }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Ensure required fields are present
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      throw new Error('Missing required fields: email, password, firstName, lastName');
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || null,
        companyName: userData.companyName || null,
        userType: userData.userType?.toUpperCase() as any || 'LANDLORD'
      }
    });

    // Convert Prisma result to our User interface (null to undefined)
    return this.convertPrismaUserToUser(newUser);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    return user ? this.convertPrismaUserToUser(user) : null;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user ? this.convertPrismaUserToUser(user) : null;
  }

  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return users.map(user => this.convertPrismaUserToUser(user));
  }

  /**
   * Update user by ID
   */
  async updateUserById(id: string, updateData: UserUpdate): Promise<User | null> {
    try {
      // Build update data object, only including defined values
      const updateObject: any = {};
      
      if (updateData.firstName !== undefined) updateObject.firstName = updateData.firstName;
      if (updateData.lastName !== undefined) updateObject.lastName = updateData.lastName;
      if (updateData.phone !== undefined) updateObject.phone = updateData.phone || null;
      if (updateData.companyName !== undefined) updateObject.companyName = updateData.companyName || null;
      if (updateData.userType !== undefined) updateObject.userType = updateData.userType?.toUpperCase();
      if (updateData.isActive !== undefined) updateObject.isActive = updateData.isActive;

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateObject
      });

      return this.convertPrismaUserToUser(updatedUser);
    } catch (error) {
      // User not found
      return null;
    }
  }

  /**
   * Delete user by ID (soft delete)
   */
  async deleteUserById(id: string): Promise<boolean> {
    try {
      await prisma.user.update({
        where: { id },
        data: { isActive: false }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify user credentials
   */
  async verifyUserCredentials(email: string, password: string): Promise<User | null> {
    try {
      console.log('Verifying credentials for email:', email);
      
      const user = await this.getUserByEmail(email);
      console.log('User found:', user ? 'Yes' : 'No');
      
      if (!user || !user.isActive) {
        console.log('User not found or not active');
        return null;
      }

      console.log('Comparing passwords...');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);
      
      if (!isPasswordValid) {
        return null;
      }

      console.log('Credentials verified successfully');
      return user;
    } catch (error) {
      console.error('Error in verifyUserCredentials:', error);
      throw error;
    }
  }

  /**
   * Get users by type
   */
  async getUsersByType(userType: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { 
        userType: userType.toUpperCase() as any,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return users.map(user => this.convertPrismaUserToUser(user));
  }

  /**
   * Get active users count
   */
  async getActiveUsersCount(): Promise<number> {
    return await prisma.user.count({
      where: { isActive: true }
    });
  }

  /**
   * Convert Prisma user to our User interface
   * Handles null to undefined conversion
   */
  private convertPrismaUserToUser(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      phone: prismaUser.phone || undefined,
      companyName: prismaUser.companyName || undefined,
      userType: prismaUser.userType.toLowerCase() as any,
      isActive: prismaUser.isActive,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    };
  }
} 