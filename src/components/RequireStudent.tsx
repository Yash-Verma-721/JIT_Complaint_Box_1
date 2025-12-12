import { Navigate } from 'react-router-dom';

export const RequireStudent = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('jit_student_token');

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  return children;
};
