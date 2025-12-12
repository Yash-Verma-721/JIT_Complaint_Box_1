import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentSignup } from '../api/studentApi';

type FormState = {
  email: string;
  password: string;
  name: string;
  studentId: string;
};

export default function StudentSignupPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({ email: '', password: '', name: '', studentId: '' });
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

    if (!form.name) err.name = 'Name is required.';
    if (!form.studentId) err.studentId = 'Student ID is required.';

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
      const response = await studentSignup({
        email: form.email.trim(),
        password: form.password,
        name: form.name.trim(),
        studentId: form.studentId.trim(),
      });

      if (response.success) {
        // Redirect to success page after signup
        navigate('/student/signup-success');
      } else {
        setApiError(response.message || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setApiError(error?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Student Signup</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Create your account to submit complaints</p>

        {apiError && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            ✕ {apiError}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Your full name"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
            <input
              type="text"
              value={form.studentId}
              onChange={(e) => setForm((s) => ({ ...s, studentId: e.target.value }))}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.studentId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., JIT2024001"
              aria-invalid={!!errors.studentId}
            />
            {errors.studentId && <p className="mt-1 text-xs text-red-600">{errors.studentId}</p>}
          </div>

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
              placeholder="At least 6 characters"
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 transition"
            disabled={loading}
          >
            {loading ? '🔄 Creating account...' : '✓ Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
