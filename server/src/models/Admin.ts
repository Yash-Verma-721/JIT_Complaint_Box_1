import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript interface for Admin document
export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// Mongoose schema for Admin
const adminSchema = new Schema<IAdmin>(
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
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
adminSchema.pre('save', async function (next) {
  // Only hash password if it has been modified or is new
  if (!this.isModified('passwordHash')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error as any);
  }
});

// Instance method to compare passwords
adminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.passwordHash);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Mongoose model for Admin
const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
