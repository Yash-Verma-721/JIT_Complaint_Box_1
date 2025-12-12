import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentSignupPage from './pages/StudentSignupPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import ReportComplaintPage from './pages/ReportComplaintPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ThankYouPage from './pages/ThankYouPage';

// Components
import RequireAdmin from './components/RequireAdmin';
import { RequireStudent } from './components/RequireStudent';
import StudentHomePage from './pages/StudentHomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<StudentLoginPage />} />
        <Route path="signup" element={<StudentSignupPage />} />
        <Route path="student/home" element={<RequireStudent><StudentHomePage /></RequireStudent>} />
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="report" element={<ReportComplaintPage />} />
        <Route path="thanks" element={<ThankYouPage />} />

        {/* Admin routes */}
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route
          path="admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}









// const App = () => {
//   return <div></div>;
// };

// export default App;
