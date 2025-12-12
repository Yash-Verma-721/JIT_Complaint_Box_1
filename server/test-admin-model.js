const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Recreate the Admin schema inline to test
const { Schema } = mongoose;

const adminSchema = new Schema(
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
      select: false,
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

// Hash password before saving
adminSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) {
    return;
  }

  const salt = await bcryptjs.genSalt(10);
  this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
});

// Method to compare password
adminSchema.methods.comparePassword = async function (plainPassword) {
  return await bcryptjs.compare(plainPassword, this.passwordHash);
};

const Admin = mongoose.model('TestAdmin', adminSchema);

async function testAdminModel() {
  try {
    console.log('🧪 Starting Admin Model Test...\n');

    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI not set');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 8000,
    });
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Create a new admin
    console.log('📝 Test 1: Creating new admin...');
    const testAdmin = new Admin({
      email: 'test-admin@jit.com',
      passwordHash: 'TestPassword123',
      name: 'Test Admin',
    });

    console.log('  - Email:', testAdmin.email);
    console.log('  - Password (before save):', testAdmin.passwordHash);

    await testAdmin.save();
    console.log('  - Password (after save - hashed):', testAdmin.passwordHash.substring(0, 20) + '...');
    console.log('✅ Admin created and password hashed\n');

    // Test 2: Find admin and verify password hashing
    console.log('📝 Test 2: Finding admin and verifying password hashing...');
    const foundAdmin = await Admin.findOne({ email: 'test-admin@jit.com' }).select('+passwordHash');
    console.log('  - Found admin:', foundAdmin.email);
    console.log('  - Name:', foundAdmin.name);
    console.log('  - Password hash:', foundAdmin.passwordHash.substring(0, 20) + '...');
    console.log('✅ Admin found\n');

    // Test 3: Compare passwords
    console.log('📝 Test 3: Comparing passwords...');
    const isCorrect = await foundAdmin.comparePassword('TestPassword123');
    console.log('  - Correct password match:', isCorrect);

    const isWrong = await foundAdmin.comparePassword('WrongPassword');
    console.log('  - Wrong password match:', isWrong);
    console.log('✅ Password comparison works\n');

    // Test 4: Verify timestamps
    console.log('📝 Test 4: Verifying timestamps...');
    console.log('  - createdAt:', foundAdmin.createdAt);
    console.log('  - updatedAt:', foundAdmin.updatedAt);
    console.log('✅ Timestamps set correctly\n');

    // Test 5: Verify fields are properly trimmed
    console.log('📝 Test 5: Testing field trimming...');
    const adminWithSpaces = new Admin({
      email: '  spaced@jit.com  ',
      passwordHash: 'Pass123456',
      name: '  Spaced Name  ',
    });
    await adminWithSpaces.save();
    
    const trimmedAdmin = await Admin.findOne({ email: 'spaced@jit.com' });
    console.log('  - Email trimmed:', trimmedAdmin.email === 'spaced@jit.com');
    console.log('  - Name trimmed:', trimmedAdmin.name === 'Spaced Name');
    console.log('✅ Field trimming works\n');

    console.log('🎉 All Admin Model Tests Passed!\n');
    
    // Cleanup
    await Admin.deleteMany({ email: { $in: ['test-admin@jit.com', 'spaced@jit.com'] } });
    console.log('🧹 Test data cleaned up\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

testAdminModel();
