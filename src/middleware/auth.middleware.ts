import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../models/User';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * JWT Authentication Middleware
 * 
 * Verifies the JWT token in the Authorization header and
 * adds the decoded user information to the request object.
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access token required'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}

/**
 * Optional Authentication Middleware
 * 
 * Similar to authenticateToken but doesn't require a token.
 * If a valid token is provided, user info is added to the request.
 * If no token or invalid token, the request continues without user info.
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    // Token is invalid, but we continue without user info
    console.warn('Invalid token in optional auth:', error);
    next();
  }
}

/**
 * Role-based Authorization Middleware
 * 
 * Checks if the authenticated user has the required role(s).
 */
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.userType)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
}

/**
 * Admin-only Authorization Middleware
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  requireRole(['admin'])(req, res, next);
}

/**
 * Landlord or Admin Authorization Middleware
 */
export function requireLandlordOrAdmin(req: Request, res: Response, next: NextFunction): void {
  requireRole(['landlord', 'admin'])(req, res, next);
} 