import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface StudentRequest extends Request {
  studentId?: string;
  studentEmail?: string;
}

interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const requireStudentAuth = (
  req: StudentRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Missing or invalid Authorization header',
      });
      return;
    }

    const token = authHeader.slice(7);
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('❌ JWT_SECRET is not set');
      res.status(500).json({
        success: false,
        message: 'Server configuration error',
      });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
    }) as JWTPayload;

    req.studentId = decoded.id;
    req.studentEmail = decoded.email;

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
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  }
};
