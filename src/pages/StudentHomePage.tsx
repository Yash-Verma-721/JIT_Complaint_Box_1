import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentComplaints, useStudentAuth } from '../hooks/useAPI';

export default function StudentHomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useStudentAuth();
  const { data: complaintData, execute, loading } = useStudentComplaints();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/student/login');
      return;
    }
    execute();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/student/report-complaint')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              + New Complaint
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {!loading && complaintData && complaintData.complaints && complaintData.complaints.length > 0 ? (
          <div className="grid gap-4">
            {complaintData.complaints.map((complaint: any) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    complaint.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                    complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{complaint.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{complaint.category}</span>
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No complaints yet. Start by filing one!</p>
            <button
              onClick={() => navigate('/student/report-complaint')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              File a Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
