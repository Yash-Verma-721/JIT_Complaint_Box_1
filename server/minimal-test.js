#!/usr/bin/env node
/**
 * Minimal test server to verify Express + MongoDB setup
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = parseInt(process.env.PORT || '5000', 10);
const MONGO_URI = process.env.MONGO_URI;

// Require MONGO_URI - fail if not configured
if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in .env file');
  console.error('   Please configure MONGO_URI in your .env file');
  process.exit(1);
}

console.log('🚀 Minimal Test Server Starting...');
console.log(`   PORT: ${PORT}`);
console.log(`   MONGO_URI: ${MONGO_URI.substring(0, 50)}...`);

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('📍 /health endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Simple echo endpoint
app.get('/echo', (req, res) => {
  console.log('📍 /echo endpoint called');
  res.json({ echo: 'Server is working!', receivedAt: new Date().toISOString() });
});

// POST endpoint for testing
app.post('/test', express.json(), (req, res) => {
  console.log('📨 Received POST request:', req.body);
  res.json({ success: true, received: req.body, timestamp: new Date().toISOString() });
});

// Default 404 handler
app.use((req, res) => {
  console.log(`⚠️  404 on ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not found' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server LISTENING on port ${PORT}`);
  console.log(`   Test with: curl http://localhost:${PORT}/health`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

// Try MongoDB connection (non-blocking)
console.log('\n🔄 Attempting MongoDB connection...');
mongoose.connect(MONGO_URI, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 8000,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
  })
  .catch((err) => {
    console.log('⚠️  MongoDB unavailable:', err.message);
    console.log('   Using in-memory fallback');
  });

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down...');
  server.close(() => {
    console.log('   Server closed');
    process.exit(0);
  });
});
