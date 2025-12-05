import { Request, Response } from "express";
import { Complaint } from "../models/Complaint";
import { AuthRequest } from "../middleware/authMiddleware";

export const getAdminComplaints = async (req: AuthRequest, res: Response) => {
  try {
    const { status, category } = req.query as {
      status?: string;
      category?: string;
    };

    const filter: any = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    return res.json(complaints);
  } catch (error) {
    console.error("Get admin complaints error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateComplaintStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status?: string };

    if (!status || !["Open", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json(complaint);
  } catch (error) {
    console.error("Update complaint status error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
