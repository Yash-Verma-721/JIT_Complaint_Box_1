import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedDefaultAdmin } from './config/seedAdmin';
import authRouter from './routes/authRoutes';
import complaintRouter from './routes/complaintRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jit-complaint-box';

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('✅ MongoDB connected successfully');
    
    // Seed default admin after successful connection
    await seedDefaultAdmin();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
app.use('/api/auth', authRouter);

// Complaint routes
app.use('/api/complaints', complaintRouter);

// Export app for testing
export default app;

// Start server
export const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 JIT Complaint Box server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
