import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../api/authApi';

interface RequireAdminProps {
  children: any;
}

/**
 * Protected route component that checks for admin authentication
 * Redirects to /admin/login if token is not present
 */
const RequireAdmin = ({ children }: RequireAdminProps) => {
  // Check if admin is authenticated
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default RequireAdmin;
