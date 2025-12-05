import Admin from '../models/Admin';

/**
 * Seed default admin user if it doesn't exist
 */
export const seedDefaultAdmin = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL;
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;

    // Validate environment variables
    if (!adminEmail || !adminPassword) {
      console.warn(
        '⚠️  ADMIN_DEFAULT_EMAIL or ADMIN_DEFAULT_PASSWORD not set in environment variables'
      );
      return;
    }

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
    console.log(`✅ Default admin created successfully with email: ${adminEmail}`);
  } catch (error) {
    console.error('❌ Error seeding default admin:', error);
    throw error;
  }
};
