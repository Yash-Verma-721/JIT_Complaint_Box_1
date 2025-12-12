/**
 * Custom React Hooks for API calls
 * Provides type-safe, easy-to-use hooks for all API operations
 */

import { useState, useCallback } from 'react';
import apiService, {
  Complaint,
  ComplaintSubmitPayload,
  ComplaintFilters,
  AdminLoginPayload,
  AdminLoginResponse,
  ApiErrorResponse,
} from '../services/apiService';
import * as studentApi from '../api/studentApi';

// ============ TYPES ============

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncActions<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
  setData: (data: T) => void;
}

// ============ GENERIC ASYNC HOOK ============

/**
 * Generic hook for async operations with loading and error states
 */
function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>): UseAsyncState<T> & UseAsyncActions<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await asyncFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: err });
        throw err;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setData = useCallback((data: T) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

// ============ COMPLAINT HOOKS ============

/**
 * Hook for submitting a new complaint
 */
export function useSubmitComplaint() {
  return useAsync((payload: ComplaintSubmitPayload) => apiService.submitComplaint(payload));
}

/**
 * Hook for fetching admin complaints with filters
 */
export function useGetAdminComplaints() {
  return useAsync((filters?: ComplaintFilters) => apiService.getAdminComplaints(filters));
}

/**
 * Hook for updating complaint status
 */
export function useUpdateComplaintStatus() {
  return useAsync((complaintId: string, status: string) =>
    apiService.updateComplaintStatus(complaintId, status)
  );
}

// ============ AUTHENTICATION HOOKS ============

/**
 * Hook for admin login
 */
export function useAdminLogin() {
  return useAsync((credentials: AdminLoginPayload) => apiService.adminLogin(credentials));
}

/**
 * Hook for checking authentication status
 */
export function useIsAuthenticated(): boolean {
  return apiService.isAuthenticated();
}

/**
 * Hook for logout
 */
export function useLogout() {
  return useCallback(() => {
    apiService.logout();
  }, []);
}

/**
 * Hook for getting stored token
 */
export function useAuthToken(): string | null {
  return apiService.getToken();
}

// ============ COMBINED HOOKS ============

/**
 * Hook combining all complaint operations
 */
export function useComplaintOperations() {
  const submit = useSubmitComplaint();
  const getComplaints = useGetAdminComplaints();
  const updateStatus = useUpdateComplaintStatus();

  return {
    submit,
    getComplaints,
    updateStatus,
  };
}

/**
 * Hook combining all authentication operations
 */
export function useAuthOperations() {
  const login = useAdminLogin();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const token = useAuthToken();

  return {
    login,
    logout,
    isAuthenticated,
    token,
  };
}

// ============ STUDENT HOOKS ============

/**
 * Hook for student signup
 */
export function useStudentSignup() {
  return useAsync((data: studentApi.StudentSignupData) => studentApi.studentSignup(data));
}

/**
 * Hook for student login
 */
export function useStudentLogin() {
  return useAsync((credentials: studentApi.StudentCredentials) => studentApi.studentLogin(credentials));
}

/**
 * Hook for getting student's own complaints
 */
export function useStudentComplaints() {
  return useAsync(() => studentApi.getMyComplaints());
}

/**
 * Hook for student authentication
 */
export function useStudentAuth() {
  const logout = useCallback(() => {
    studentApi.studentLogout();
  }, []);

  return {
    isAuthenticated: studentApi.isStudentAuthenticated,
    token: studentApi.getStudentToken,
    logout,
  };
}

// ============ CONVENIENCE HOOKS ============

/**
 * Hook that returns the apiService directly for flexibility
 */
export function useAPI() {
  return apiService;
}

export default {
  useSubmitComplaint,
  useGetAdminComplaints,
  useUpdateComplaintStatus,
  useAdminLogin,
  useIsAuthenticated,
  useLogout,
  useAuthToken,
  useComplaintOperations,
  useAuthOperations,
  useStudentSignup,
  useStudentLogin,
  useStudentComplaints,
  useStudentAuth,
  useAPI,
};
