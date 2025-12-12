import axiosInstance from './axiosInstance';

export interface StudentCredentials {
  email: string;
  password: string;
}

export interface StudentSignupData {
  email: string;
  password: string;
  name: string;
  studentId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  token?: string;
  student?: T;
  complaints?: T;
  count?: number;
}

export const studentSignup = async (data: StudentSignupData): Promise<ApiResponse> => {
  const response = await axiosInstance.post('/auth/student/signup', data);
  if (response.data.token) {
    localStorage.setItem('jit_student_token', response.data.token);
    localStorage.setItem('student_email', data.email);
  }
  return response.data;
};

export const studentLogin = async (credentials: StudentCredentials): Promise<ApiResponse> => {
  const response = await axiosInstance.post('/auth/student/login', credentials);
  if (response.data.token) {
    localStorage.setItem('jit_student_token', response.data.token);
    localStorage.setItem('student_email', credentials.email);
  }
  return response.data;
};

export const studentLogout = () => {
  localStorage.removeItem('jit_student_token');
  localStorage.removeItem('student_email');
};

export const getStudentToken = (): string | null => {
  return localStorage.getItem('jit_student_token');
};

export const isStudentAuthenticated = (): boolean => {
  return !!localStorage.getItem('jit_student_token');
};

export const getMyComplaints = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.get('/student/complaints');
  return response.data;
};
