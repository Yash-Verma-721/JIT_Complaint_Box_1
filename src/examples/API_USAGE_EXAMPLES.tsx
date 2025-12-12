/**
 * Example Usage of API Service and Custom Hooks
 * ============================================
 *
 * This file demonstrates how to use the new centralized API service layer
 * and custom React hooks in your components.
 *
 * The new architecture provides:
 * 1. Type-safe API calls with error handling
 * 2. Reusable custom hooks for common operations
 * 3. Automatic token management
 * 4. Consistent error handling across the app
 */

// ============ EXAMPLE 1: Using Hooks in React Components ============

// In a complaint form component:
import { useSubmitComplaint } from '../hooks/useAPI';

export function ComplaintForm() {
  const { execute: submitComplaint, loading, error, data } = useSubmitComplaint();

  const handleSubmit = async (formData: ComplaintSubmitPayload) => {
    try {
      const result = await submitComplaint(formData);
      console.log('✅ Complaint submitted:', result);
      // Redirect to thank you page
    } catch (err) {
      console.error('❌ Submission failed:', err.message);
      // Show error to user
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({...}); // your form data
    }}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}

// ============ EXAMPLE 2: Using Combined Hooks ============

import { useComplaintOperations } from '../hooks/useAPI';

export function AdminDashboard() {
  const { getComplaints, updateStatus } = useComplaintOperations();

  const handleFetchComplaints = async (filters?: ComplaintFilters) => {
    try {
      const complaints = await getComplaints.execute(filters);
      console.log('✅ Fetched complaints:', complaints);
    } catch (err) {
      console.error('❌ Fetch failed:', err.message);
    }
  };

  const handleStatusUpdate = async (complaintId: string, newStatus: string) => {
    try {
      const updated = await updateStatus.execute(complaintId, newStatus);
      console.log('✅ Status updated:', updated);
      // Refresh list
      handleFetchComplaints();
    } catch (err) {
      console.error('❌ Update failed:', err.message);
    }
  };

  return (
    <div>
      {/* Dashboard UI */}
    </div>
  );
}

// ============ EXAMPLE 3: Using Auth Hooks ============

import { useAuthOperations } from '../hooks/useAPI';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuthOperations();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login.execute({ email, password });
      if (response.success) {
        console.log('✅ Logged in as:', response.admin?.email);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('❌ Login failed:', err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>You are logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}

// ============ EXAMPLE 4: Direct API Service Usage ============

import apiService from '../services/apiService';

export async function directAPIUsage() {
  // Use the service directly without hooks (useful for non-React code or complex flows)
  
  try {
    // Submit complaint
    const complaint = await apiService.submitComplaint({
      title: 'Issue with WiFi',
      description: 'Internet not working in Room 201',
      category: 'Infrastructure',
      isAnonymous: false,
      studentName: 'John Doe',
    });
    console.log('✅ Created complaint:', complaint);

    // Login
    const loginResponse = await apiService.adminLogin({
      email: 'admin@jit.com',
      password: 'password123',
    });

    if (loginResponse.success) {
      // Get complaints
      const complaints = await apiService.getAdminComplaints({
        status: 'Open',
        category: 'Infrastructure',
      });
      console.log('✅ Open infrastructure complaints:', complaints);

      // Update status
      const updated = await apiService.updateComplaintStatus(
        complaints[0]._id,
        'In Progress'
      );
      console.log('✅ Updated complaint:', updated);
    }

    // Check auth
    const isAuth = apiService.isAuthenticated();
    const token = apiService.getToken();
    console.log('Is authenticated:', isAuth);
    console.log('Token:', token);

    // Logout
    apiService.logout();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ============ EXAMPLE 5: Error Handling Patterns ============

export function ErrorHandlingExamples() {
  const { execute: submitComplaint, error, reset } = useSubmitComplaint();

  const handleSubmitWithErrorHandling = async (formData: ComplaintSubmitPayload) => {
    reset(); // Clear previous errors

    try {
      const result = await submitComplaint(formData);
      console.log('✅ Success:', result);
    } catch (err: any) {
      // The hook automatically captures the error
      const errorMessage = err.message || 'An unknown error occurred';
      
      if (error?.message.includes('401')) {
        console.error('🔐 Authentication failed');
        // Redirect to login
      } else if (error?.message.includes('400')) {
        console.error('📝 Validation error');
        // Show form validation messages
      } else {
        console.error('❌ Server error:', errorMessage);
        // Show generic error message
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="error-banner">
          <p>{error.message}</p>
          <button onClick={reset}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

// ============ SUMMARY OF BENEFITS ============

/**
 * Benefits of the New Architecture:
 *
 * 1. TYPE SAFETY
 *    - All API calls are strongly typed with TypeScript
 *    - Catch errors at compile time, not runtime
 *    - IDE autocomplete for all API parameters and responses
 *
 * 2. CODE REUSABILITY
 *    - Custom hooks encapsulate common async patterns
 *    - Single source of truth for API logic
 *    - Easy to share across multiple components
 *
 * 3. CONSISTENT ERROR HANDLING
 *    - Errors are caught and formatted consistently
 *    - Automatic handling of 401 auth errors
 *    - Clear error messages for debugging
 *
 * 4. AUTOMATIC STATE MANAGEMENT
 *    - Loading states handled automatically
 *    - No need for useState for data/loading/error
 *    - Cleaner component code
 *
 * 5. TOKEN MANAGEMENT
 *    - Axios interceptor automatically attaches token to requests
 *    - Token automatically cleared on 401 response
 *    - No manual token handling in components
 *
 * 6. FLEXIBILITY
 *    - Use hooks for most components
 *    - Direct service usage when needed (non-React code)
 *    - Mix and match as needed for your use case
 */
