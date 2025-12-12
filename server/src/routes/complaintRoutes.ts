import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  createComplaint,
  getAllComplaintsForAdmin,
  updateComplaintStatus,
  getStudentComplaints,
} from '../controllers/complaintController';
import { requireAdminAuth } from '../middleware/authMiddleware';
import { requireStudentAuth } from '../middleware/studentAuthMiddleware';

const router = Router();

/**
 * POST /api/complaints
 * Create a new complaint (public endpoint)
 */
// Configure multer storage to server/uploads
const uploadsPath = path.join(__dirname, '..', '..', 'server', 'uploads');
// fallback to project/server/uploads if that path doesn't exist in build
const resolvedUploads = path.join(__dirname, '..', '..', 'uploads');
const finalUploads = fs.existsSync(uploadsPath) ? uploadsPath : resolvedUploads;
try { if (!fs.existsSync(finalUploads)) fs.mkdirSync(finalUploads, { recursive: true }); } catch (err) { /* ignore */ }

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => cb(null, finalUploads),
  filename: (_req: any, file: any, cb: any) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

// Define the explicit /complaints path so when this router is mounted at
// /api the full path becomes POST /api/complaints which matches the client.
router.post('/complaints', requireStudentAuth, upload.single('photo'), createComplaint);

/**
 * GET /api/admin/complaints
 * Get all complaints for admin (protected)
 * Query params: status, category
 */
router.get('/admin/complaints', requireAdminAuth, getAllComplaintsForAdmin);

/**
 * GET /api/student/complaints
 * Get student's own complaints (protected)
 */
router.get('/student/complaints', requireStudentAuth, getStudentComplaints);

/**
 * PATCH /api/admin/complaints/:id/status
 * Update complaint status (protected)
 * Body: { status }
 */
router.patch('/admin/complaints/:id/status', requireAdminAuth, updateComplaintStatus);

export default router;
