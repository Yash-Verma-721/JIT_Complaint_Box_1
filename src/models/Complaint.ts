import mongoose, { Document, Schema } from "mongoose";

export type ComplaintStatus = "Open" | "In Progress" | "Resolved";

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: "Hostel" | "Academics" | "Infrastructure" | "Administration" | "Other";
  studentName?: string;
  isAnonymous: boolean;
  status: ComplaintStatus;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Hostel", "Academics", "Infrastructure", "Administration", "Other"],
      default: "Other",
    },
    studentName: { type: String, trim: true },
    isAnonymous: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model<IComplaint>(
  "Complaint",
  complaintSchema
);
