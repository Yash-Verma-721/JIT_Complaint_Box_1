import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
import { isUsingMockDatabase, getMockDatabase } from '../services/databaseService';

/**
 * Admin login controller
 * POST /api/auth/admin/login
 */
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('➡️ adminLogin called', { email });

    // Validate request body
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    // TEMP DEBUG: confirm route is reachable (remove after troubleshooting)
    // Comment out the next two lines once we've verified the route
    // res.status(200).json({ success: true, debug: 'adminLogin handler reached', email });
    // return;

    // If using mock in-memory DB, use mock lookup
    let admin: any = null;
    if (isUsingMockDatabase()) {
      console.log('ℹ️ using mock database for admin login');
      const mockDb = getMockDatabase();
      admin = mockDb.getAdminByEmail(email);

      console.log('ℹ️ mock admin lookup result:', { found: !!admin });

      if (!admin) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }

      // Compare password using bcrypt against stored hash
      const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
      console.log('ℹ️ mock password valid:', isPasswordValid);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }
    } else {
      // Find admin by email in MongoDB
      admin = await Admin.findOne({ email: email.toLowerCase() }).select('+passwordHash');

      if (!admin) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }

      // Compare password
      const isPasswordValid = await admin.comparePassword(password);
      console.log('ℹ️ mongo password valid:', isPasswordValid);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
        return;
      }
    }

    // password validity already checked inside each branch

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

  // Generate JWT token
  console.log('ℹ️ about to generate JWT', { jwtSecretPresent: !!process.env.JWT_SECRET, adminId: admin?._id });
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: 'admin',
      },
      jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: '1d',
      }
    );

    // Return token and admin data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('❌ Error during admin login:', error);
    // In development include error stack in response for easier debugging
    const errMsg = (error as any)?.stack || (error as any)?.message || String(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: errMsg,
    });
  }
};
