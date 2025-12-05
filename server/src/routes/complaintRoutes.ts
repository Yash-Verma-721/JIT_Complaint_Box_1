import { Router } from 'express';
import {
  createComplaint,
  getAllComplaintsForAdmin,
  updateComplaintStatus,
} from '../controllers/complaintController';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = Router();

/**
 * POST /api/complaints
 * Create a new complaint (public endpoint)
 */
router.post('/', createComplaint);

/**
 * GET /api/complaints/admin
 * Get all complaints for admin (protected)
 * Query params: status, category
 */
router.get('/admin', requireAdminAuth, getAllComplaintsForAdmin);

/**
 * PATCH /api/complaints/admin/:id/status
 * Update complaint status (protected)
 * Body: { status }
 */
router.patch('/admin/:id/status', requireAdminAuth, updateComplaintStatus);

export default router;
