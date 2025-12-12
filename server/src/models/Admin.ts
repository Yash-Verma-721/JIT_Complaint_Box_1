import { Schema, model, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

/**
 * Admin document interface
 */
export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(plainPassword: string): Promise<boolean>;
}

/**
 * Admin schema
 */
const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
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
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving
 */
adminSchema.pre('save', async function () {
  // Only hash password if it has been modified or is new
  if (!this.isModified('passwordHash')) {
    return;
  }

  const salt = await bcryptjs.genSalt(10);
  this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
});

/**
 * Method to compare password
 */
adminSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
  return await bcryptjs.compare(plainPassword, this.passwordHash);
};

/**
 * Admin model
 */
const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
