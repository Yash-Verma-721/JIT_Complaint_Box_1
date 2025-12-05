import { Router } from "express";
import { requireAdminAuth } from "../middleware/authMiddleware";
import {
  getAdminComplaints,
  updateComplaintStatus,
} from "../controllers/adminComplaintController";

const router = Router();

// GET /api/admin/complaints
router.get("/complaints", requireAdminAuth, getAdminComplaints);

// PATCH /api/admin/complaints/:id/status
router.patch("/complaints/:id/status", requireAdminAuth, updateComplaintStatus);

export default router;
