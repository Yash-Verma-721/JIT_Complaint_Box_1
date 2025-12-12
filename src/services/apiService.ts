/**
 * API Service Layer with Type Safety
 * Centralized API calls with error handling and retry logic
 */

import apiClient from '../api/axiosInstance';

// ============ TYPES & INTERFACES ============

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentId?: string;
  studentName?: string;
  photoUrl?: string;
  isAnonymous: boolean;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintSubmitPayload {
  title: string;
  description: string;
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  studentId?: string;
  isAnonymous?: boolean;
  photo?: File | null;
}

export interface ComplaintFilters {
  status?: 'Open' | 'In Progress' | 'Resolved' | 'All';
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other' | 'All';
}

export interface ComplaintStatusUpdate {
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
  admin?: {
    _id: string;
    email: string;
    name: string;
  };
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  error?: string;
  details?: any;
}

// ============ API SERVICE CLASS ============

class APIService {
  /**
   * Submit a new complaint
   */
  async submitComplaint(payload: ComplaintSubmitPayload): Promise<Complaint> {
    try {
      if (payload.photo) {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('description', payload.description);
        formData.append('category', payload.category || 'Other');
        if (payload.studentName) formData.append('studentName', payload.studentName);
        if (payload.studentId) formData.append('studentId', payload.studentId);
        formData.append('isAnonymous', String(!!payload.isAnonymous));
        formData.append('photo', payload.photo);

        const response = await apiClient.post<{ complaint: Complaint }>('/complaints', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.complaint;
      }

      const response = await apiClient.post<{ complaint: Complaint }>('/complaints', payload);
      return response.data.complaint;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit complaint';
      console.error('❌ submitComplaint error:', message);
      throw new Error(message);
    }
  }

  /**
   * Get all complaints for admin (protected)
   */
  async getAdminComplaints(filters?: ComplaintFilters): Promise<Complaint[]> {
    try {
      const params: any = {};
      if (filters?.status && filters.status !== 'All') params.status = filters.status;
      if (filters?.category && filters.category !== 'All') params.category = filters.category;

      const response = await apiClient.get<{ complaints: Complaint[] }>('/admin/complaints', {
        params,
      });
      return response.data.complaints || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch complaints';
      console.error('❌ getAdminComplaints error:', message);
      throw new Error(message);
    }
  }

  /**
   * Update complaint status (protected)
   */
  async updateComplaintStatus(complaintId: string, status: string): Promise<Complaint> {
    try {
      const response = await apiClient.patch<{ complaint: Complaint }>(
        `/admin/complaints/${complaintId}/status`,
        { status }
      );
      return response.data.complaint;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update complaint status';
      console.error('❌ updateComplaintStatus error:', message);
      throw new Error(message);
    }
  }

  /**
   * Admin login
   */
  async adminLogin(credentials: AdminLoginPayload): Promise<AdminLoginResponse> {
    try {
      const response = await apiClient.post<AdminLoginResponse>('/auth/admin/login', credentials);
      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem('jit_admin_token', data.token);
        console.log('✅ Admin logged in successfully');
      }

      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      console.error('❌ adminLogin error:', message);
      throw new Error(message);
    }
  }

  /**
   * Admin logout
   */
  logout(): void {
    try {
      localStorage.removeItem('jit_admin_token');
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  }

  /**
   * Check authentication status
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jit_admin_token');
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('jit_admin_token');
  }
}

// Export singleton instance
export const apiService = new APIService();

// Export default
export default apiService;
