import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Complaint = {
  id: string;
  title: string;
  category: 'Hostel' | 'Academics' | 'Infrastructure' | 'Administration' | 'Other';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
};

const MOCK_COMPLAINTS: Complaint[] = [
  { id: '1', title: 'Leaky faucet in hostel room', category: 'Hostel', status: 'Open', createdAt: '2025-11-28T09:12:00Z' },
  { id: '2', title: 'Broken projector in lecture hall', category: 'Infrastructure', status: 'In Progress', createdAt: '2025-11-26T14:30:00Z' },
  { id: '3', title: 'Exam schedule conflict', category: 'Academics', status: 'Resolved', createdAt: '2025-10-02T08:20:00Z' },
  { id: '4', title: 'Fee payment portal issue', category: 'Administration', status: 'Open', createdAt: '2025-11-30T11:45:00Z' },
];

export default function StudentDashboardPage(): JSX.Element {
  const [statusFilter, setStatusFilter] = useState<'All' | Complaint['status']>('All');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return MOCK_COMPLAINTS;
    return MOCK_COMPLAINTS.filter((c) => c.status === statusFilter);
  }, [statusFilter]);

  function statusBadge(status: Complaint['status']) {
    const baseClass = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Open':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'In Progress':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'Resolved':
        return `${baseClass} bg-green-100 text-green-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Complaints</h1>
            <p className="text-gray-600 mt-2">Track the status of your submitted issues</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border-2 border-indigo-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button
              onClick={() => navigate('/report')}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl font-semibold transition transform hover:scale-105"
            >
              + New Report
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        <section className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="p-8 bg-white rounded-xl shadow border border-gray-200 text-center">
              <p className="text-gray-600 text-lg">No complaints found.</p>
              <button
                onClick={() => navigate('/report')}
                className="mt-4 text-indigo-600 hover:underline font-semibold"
              >
                Submit your first complaint
              </button>
            </div>
          ) : (
            filtered.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-6 transition">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                    <div className="flex gap-4 mt-3 text-sm text-gray-600 flex-wrap">
                      <span className="px-3 py-1 bg-indigo-50 rounded-full">{c.category}</span>
                      <span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <span className={statusBadge(c.status)}>{c.status}</span>
                    <a href="#" className="text-indigo-600 hover:underline text-sm font-semibold">
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
