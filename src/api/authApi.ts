import apiClient from './axiosInstance';

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminData {
  id: string;
  email: string;
  name: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
  admin?: AdminData;
}

export const adminLogin = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  try {
    const response = await apiClient.post<AdminLoginResponse>('/auth/admin/login', credentials);
    const data = response.data;

    if (data.success && data.token) {
      localStorage.setItem('jit_admin_token', data.token);
      console.log('✅ Admin logged in successfully');
    }

    return data;
  } catch (error: any) {
    console.error('❌ Error during admin login:', error);
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

export const logoutAdmin = (): void => {
  try {
    localStorage.removeItem('jit_admin_token');
    console.log('✅ Admin logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
    throw new Error('Logout failed');
  }
};

export const getAdminToken = (): string | null => {
  return localStorage.getItem('jit_admin_token');
};

export const isAdminAuthenticated = (): boolean => {
  return !!localStorage.getItem('jit_admin_token');
};

export default {
  adminLogin,
  logoutAdmin,
  getAdminToken,
  isAdminAuthenticated,
};
