import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserValidator, UserCreate, UserLogin, JWTPayload } from '../models/User';
import { UserRepository } from '../repositories/user.repository';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

// Initialize repository
const userRepository = new UserRepository();

/**
 * Express route handler for user registration
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    // 1. Validate the request body
    const userData: UserCreate = UserValidator.validateCreate(req.body);

    // 2. Create the user in database
    const newUser = await userRepository.createUser(userData);

    // 3. Generate JWT token
    const tokenPayload: JWTPayload = {
      userId: newUser.id,
      email: newUser.email,
      userType: newUser.userType
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    // 4. Return success response (without password)
    const { password, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.message === 'User with this email already exists') {
      res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
      return;
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Failed to register user'
    });
  }
}

/**
 * Express route handler for user login
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    // 1. Validate the request body
    const loginData: UserLogin = UserValidator.validateLogin(req.body);

    // 2. Verify user credentials
    const user = await userRepository.verifyUserCredentials(loginData.email, loginData.password);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
      return;
    }

    // 3. Generate JWT token
    const tokenPayload: JWTPayload = {
      userId: user.id,
      email: user.email,
      userType: user.userType
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    // 4. Return success response (without password)
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to login'
    });
  }
}

/**
 * Express route handler for getting user profile
 */
export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    // User ID is set by the auth middleware
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }

    // Get user from database
    const user = await userRepository.getUserById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    // Return user data (without password)
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get profile'
    });
  }
}

/**
 * Express route handler for updating user profile
 */
export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    // User ID is set by the auth middleware
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
      return;
    }

    // 1. Validate the request body
    const updateData = UserValidator.validateUpdate(req.body);

    // 2. Update user in database
    const updatedUser = await userRepository.updateUserById(userId, updateData);
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    // 3. Return updated user data (without password)
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update profile'
    });
  }
} 