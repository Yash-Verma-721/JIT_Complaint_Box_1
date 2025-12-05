import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@jit.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data: LoginResponse = await res.json();

      // Save token to localStorage
      localStorage.setItem("jit_admin_token", data.token);
      localStorage.setItem("jit_admin_name", data.admin.name);

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Authorized personnel only
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jit.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 text-white py-2 text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Default: admin@jit.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;




















// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminLogin } from '../api/authApi';
// import '../styles/AdminLoginPage.css';

// const AdminLoginPage = () => {
//   const navigate = useNavigate();

//   // Form state
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   // UI state
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   /**
//    * Handle input change
//    */
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setErrorMessage('');
//   };

//   /**
//    * Validate form
//    */
//   const validateForm = (): boolean => {
//     if (!formData.email.trim()) {
//       setErrorMessage('Please enter your email');
//       return false;
//     }

//     if (!formData.password.trim()) {
//       setErrorMessage('Please enter your password');
//       return false;
//     }

//     return true;
//   };

//   /**
//    * Handle form submission
//    */
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
//     e.preventDefault();
//     setErrorMessage('');

//     // Validate form
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await adminLogin({
//         email: formData.email.trim(),
//         password: formData.password.trim(),
//       });

//       if (response.success) {
//         // Redirect to dashboard on successful login
//         navigate('/admin/dashboard');
//       } else {
//         setErrorMessage(response.message || 'Login failed');
//       }
//     } catch (error: any) {
//       console.error('Error logging in:', error);
//       setErrorMessage(
//         error.message || 'An error occurred during login. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>Admin Login</h1>
//           <p>JIT Complaint Box Administration</p>
//         </div>

//         {/* Error Message */}
//         {errorMessage && (
//           <div className="alert alert-error">
//             <span className="alert-icon">⚠️</span>
//             <span>{errorMessage}</span>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="login-form">
//           {/* Email Field */}
//           <div className="form-group">
//             <label htmlFor="email" className="form-label">
//               Email <span className="required">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="admin@jit.com"
//               className="form-input"
//               disabled={isLoading}
//             />
//           </div>

//           {/* Password Field */}
//           <div className="form-group">
//             <label htmlFor="password" className="form-label">
//               Password <span className="required">*</span>
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Enter your password"
//               className="form-input"
//               disabled={isLoading}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="spinner"></span>
//                 Logging in...
//               </>
//             ) : (
//               'Login'
//             )}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="login-footer">
//           <p>Only authorized administrators can access this area.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;
