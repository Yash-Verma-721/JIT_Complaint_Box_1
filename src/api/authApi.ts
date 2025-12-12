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

/**
 * Admin login endpoint
 * POST /api/auth/admin/login
 */
export const adminLogin = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  try {
    const response = await apiClient.post<AdminLoginResponse>('/auth/admin/login', credentials);
    const data = response.data;

    if (data.success && data.token) {
      localStorage.setItem('jit_admin_token', data.token);
      localStorage.setItem('jit_admin_name', data.admin?.name || 'Admin');
      localStorage.setItem('jit_admin_email', data.admin?.email || '');
      console.log('✅ Admin logged in successfully');
    }

    return data;
  } catch (error: any) {
    console.error('❌ Error during admin login:', error);
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

/**
 * Admin logout
 * Removes token from localStorage
 */
export const logoutAdmin = (): void => {
  try {
    localStorage.removeItem('jit_admin_token');
    localStorage.removeItem('jit_admin_name');
    localStorage.removeItem('jit_admin_email');
    console.log('✅ Admin logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
    throw new Error('Logout failed');
  }
};

/**
 * Get stored admin token
 */
export const getAdminToken = (): string | null => {
  return localStorage.getItem('jit_admin_token');
};

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  return !!localStorage.getItem('jit_admin_token');
};

/**
 * Get stored admin data
 */
export const getAdminData = (): { name: string; email: string } | null => {
  const name = localStorage.getItem('jit_admin_name');
  const email = localStorage.getItem('jit_admin_email');
  return name && email ? { name, email } : null;
};

export default {
  adminLogin,
  logoutAdmin,
  getAdminToken,
  isAdminAuthenticated,
  getAdminData,
};
