import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './src/App';
import './src/index.css';

// Pages
import StudentComplaintPage from './src/pages/StudentComplaintPage';
import ThankYouPage from './src/pages/ThankYouPage';
import AdminLoginPage from './src/pages/AdminLoginPage';
import AdminDashboard from './src/pages/AdminDashboard';

// Components
import RequireAdmin from './src/components/RequireAdmin';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* Student routes */}
      <Route path="/" element={<StudentComplaintPage />} />
      <Route path="/thanks" element={<ThankYouPage />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
