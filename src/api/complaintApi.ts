import apiClient from './axiosInstance';

export interface ComplaintPayload {
  title: string;
  description: string;
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  studentName?: string;
  isAnonymous?: boolean;
}

export interface ComplaintFilterParams {
  status?: 'Open' | 'In Progress' | 'Resolved';
  category?: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  complaint?: T;
  complaints?: T[];
  count?: number;
}

export const submitComplaint = async (
  payload: ComplaintPayload
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/complaints', payload);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error submitting complaint:', error);
    throw error.response?.data || { success: false, message: 'Failed to submit complaint' };
  }
};

export const getAdminComplaints = async (
  params?: ComplaintFilterParams
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/complaints/admin', {
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error fetching complaints:', error);
    throw error.response?.data || { success: false, message: 'Failed to fetch complaints' };
  }
};

export const updateComplaintStatus = async (
  id: string,
  status: 'Open' | 'In Progress' | 'Resolved'
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.patch(`/complaints/admin/${id}/status`, {
      status,
    });
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
