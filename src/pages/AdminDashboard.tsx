import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminComplaints, updateComplaintStatus } from "../api/complaintApi";

type ComplaintStatus = "Open" | "In Progress" | "Resolved";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  studentId?: string;
  studentName?: string;
  photoUrl?: string;
  isAnonymous: boolean;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | ComplaintStatus>("All");
  const [categoryFilter, setCategoryFilter] =
    useState<"All" | "Hostel" | "Academics" | "Infrastructure" | "Administration" | "Other">("All");
  const [error, setError] = useState<string | null>(null);

  const adminName = localStorage.getItem("jit_admin_name") || "Admin";
  const token = localStorage.getItem("jit_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {};
      if (statusFilter !== "All") params.status = statusFilter;
      if (categoryFilter !== "All") params.category = categoryFilter;

      const response = await getAdminComplaints(params);
      
      if (response.success && response.complaints) {
        setComplaints(response.complaints);
      } else {
        setError("Failed to fetch complaints");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: ComplaintStatus) => {
    try {
      const response = await updateComplaintStatus(id, status);

      if (response.success && response.complaint) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === response.complaint!._id ? response.complaint! : c))
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err: any) {
      alert(err.message || "Unable to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jit_admin_token");
    localStorage.removeItem("jit_admin_name");
    navigate("/admin/login");
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  if (!token) {
    return null; // redirect handled in useEffect
  }

  return (
    <div className="min-h-[80vh] bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome, <span className="font-semibold">{adminName}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-auto rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-200"
          >
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Status
              </label>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "All" | ComplaintStatus)
                }
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Category
              </label>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value as
                      | "All"
                      | "Hostel"
                      | "Academics"
                      | "Infrastructure"
                      | "Administration"
                      | "Other"
                  )
                }
              >
                <option value="All">All</option>
                <option value="Hostel">Hostel</option>
                <option value="Academics">Academics</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Administration">Administration</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Total complaints:{" "}
            <span className="font-semibold">{complaints.length}</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading complaints...
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow">
              No complaints found for selected filters.
            </div>
          ) : (
            complaints.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h2 className="font-semibold text-lg">{c.title}</h2>
                    <p className="text-xs text-gray-500">
                      {c.isAnonymous
                        ? "📝 Anonymous"
                        : `👤 ${c.studentName || "Unknown"} (ID: ${c.studentId || "N/A"})`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {c.category}
                    </span>
                    <span
                      className={
                        "px-2 py-1 rounded-full text-white " +
                        (c.status === "Open"
                          ? "bg-yellow-500"
                          : c.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-600")
                      }
                    >
                      {c.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700">{c.description}</p>

                {/* Photo preview if available */}
                {c.photoUrl && (
                  <div className="mt-2">
                    <img 
                      src={`http://localhost:5000${c.photoUrl}`} 
                      alt="Complaint" 
                      className="max-h-48 rounded-lg object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-xs text-gray-500 mt-2">
                  <div>
                    <span className="font-semibold">Created:</span>{" "}
                    {formatDate(c.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Change Status:</span>
                    <select
                      className="rounded-lg border border-gray-300 px-2 py-1 text-xs"
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(
                          c._id,
                          e.target.value as ComplaintStatus
                        )
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;





















// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAdminComplaints, updateComplaintStatus, ComplaintFilterParams } from '../api/complaintApi';
// import { logoutAdmin } from '../api/authApi';
// import '../styles/AdminDashboard.css';

// interface Complaint {
//   _id: string;
//   title: string;
//   description: string;
//   category: string;
//   status: string;
//   studentName?: string;
//   isAnonymous: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   // State
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   // Filter state
//   const [filters, setFilters] = useState<ComplaintFilterParams>({
//     status: '',
//     category: '',
//   });

//   /**
//    * Fetch complaints on mount and when filters change
//    */
//   useEffect(() => {
//     fetchComplaints();
//   }, [filters]);

//   /**
//    * Fetch complaints from API
//    */
//   const fetchComplaints = async () => {
//     try {
//       setIsLoading(true);
//       setErrorMessage('');

//       const params: ComplaintFilterParams = {};
//       if (filters.status) params.status = filters.status as any;
//       if (filters.category) params.category = filters.category as any;

//       const response = await getAdminComplaints(params);

//       if (response.success && response.complaints) {
//         setComplaints(response.complaints);
//       } else {
//         setErrorMessage(response.message || 'Failed to fetch complaints');
//       }
//     } catch (error: any) {
//       console.error('Error fetching complaints:', error);
//       setErrorMessage(error.message || 'An error occurred while fetching complaints');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Handle filter change
//    */
//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement> | any) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   /**
//    * Handle status update
//    */
//   const handleStatusUpdate = async (complaintId: string, newStatus: string) => {
//     try {
//       setUpdatingId(complaintId);
//       setErrorMessage('');
//       setSuccessMessage('');

//       const response = await updateComplaintStatus(complaintId, newStatus as any);

//       if (response.success) {
//         // Update local state
//         setComplaints(
//           complaints.map((complaint) =>
//             complaint._id === complaintId
//               ? { ...complaint, status: newStatus }
//               : complaint
//           )
//         );
//         setSuccessMessage('Status updated successfully');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         setErrorMessage(response.message || 'Failed to update status');
//       }
//     } catch (error: any) {
//       console.error('Error updating status:', error);
//       setErrorMessage(error.message || 'Failed to update status');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   /**
//    * Handle logout
//    */
//   const handleLogout = () => {
//     logoutAdmin();
//     navigate('/admin/login');
//   };

//   /**
//    * Format date
//    */
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   /**
//    * Get status badge color
//    */
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Open':
//         return 'badge-open';
//       case 'In Progress':
//         return 'badge-in-progress';
//       case 'Resolved':
//         return 'badge-resolved';
//       default:
//         return 'badge-default';
//     }
//   };

//   /**
//    * Get category color
//    */
//   const getCategoryColor = (category: string) => {
//     const colors: { [key: string]: string } = {
//       Hostel: 'category-hostel',
//       Academics: 'category-academics',
//       Infrastructure: 'category-infrastructure',
//       Administration: 'category-administration',
//       Other: 'category-other',
//     };
//     return colors[category] || 'category-default';
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="header-content">
//           <h1>Admin Dashboard</h1>
//           <p>Manage student complaints</p>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Alerts */}
//       {errorMessage && (
//         <div className="alert alert-error">
//           <span className="alert-icon">⚠️</span>
//           <span>{errorMessage}</span>
//         </div>
//       )}

//       {successMessage && (
//         <div className="alert alert-success">
//           <span className="alert-icon">✅</span>
//           <span>{successMessage}</span>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="filters-section">
//         <div className="filters-container">
//           <div className="filter-group">
//             <label htmlFor="status-filter">Status</label>
//             <select
//               id="status-filter"
//               name="status"
//               value={filters.status || ''}
//               onChange={handleFilterChange}
//               className="filter-select"
//             >
//               <option value="">All Statuses</option>
//               <option value="Open">Open</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Resolved">Resolved</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label htmlFor="category-filter">Category</label>
//             <select
//               id="category-filter"
//               name="category"
//               value={filters.category || ''}
//               onChange={handleFilterChange}
//               className="filter-select"
//             >
//               <option value="">All Categories</option>
//               <option value="Hostel">Hostel</option>
//               <option value="Academics">Academics</option>
//               <option value="Infrastructure">Infrastructure</option>
//               <option value="Administration">Administration</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <button
//             className="reset-btn"
//             onClick={() => setFilters({ status: '', category: '' })}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading ? (
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <p>Loading complaints...</p>
//         </div>
//       ) : (
//         <>
//           {/* Complaints Count */}
//           <div className="complaints-count">
//             <p>Total Complaints: <strong>{complaints.length}</strong></p>
//           </div>

//           {/* Complaints List */}
//           {complaints.length > 0 ? (
//             <div className="complaints-container">
//               {complaints.map((complaint) => (
//                 <div key={complaint._id} className="complaint-item">
//                   <div className="complaint-header-row">
//                     <div className="complaint-title-section">
//                       <h3 className="complaint-title">{complaint.title}</h3>
//                       <p className="complaint-submitter">
//                         By: {complaint.isAnonymous ? 'Anonymous' : complaint.studentName || 'Unknown'}
//                       </p>
//                     </div>
//                     <div className="complaint-badges">
//                       <span className={`badge ${getCategoryColor(complaint.category)}`}>
//                         {complaint.category}
//                       </span>
//                       <span className={`badge ${getStatusColor(complaint.status)}`}>
//                         {complaint.status}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="complaint-description">
//                     <p>{complaint.description}</p>
//                   </div>

//                   <div className="complaint-footer">
//                     <span className="complaint-date">
//                       📅 {formatDate(complaint.createdAt)}
//                     </span>

//                     <div className="status-controls">
//                       <select
//                         value={complaint.status}
//                         onChange={(e) =>
//                           handleStatusUpdate(complaint._id, e.target.value)
//                         }
//                         disabled={updatingId === complaint._id}
//                         className="status-select"
//                       >
//                         <option value="Open">Open</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Resolved">Resolved</option>
//                       </select>
//                       {updatingId === complaint._id && (
//                         <span className="updating-indicator">Updating...</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <p className="empty-icon">📋</p>
//               <p className="empty-message">
//                 {Object.values(filters).some((v) => v) ? (
//                   <>No complaints found with the selected filters.</>
//                 ) : (
//                   <>No complaints submitted yet.</>
//                 )}
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
