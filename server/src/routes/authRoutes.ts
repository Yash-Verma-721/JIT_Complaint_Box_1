import { Router } from 'express';
import { adminLogin } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/admin/login
 * Admin login endpoint
 */
router.post('/admin/login', adminLogin);

export default router;
