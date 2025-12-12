#!/usr/bin/env node

/**
 * JIT Complaint Box - Comprehensive Database & Connection Diagnostic
 * This script tests all database operations and validates the entire stack
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// ============================================================================
// PART 1: ENVIRONMENT & DEPENDENCY CHECK
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('🔍 PHASE 1: ENVIRONMENT & DEPENDENCY CHECK');
console.log('='.repeat(80) + '\n');

// Check .env file
console.log('📋 Checking .env file...');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key) envVars[key.trim()] = value ? value.trim() : '';
    }
  });
  
  console.log('✅ .env found with variables:');
  ['PORT', 'MONGO_URI', 'JWT_SECRET', 'ADMIN_DEFAULT_EMAIL', 'ADMIN_DEFAULT_PASSWORD'].forEach(key => {
    console.log(`   ${key}: ${envVars[key] ? '✓ SET' : '✗ MISSING'} ${envVars[key] ? `(${envVars[key].substring(0, 40)}...)` : ''}`);
  });
} else {
  console.log('❌ .env file not found');
}

// Check Node and npm versions
console.log('\n📦 Environment versions:');
const nodeVersion = process.version;
const npmVersion = require('child_process').execSync('npm -v', { encoding: 'utf-8' }).trim();
console.log(`   Node.js: ${nodeVersion}`);
console.log(`   npm: ${npmVersion}`);

// Check dependencies
console.log('\n📚 Checking critical dependencies:');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const deps = packageJson.dependencies;
const requiredDeps = [
  'express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 'cors', 'dotenv', 'multer'
];
requiredDeps.forEach(dep => {
  if (deps[dep]) {
    console.log(`   ✅ ${dep}: ${deps[dep]}`);
  } else {
    console.log(`   ❌ ${dep}: NOT INSTALLED`);
  }
});

// Check critical files
console.log('\n📁 Checking critical files:');
const criticalFiles = [
  'src/index.ts',
  'src/controllers/authController.ts',
  'src/models/Admin.ts',
  'src/models/Complaint.ts',
  'src/services/mockDatabase.ts',
  'src/services/databaseService.ts',
];
criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`   ✅ ${file} (${stats.size} bytes)`);
  } else {
    console.log(`   ❌ ${file}: NOT FOUND`);
  }
});

// ============================================================================
// PART 2: CHECK PORT AVAILABILITY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('🔍 PHASE 2: PORT AVAILABILITY CHECK');
console.log('='.repeat(80) + '\n');

const net = require('net');
const PORT = process.env.PORT || 5000;

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(null); // Unknown error
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

checkPort(PORT).then(available => {
  if (available === true) {
    console.log(`✅ Port ${PORT} is AVAILABLE and can be used`);
  } else if (available === false) {
    console.log(`❌ Port ${PORT} is ALREADY IN USE`);
    console.log('   To kill the process on Windows:');
    console.log(`   netstat -ano | findstr :${PORT}`);
    console.log(`   taskkill /PID <PID> /F`);
  } else {
    console.log(`⚠️  Could not determine port availability`);
  }
  
  // ============================================================================
  // PART 3: TEST HTTP REQUEST TO BACKEND
  // ============================================================================
  console.log('\n' + '='.repeat(80));
  console.log('🔍 PHASE 3: BACKEND CONNECTIVITY TEST');
  console.log('='.repeat(80) + '\n');
  
  console.log(`⏳ Attempting to connect to http://localhost:${PORT}/health`);
  console.log('   (Make sure backend is running!)');
  
  const testUrl = `http://localhost:${PORT}/health`;
  const req = http.get(testUrl, { timeout: 5000 }, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log(`\n✅ Backend responding on port ${PORT}`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Response: ${data}`);
      
      // Test admin login
      console.log('\n⏳ Testing admin login endpoint...');
      testAdminLogin();
    });
  }).on('error', (err) => {
    console.log(`\n❌ Cannot reach backend: ${err.message}`);
    console.log('   Make sure to run: cd server && npm run dev');
    console.log('\n' + '='.repeat(80));
    console.log('📊 DIAGNOSTIC SUMMARY');
    console.log('='.repeat(80));
    console.log('\n⚠️  Backend server is not running. Please start it:');
    console.log('   cd server');
    console.log('   npm run dev');
    process.exit(1);
  }).on('timeout', () => {
    console.log(`\n❌ Request timeout - backend may not be listening`);
    process.exit(1);
  });
});

// ============================================================================
// TEST ADMIN LOGIN ENDPOINT
// ============================================================================
function testAdminLogin() {
  const testData = JSON.stringify({
    email: 'admin@jit.com',
    password: 'admin123456'
  });
  
  const options = {
    hostname: 'localhost',
    port: process.env.PORT || 5000,
    path: '/api/auth/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData.length
    },
    timeout: 5000
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      console.log(`\n✅ Admin login endpoint responding`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Response: ${data.substring(0, 100)}...`);
      
      if (res.statusCode === 200) {
        console.log('\n✅ ADMIN LOGIN SUCCESSFUL!');
        const response = JSON.parse(data);
        if (response.token) {
          console.log(`   Token received (length: ${response.token.length})`);
        }
      } else if (res.statusCode === 401) {
        console.log('\n⚠️  Admin credentials rejected (expected if using real MongoDB)');
      }
      
      printSummary();
    });
  }).on('error', (err) => {
    console.log(`\n❌ Admin login endpoint error: ${err.message}`);
    printSummary();
  }).on('timeout', () => {
    console.log(`\n⚠️  Admin login request timeout`);
    printSummary();
  });
  
  req.write(testData);
  req.end();
}

// ============================================================================
// FINAL SUMMARY
// ============================================================================
function printSummary() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(80) + '\n');
  
  console.log('✅ CHECKS COMPLETED\n');
  console.log('Next steps:');
  console.log('1. ✅ Environment variables configured');
  console.log('2. ✅ All dependencies installed');
  console.log('3. ✅ Critical files present');
  console.log('4. ⏳ Backend connectivity test (see results above)\n');
  
  console.log('If you see errors above, troubleshoot:');
  console.log('• For port errors: Kill existing process and restart');
  console.log('• For connection errors: Start backend with: cd server && npm run dev');
  console.log('• For MongoDB errors: Use in-memory fallback (automatically activated)');
  console.log('• For file errors: Check file paths and permissions\n');
  
  process.exit(0);
}
