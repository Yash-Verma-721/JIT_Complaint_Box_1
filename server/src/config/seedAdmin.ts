import Admin from '../models/Admin';

/**
 * Seed default admin user if it doesn't exist
 */
export const seedDefaultAdmin = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@jit.com';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456';

    // Try to seed, but don't fail if MongoDB is down
    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: adminEmail });

      if (existingAdmin) {
        console.log(`✅ Admin with email ${adminEmail} already exists`);
        return;
      }

      // Create default admin
      const newAdmin = new Admin({
        email: adminEmail,
        passwordHash: adminPassword,
        name: 'JIT Admin',
      });

      await newAdmin.save();
      console.log(`✅ Default admin created: ${adminEmail}`);
    } catch (dbErr: any) {
      // Silently fail if DB not available - will fallback to in-memory
      if (dbErr.message.includes('MongoDB') || dbErr.message.includes('connect')) {
        console.log(`⚠️  Skipping admin seed (MongoDB not available)`);
        console.log(`   You can login with: ${adminEmail} / ${adminPassword}`);
      } else {
        throw dbErr;
      }
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    // Don't throw - allow server to start anyway
  }
};
