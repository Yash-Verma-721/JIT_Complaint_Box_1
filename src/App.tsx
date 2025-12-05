// client/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
// import your existing pages:
import ReportComplaintPage from "./pages/ReportComplaintPage";
// import HomePage, Student pages etc if you have them
import AdminDashboard from './src/pages/AdminDashboard';

// ...
<Route
  path="/admin/dashboard"
  element={
    <RequireAdmin>
      <AdminDashboardPage />
    </RequireAdmin>
  }
/>


const App: React.FC = () => {
  const RequireAdmin: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    const token = localStorage.getItem("jit_admin_token");
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      {/* Simple navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="font-bold text-lg">
            JIT Complaint Box
          </a>
          <div className="flex gap-4 text-sm">
            <a href="/report" className="hover:underline">
              Report
            </a>
            <a href="/admin/login" className="hover:underline">
              Admin
            </a>
          </div>
        </div>
      </div>

      <Routes>
        {/* Replace this with your real HomePage if you have one */}
        <Route path="/" element={<ReportComplaintPage />} />

        {/* Student etc routes here if required */}

        <Route path="/report" element={<ReportComplaintPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;









// const App = () => {
//   return <div></div>;
// };

// export default App;
