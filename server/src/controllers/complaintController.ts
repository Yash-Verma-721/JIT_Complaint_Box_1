import { Response } from 'express';
import Complaint, { IComplaint } from '../models/Complaint';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

/**
 * Create a new complaint
 * POST /api/complaints
 */
export const createComplaint = async (req: any, res: Response): Promise<void> => {
  try {
    const { title, description, category, studentName, isAnonymous, studentId } = req.body;
    // If a file was uploaded by multer it will be available at req.file
    const file = req.file as Express.Multer.File | undefined;

    // Validate required fields
    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
      return;
    }

    // Create new complaint with default status "Open"
    const complaint = new Complaint({
      title,
      description,
      category: category || 'Other',
      studentName: studentName || null,
      studentId: studentId || null,
      photoUrl: file ? `/uploads/${file.filename}` : null,
      isAnonymous: isAnonymous || false,
      status: 'Open', // Default status
    });

    // Save complaint
    const savedComplaint = await complaint.save();

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error('❌ Error creating complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get all complaints for admin with optional filters
 * GET /api/admin/complaints
 * Query params: status, category
 */
export const getAllComplaintsForAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Build filter query
    const filter: any = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Fetch complaints with filters, sorted by createdAt descending
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error('❌ Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Update complaint status
 * PATCH /api/admin/complaints/:id/status
 * Body: { status }
 */
export const updateComplaintStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Open', 'In Progress', 'Resolved'];
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Status is required',
      });
      return;
    }

    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
      return;
    }

    // Find and update complaint
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedComplaint) {
      res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Complaint status updated successfully',
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error('❌ Error updating complaint status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
