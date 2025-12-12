import apiClient from './axiosInstance';

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  studentId?: string;
  photoUrl?: string;
  isAnonymous: boolean;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintPayload {
  title: string;
  description: string;
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  studentId?: string;
  isAnonymous?: boolean;
}

export interface ComplaintFilterParams {
  status?: 'Open' | 'In Progress' | 'Resolved';
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  complaint?: Complaint;
  complaints?: Complaint[];
  count?: number;
  token?: string;
  admin?: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Submit a new complaint (public endpoint)
 * POST /api/complaints
 */
export const submitComplaint = async (
  payload: ComplaintPayload & { photo?: File | null }
): Promise<ApiResponse<Complaint>> => {
  try {
    // If a photo File is present, send as multipart/form-data
    if (payload.photo) {
      const form = new FormData();
      form.append('title', payload.title);
      form.append('description', payload.description);
      form.append('category', payload.category || 'Other');
      if (payload.studentName) form.append('studentName', payload.studentName);
      if (payload.studentId) form.append('studentId', payload.studentId);
      form.append('isAnonymous', String(!!payload.isAnonymous));
      form.append('photo', payload.photo as Blob);

      const response = await apiClient.post('/complaints', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }

    const response = await apiClient.post<ApiResponse<Complaint>>('/complaints', payload);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error submitting complaint:', error);
    throw error.response?.data || { success: false, message: 'Failed to submit complaint' };
  }
};

/**
 * Get all complaints for admin (protected endpoint)
 * GET /api/admin/complaints
 * Query params: status, category
 */
export const getAdminComplaints = async (
  params?: ComplaintFilterParams
): Promise<ApiResponse<Complaint[]>> => {
  try {
    const token = localStorage.getItem('jit_admin_token');
    const response = await apiClient.get<ApiResponse<Complaint[]>>('/admin/complaints', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error fetching complaints:', error);
    throw error.response?.data || { success: false, message: 'Failed to fetch complaints' };
  }
};

/**
 * Update complaint status (protected endpoint)
 * PATCH /api/admin/complaints/:id/status
 */
export const updateComplaintStatus = async (
  id: string,
  status: string
): Promise<ApiResponse<Complaint>> => {
  try {
    const token = localStorage.getItem('jit_admin_token');
    const response = await apiClient.patch<ApiResponse<Complaint>>(`/admin/complaints/${id}/status`, 
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('❌ Error updating complaint status:', error);
    throw error.response?.data || { success: false, message: 'Failed to update complaint status' };
  }
};

export default {
  submitComplaint,
  getAdminComplaints,
  updateComplaintStatus,
};
