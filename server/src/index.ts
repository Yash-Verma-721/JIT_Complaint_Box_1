import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
import authRoutes from "./routes/authRoutes";
import complaintRoutes from "./routes/complaintRoutes";
import { seedDefaultAdmin } from "./config/seedAdmin";

// Load environment variables from server .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

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

// Ensure uploads directory exists and serve it statically
const uploadsDir = path.join(__dirname, '..', 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
} catch (err) {
  console.warn('⚠️ Could not create uploads directory:', err);
}
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", dbConnected: mongoose.connection.readyState === 1 });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", complaintRoutes);

const PORT = parseInt(process.env.PORT || '5000', 10);

// Require MONGO_URI from .env - fail loudly if not configured
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in .env file');
  console.error('   Please configure MONGO_URI in your .env file');
  console.error('   Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jit-complaint-box');
  process.exit(1);
}

let server: any;
let dbConnected = false;

const connectDB = async (retries = 2) => {
  try {
    console.log(`\n🔗 Connecting to MongoDB...`);
    console.log(`   URI: ${MONGO_URI.substring(0, 50)}...`); // Log first 50 chars for security
    
    // Try to connect with timeout (Atlas TLS/SSL options included)
    await Promise.race([
      mongoose.connect(MONGO_URI, {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        serverSelectionTimeoutMS: 8000,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 8000)
      )
    ]);
    
    console.log("✅ MongoDB connected successfully");
    dbConnected = true;
    
    try {
      await seedDefaultAdmin();
    } catch (seedErr) {
      console.log('⚠️  Could not seed admin');
    }

    startServer();
  } catch (err: any) {
    if (retries > 0) {
      console.log(`⚠️  Connection attempt failed: ${err.message}`);
      console.log(`🔄 Retrying MongoDB in 1 second... (${retries} retries left)`);
      setTimeout(() => connectDB(retries - 1), 1000);
    } else {
      console.error('❌ MongoDB connection failed after retries.');
      console.error(`   Error: ${err.message}`);
      console.error('   Check your MONGO_URI in the .env file');
      process.exit(1);
    }
  }
};

const startServer = () => {
  if (!server) {
    console.log(`\n🚀 Starting Express server on port ${PORT}...`);
    
    try {
      // Listen on all interfaces (0.0.0.0) by default
      server = app.listen(PORT, () => {
        console.log(`✅ Server successfully listening on http://localhost:${PORT}`);
        console.log(`📋 API Base URL: http://localhost:${PORT}/api`);
        if (!dbConnected) {
          console.log("⚠️  Using in-memory database (no persistence)");
        }
      });
      
      // Catch any errors on the server
      server.on('error', (err: any) => {
        console.error('❌ Server error:', err);
        if (err.code === 'EADDRINUSE') {
          console.error(`   Port ${PORT} is already in use!`);
          console.error(`   Kill process: netstat -ano | findstr :${PORT}`);
        }
        process.exit(1);
      });
    } catch (err) {
      console.error('❌ Exception during app.listen():', err);
      process.exit(1);
    }
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled rejection:', reason);
});

connectDB();

export default app;
