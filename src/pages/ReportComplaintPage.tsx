import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitComplaint } from '../api/complaintApi';
import { getStudentInfo } from '../api/studentAuthApi';

type Form = {
  title: string;
  description: string;
  category: string;
  studentName: string;
  anonymous: boolean;
};

export default function ReportComplaintPage(): JSX.Element {
  const [form, setForm] = useState<Form>({
    title: '',
    description: '',
    category: 'Hostel',
    studentName: '',
    anonymous: false,
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  function validate() {
    if (!form.title.trim()) return 'Title is required.';
    if (!form.description.trim()) return 'Description is required.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    const v = validate();
    if (v) {
      setAlert({ type: 'error', message: v });
      return;
    }

    setLoading(true);
    try {
      // Get student info from localStorage if logged in
      const studentInfo = getStudentInfo();

      await submitComplaint({
        title: form.title,
        description: form.description,
        category: form.category as any,
        studentName: form.anonymous ? undefined : form.studentName,
        isAnonymous: form.anonymous,
        photo,
        studentId: studentInfo.studentId || undefined,
      });

      setAlert({ type: 'success', message: 'Complaint submitted successfully!' });
      setTimeout(() => navigate('/thanks'), 1500);
      setForm({ title: '', description: '', category: 'Hostel', studentName: '', anonymous: false });
      setPhoto(null);
    } catch (err: any) {
      setAlert({ type: 'error', message: err?.response?.data?.message || 'Failed to submit complaint.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Submit a Complaint</h1>
            <p className="text-gray-600 mt-2">Help us improve by sharing your concerns. All submissions are kept confidential.</p>
          </div>

          {alert && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                alert.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
              role="alert"
            >
              {alert.type === 'success' ? '✓ ' : '✕ '} {alert.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Brief title of the issue"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-vertical"
                placeholder="Provide detailed information about the issue, what happened, when, and any other relevant context..."
              />
            </div>

            {/* Category & Anonymous */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                >
                  <option>Hostel</option>
                  <option>Academics</option>
                  <option>Infrastructure</option>
                  <option>Administration</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col justify-between">
                <label className="inline-flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                  <input
                    type="checkbox"
                    checked={form.anonymous}
                    onChange={(e) => setForm((s) => ({ ...s, anonymous: e.target.checked }))}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="font-medium text-gray-700">Submit anonymously</span>
                </label>
              </div>
            </div>

            {/* Student Name */}
            {!form.anonymous && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name (Optional)</label>
                <input
                  value={form.studentName}
                  onChange={(e) => setForm((s) => ({ ...s, studentName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Your name (optional)"
                />
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>📌 Privacy Notice:</strong> All reports are reviewed by authorized personnel and treated with utmost confidentiality.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              {/* Photo upload */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className="text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl font-bold disabled:opacity-50 transition transform hover:scale-105"
              >
                {loading ? '⏳ Submitting...' : '✓ Submit Complaint'}
              </button>

              <button
                type="button"
                onClick={() => setForm({ title: '', description: '', category: 'Hostel', studentName: '', anonymous: false })}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
