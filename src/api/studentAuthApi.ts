import apiClient from './axiosInstance';

export interface StudentLoginCredentials {
  email: string;
  password: string;
}

export interface StudentSignupData {
  email: string;
  password: string;
  name: string;
  studentId: string;
}

export interface StudentData {
  id: string;
  email: string;
  name: string;
  studentId: string;
}

export interface StudentAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  student?: StudentData;
}

/**
 * Student signup
 */
export const studentSignup = async (data: StudentSignupData): Promise<StudentAuthResponse> => {
  try {
    const response = await apiClient.post<StudentAuthResponse>('/auth/student/signup', data);
    const result = response.data;

    if (result.success && result.token) {
      localStorage.setItem('jit_student_token', result.token);
      localStorage.setItem('jit_student_email', result.student?.email || '');
      localStorage.setItem('jit_student_id', result.student?.studentId || '');
      localStorage.setItem('jit_student_name', result.student?.name || '');
      console.log('✅ Student signed up successfully');
    }

    return result;
  } catch (error: any) {
    console.error('❌ Error during signup:', error);
    throw error.response?.data || { success: false, message: 'Signup failed' };
  }
};

/**
 * Student login
 */
export const studentLogin = async (credentials: StudentLoginCredentials): Promise<StudentAuthResponse> => {
  try {
    const response = await apiClient.post<StudentAuthResponse>('/auth/student/login', credentials);
    const result = response.data;

    if (result.success && result.token) {
      localStorage.setItem('jit_student_token', result.token);
      localStorage.setItem('jit_student_email', result.student?.email || '');
      localStorage.setItem('jit_student_id', result.student?.studentId || '');
      localStorage.setItem('jit_student_name', result.student?.name || '');
      console.log('✅ Student logged in successfully');
    }

    return result;
  } catch (error: any) {
    console.error('❌ Error during login:', error);
    throw error.response?.data || { success: false, message: 'Login failed' };
  }
};

/**
 * Student logout
 */
export const studentLogout = (): void => {
  try {
    localStorage.removeItem('jit_student_token');
    localStorage.removeItem('jit_student_email');
    localStorage.removeItem('jit_student_id');
    localStorage.removeItem('jit_student_name');
    console.log('✅ Student logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
    throw new Error('Logout failed');
  }
};

/**
 * Check if student is authenticated
 */
export const isStudentAuthenticated = (): boolean => {
  return !!localStorage.getItem('jit_student_token');
};

/**
 * Get student token
 */
export const getStudentToken = (): string | null => {
  return localStorage.getItem('jit_student_token');
};

/**
 * Get student info
 */
export const getStudentInfo = () => {
  return {
    email: localStorage.getItem('jit_student_email'),
    studentId: localStorage.getItem('jit_student_id'),
    name: localStorage.getItem('jit_student_name'),
  };
};

export default {
  studentSignup,
  studentLogin,
  studentLogout,
  isStudentAuthenticated,
  getStudentToken,
  getStudentInfo,
};
