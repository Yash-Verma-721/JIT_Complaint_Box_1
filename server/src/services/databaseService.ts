import mongoose from 'mongoose';
import { mockDatabase, MockDatabase } from './mockDatabase';

let useMockDatabase = false;

export const initializeDatabase = async (mongoUri: string, retries = 3): Promise<boolean> => {
  try {
    await mongoose.connect(mongoUri, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 8000,
    });
    console.log('✅ Connected to MongoDB');
    useMockDatabase = false;
    return true;
  } catch (err: any) {
    console.error('❌ MongoDB connection failed:', err.message);

    if (retries > 0) {
      console.log(`🔄 Retrying in 3 seconds... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return initializeDatabase(mongoUri, retries - 1);
    }

    console.error('❌ MongoDB connection failed after retries. Exiting.');
    process.exit(1);
  }
};

export const isUsingMockDatabase = (): boolean => useMockDatabase;
export const getMockDatabase = (): MockDatabase => mockDatabase;
