// Mock In-Memory Database for Development
// This is used when MongoDB is not available

interface MockComplaint {
  _id: string;
  title: string;
  description: string;
  category: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  isAnonymous: boolean;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

interface MockAdmin {
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MockDatabase {
  private complaints: Map<string, MockComplaint> = new Map();
  private admins: Map<string, MockAdmin> = new Map();

  constructor() {
    console.log('📝 Using In-Memory Mock Database (MongoDB not available)');
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with sample data
    const mockComplaints: MockComplaint[] = [
      {
        _id: '1',
        title: 'WiFi connectivity issues in hostel',
        description: 'The WiFi signal is very weak in block C',
        category: 'Infrastructure',
        studentName: 'John Doe',
        isAnonymous: false,
        status: 'In Progress',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        _id: '2',
        title: 'Canteen food quality',
        description: 'The food quality has been declining',
        category: 'Administration',
        studentName: undefined,
        isAnonymous: true,
        status: 'Open',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        _id: '3',
        title: 'Library facilities enhancement',
        description: 'Need more study tables and better lighting',
        category: 'Infrastructure',
        studentName: 'Jane Smith',
        isAnonymous: false,
        status: 'Resolved',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];

    mockComplaints.forEach((c) => this.complaints.set(c._id, c));
  }

  // Complaints methods
  addComplaint(complaint: Omit<MockComplaint, '_id' | 'createdAt' | 'updatedAt'>): MockComplaint {
    const id = Date.now().toString();
    const newComplaint: MockComplaint = {
      ...complaint,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.complaints.set(id, newComplaint);
    return newComplaint;
  }

  getComplaints(filters?: { status?: string; category?: string }): MockComplaint[] {
    let results = Array.from(this.complaints.values());

    if (filters?.status) {
      results = results.filter((c) => c.status === filters.status);
    }

    if (filters?.category) {
      results = results.filter((c) => c.category === filters.category);
    }

    return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getComplaintById(id: string): MockComplaint | undefined {
    return this.complaints.get(id);
  }

  updateComplaintStatus(id: string, status: string): MockComplaint | undefined {
    const complaint = this.complaints.get(id);
    if (complaint) {
      complaint.status = status as any;
      complaint.updatedAt = new Date();
    }
    return complaint;
  }

  // Admins methods
  addAdmin(admin: Omit<MockAdmin, '_id' | 'createdAt' | 'updatedAt'>): MockAdmin {
    const id = Date.now().toString();
    const newAdmin: MockAdmin = {
      ...admin,
      _id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }

  getAdminByEmail(email: string): MockAdmin | undefined {
    return Array.from(this.admins.values()).find((a) => a.email === email.toLowerCase());
  }
}

export const mockDatabase = new MockDatabase();

// Seed a default admin in the mock DB so login works when MongoDB isn't available
(() => {
  const defaultEmail = 'admin@jit.com';
  const defaultPassword = 'admin123456';
  const existing = mockDatabase.getAdminByEmail(defaultEmail);
  if (!existing) {
    const bcrypt = require('bcryptjs');
    const hashed = bcrypt.hashSync(defaultPassword, 10);
    mockDatabase.addAdmin({
      email: defaultEmail,
      passwordHash: hashed,
      name: 'JIT Admin',
    });
    console.log(`✅ Mock admin seeded: ${defaultEmail} / ${defaultPassword}`);
  }
})();
