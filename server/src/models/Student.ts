import { Schema, model, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

/**
 * Student document interface
 */
export interface IStudent extends Document {
  email: string;
  passwordHash: string;
  name: string;
  studentId: string; // unique student ID
  createdAt: Date;
  updatedAt: Date;
  comparePassword(plainPassword: string): Promise<boolean>;
}

/**
 * Student schema
 */
const studentSchema = new Schema<IStudent>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving
 */
studentSchema.pre('save', async function (next: any) {
  if (!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * Method to compare password
 */
studentSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
  return await bcryptjs.compare(plainPassword, this.passwordHash);
};

/**
 * Student model
 */
const Student = model<IStudent>('Student', studentSchema);

export default Student;
