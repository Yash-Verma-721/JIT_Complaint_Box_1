import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { seedDefaultAdmin } from './config/seedAdmin';
import authRouter from './routes/authRoutes';
import complaintRouter from './routes/complaintRoutes';

// Load environment variables from server .env file with absolute path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Express = express();

// ============ CORS CONFIGURATION ============
// Allow requests from frontend (localhost:3000 in dev, production URL in prod)
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Environment variables
const PORT = parseInt(process.env.PORT || '5000', 10);

// Require MONGO_URI from .env - fail loudly if not configured
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in .env file');
  console.error('   Please configure MONGO_URI in your .env file');
  console.error('   Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jit-complaint-box');
  process.exit(1);
}


// MongoDB Connection with timeout and error handling
const connectDB = async () => {
  try {
    console.log(`\n🔗 Connecting to MongoDB...`);
    console.log(`   URI: ${MONGO_URI.substring(0, 50)}...`); // Log first 50 chars for security
    
    // Try to connect with timeout
    await Promise.race([
      mongoose.connect(MONGO_URI, {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        serverSelectionTimeoutMS: 8000,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout (8s)')), 8000)
      )
    ]);
    
    console.log('✅ MongoDB connected successfully');
    
    // Seed default admin after successful connection
    try {
      await seedDefaultAdmin();
    } catch (seedErr) {
      console.log('⚠️  Could not seed admin:', seedErr);
    }
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message || error);
    console.error('Please verify your MONGO_URI in the .env file');
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
// Mount complaintRouter on the base /api so routes inside can be
// defined as /complaints and /admin/complaints (matching frontend)
app.use('/api', complaintRouter);

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
