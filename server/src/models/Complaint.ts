import { Schema, model, Document } from 'mongoose';

// TypeScript interface for Complaint document
export interface IComplaint extends Document {
  title: string;
  description: string;
  category: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  isAnonymous: boolean;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for Complaint
const complaintSchema = new Schema<IComplaint>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Hostel', 'Academics', 'Infrastructure', 'Administration', 'Other'],
        message: 'Category must be one of: Hostel, Academics, Infrastructure, Administration, Other',
      },
      default: 'Other',
    },
    studentName: {
      type: String,
      default: null,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ['Open', 'In Progress', 'Resolved'],
        message: 'Status must be one of: Open, In Progress, Resolved',
      },
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose model for Complaint
const Complaint = model<IComplaint>('Complaint', complaintSchema);

export default Complaint;
