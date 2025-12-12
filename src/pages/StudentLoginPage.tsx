import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentLogin } from '../api/studentAuthApi';

type FormState = {
  email: string;
  password: string;
};

export default function StudentLoginPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  function validate(): boolean {
    const err: Partial<FormState> = {};
    if (!form.email) err.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email.';

    if (!form.password) err.password = 'Password is required.';
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters.';

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setApiError('');

    try {
      const response = await studentLogin({
        email: form.email.trim(),
        password: form.password.trim(),
      });

      if (response.success) {
        // Redirect to student dashboard on successful login
        navigate('/dashboard');
      } else {
        setApiError(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setApiError(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Student Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign in to view and manage your complaints</p>

        {apiError && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            ✕ {apiError}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="your.email@jit.edu"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Your password"
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition"
            disabled={loading}
          >
            {loading ? '🔄 Logging in...' : '✓ Login'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-semibold">
            Sign up
          </Link>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs">
          <strong>Demo Credentials:</strong> Create an account or contact admin for login details.
        </div>
      </div>
    </div>
  );
}
