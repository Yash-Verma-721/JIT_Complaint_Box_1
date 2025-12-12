import { Outlet, Link, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 shadow-md transition-all ${
        isAdminPage 
          ? 'bg-gradient-to-r from-slate-800 to-slate-900' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white font-bold text-2xl hover:opacity-90 transition">
              📋 JIT Complaint Box
            </Link>
            
            <nav className="hidden sm:flex gap-6">
              <Link 
                to="/" 
                className="text-white hover:text-gray-100 transition font-medium"
              >
                Home
              </Link>
              <Link 
                to="/report" 
                className="text-white hover:text-gray-100 transition font-medium"
              >
                Report
              </Link>
              <Link 
                to="/login" 
                className="text-white hover:text-gray-100 transition font-medium"
              >
                Student Login
              </Link>
              <Link 
                to="/signup" 
                className="text-white hover:text-gray-100 transition font-medium"
              >
                Student Signup
              </Link>
              <Link 
                to="/dashboard" 
                className="text-white hover:text-gray-100 transition font-medium"
              >
                My Complaints
              </Link>
              <Link 
                to="/admin/login" 
                className={`font-medium transition ${
                  isAdminPage 
                    ? 'text-yellow-300 hover:text-yellow-100' 
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                Admin
              </Link>
            </nav>

            {/* Mobile menu indicator */}
            <div className="sm:hidden text-white">≡</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={`${
        isAdminPage 
          ? 'bg-slate-900 text-slate-200' 
          : 'bg-indigo-900 text-indigo-100'
      } py-8 mt-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-3">About JIT Complaint Box</h3>
              <p className="text-sm opacity-90">
                A secure, confidential platform for students to report and track complaints about campus facilities and services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition">Home</Link>
                </li>
                <li>
                  <Link to="/report" className="hover:text-white transition">Report a Complaint</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white transition">View Status</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-3">Contact</h3>
              <p className="text-sm opacity-90">
                📧 complaints@jit.edu<br/>
                📞 1800-JIT-CARE<br/>
                ⏰ 24/7 Available
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t opacity-30 pt-6">
            <p className="text-center text-sm">
              © 2025 JIT Complaint Box. All rights reserved. | Committed to campus improvement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
