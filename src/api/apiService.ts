/**
 * Centralized API Service
 * Single source of truth for all API operations
 * Base URL: http://localhost:5000/api
 */

import {
  AdminLoginCredentials,
  AdminLoginResponse,
  adminLogin,
  logoutAdmin,
  getAdminToken,
  isAdminAuthenticated,
  getAdminData,
} from './authApi';

import {
  ComplaintPayload,
  ComplaintFilterParams,
  ApiResponse,
  Complaint,
  submitComplaint,
  getAdminComplaints,
  updateComplaintStatus,
} from './complaintApi';

export class APIService {
  private static instance: APIService;

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  // ============ AUTHENTICATION OPERATIONS ============

  /**
   * Admin login
   * POST /api/auth/admin/login
   * @param credentials - Email and password
   * @returns Login response with token and admin data
   */
  async adminLogin(credentials: AdminLoginCredentials): Promise<AdminLoginResponse> {
    return adminLogin(credentials);
  }

  /**
   * Admin logout
   * Clears token from localStorage
   */
  logout(): void {
    logoutAdmin();
  }

  /**
   * Check if admin is authenticated
   * @returns True if token exists
   */
  isAuthenticated(): boolean {
    return isAdminAuthenticated();
  }

  /**
   * Get stored admin token
   * @returns Token string or null
   */
  getToken(): string | null {
    return getAdminToken();
  }

  /**
   * Get stored admin data
   * @returns Admin name and email or null
   */
  getAdminData(): { name: string; email: string } | null {
    return getAdminData();
  }

  // ============ COMPLAINT OPERATIONS ============

  /**
   * Submit a new complaint
   * POST /api/complaints
   * @param payload - Complaint data and optional photo
   * @returns API response with created complaint
   */
  async submitComplaint(
    payload: ComplaintPayload & { photo?: File | null }
  ): Promise<ApiResponse<Complaint>> {
    return submitComplaint(payload);
  }

  /**
   * Get all complaints (admin only)
   * GET /api/admin/complaints
   * @param filters - Optional status and category filters
   * @returns API response with array of complaints
   */
  async getAdminComplaints(filters?: ComplaintFilterParams): Promise<ApiResponse<Complaint[]>> {
    return getAdminComplaints(filters);
  }

  /**
   * Update complaint status
   * PATCH /api/admin/complaints/:id/status
   * @param id - Complaint ID
   * @param status - New status (Open, In Progress, Resolved)
   * @returns API response with updated complaint
   */
  async updateComplaintStatus(
    id: string,
    status: 'Open' | 'In Progress' | 'Resolved'
  ): Promise<ApiResponse<Complaint>> {
    return updateComplaintStatus(id, status);
  }
}

// Export singleton instance
export const apiService = APIService.getInstance();

export default apiService;
