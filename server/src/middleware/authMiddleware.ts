import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extended Request interface with admin authentication data
 */
export interface AuthenticatedRequest extends Request {
  adminId?: string;
  adminEmail?: string;
  adminRole?: string;
}

/**
 * JWT payload interface
 */
interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Middleware to verify JWT token and protect admin routes
 * Reads token from Authorization header: Bearer <token>
 */
export const requireAdminAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Missing or invalid Authorization header',
      });
      return;
    }

    // Extract token
    const token = authHeader.slice(7); // Remove "Bearer " prefix

    // Check JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET is not set in environment variables');
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
    }) as JWTPayload;

    // Attach decoded data to request
    req.adminId = decoded.id;
    req.adminEmail = decoded.email;
    req.adminRole = decoded.role;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    } else {
      console.error('❌ Error verifying token:', error);
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  }
};
