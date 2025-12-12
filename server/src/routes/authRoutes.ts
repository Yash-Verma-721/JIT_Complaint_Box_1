import { Router } from 'express';
import { adminLogin } from '../controllers/authController';
import { studentSignup, studentLogin } from '../controllers/studentAuthController';

const router = Router();

/**
 * POST /api/auth/admin/login
 * Admin login endpoint
 */
router.post('/admin/login', adminLogin);

/**
 * POST /api/auth/student/signup
 * Student registration endpoint
 */
router.post('/student/signup', studentSignup);

/**
 * POST /api/auth/student/login
 * Student login endpoint
 */
router.post('/student/login', studentLogin);

export default router;
