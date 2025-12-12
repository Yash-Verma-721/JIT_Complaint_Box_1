# JIT Complaint Box - Complete Setup & Connection Guide

## 📋 Project Overview
This is a full-stack complaint management system with:
- **Frontend**: React + TypeScript + Tailwind CSS (Port 3000)
- **Backend**: Express.js + MongoDB + JWT Auth (Port 5000)
- **Database**: MongoDB for persistent data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Step 1: Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment Variables

Create/Update `.env` file in root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# Option 1: Local MongoDB
MONGO_URI=mongodb://localhost:27017/jit-complaint-box

# Option 2: MongoDB Atlas (Cloud - Recommended)
# MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/jit-complaint-box?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Default Admin Credentials
ADMIN_DEFAULT_EMAIL=admin@jit.com
ADMIN_DEFAULT_PASSWORD=admin123456

# Frontend API URL
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB (If Using Local)

**Windows:**
```bash
mongod
```

**Or use MongoDB Atlas (Recommended):**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGO_URI` in `.env`

### Step 4: Start the Servers

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Expected output:
```
✅ MongoDB connected successfully
✅ Server running on http://localhost:5000
📋 API Base URL: http://localhost:5000/api
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Expected output:
```
✅ VITE ready in XXX ms
📍 Local: http://localhost:3000/
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/health
- **Admin Login**: http://localhost:3000/admin/login

## 🔐 Authentication & Access Control

### Admin Features (Protected)
- `/admin/login` - Admin login page
- `/admin/dashboard` - View all complaints, update status, filter by status/category

**Default Admin Credentials:**
- Email: `admin@jit.com`
- Password: `admin123456`

### Student Features (Public)
- `/` - Home page
- `/login` - Student login
- `/signup` - Student registration
- `/report` - Submit complaint
- `/dashboard` - View own complaints
- `/thanks` - Confirmation page after submission

## 📊 Database Connection Flow

```
Frontend (React)
    ↓
Axios Instance (src/api/axiosInstance.ts)
    ↓
API Routes (complaintApi.ts, authApi.ts)
    ↓
Backend Express Server (port 5000)
    ↓
MongoDB (Mongoose Models)
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
  - Body: `{ email, password }`
  - Returns: `{ token, admin: { id, email, name } }`

### Complaints (Public)
- `POST /api/complaints` - Submit complaint
  - Body: `{ title, description, category, studentName?, isAnonymous }`
  - Returns: Saved complaint object

### Admin Complaints (Protected)
- `GET /api/admin/complaints` - Get all complaints with filters
  - Headers: `Authorization: Bearer <token>`
  - Query: `?status=Open&category=Infrastructure`
  - Returns: Array of complaints

- `PATCH /api/admin/complaints/:id/status` - Update complaint status
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ status: "Open" | "In Progress" | "Resolved" }`
  - Returns: Updated complaint object

## 📝 Database Schema

### Complaint Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  category: "Hostel" | "Academics" | "Infrastructure" | "Administration" | "Other",
  studentName: String (optional),
  isAnonymous: Boolean,
  status: "Open" | "In Progress" | "Resolved",
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Schema
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  passwordHash: String (required, hashed with bcryptjs),
  name: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Features

### Pages Implemented
1. **HomePage** - Hero section with categories and CTAs
2. **StudentLoginPage** - Student login form
3. **StudentSignupPage** - Student registration form
4. **ReportComplaintPage** - Complaint submission form with validation
5. **StudentDashboardPage** - View own complaints with filters
6. **AdminLoginPage** - Admin authentication
7. **AdminDashboard** - Admin control panel
8. **NotFoundPage** - 404 error page

### Styling
- **Framework**: Tailwind CSS
- **Features**: 
  - Responsive design (mobile-first)
  - Gradient backgrounds
  - Smooth animations
  - Dark/Light theme support
  - Modern UI components

## ✨ Key Features

### Real-Time Database Sync
- Complaints saved to MongoDB immediately
- Admin can view all submitted complaints
- Status updates reflect in real-time
- Filter by status and category

### Security
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- Token stored in localStorage

### User Experience
- Smooth page transitions
- Form validation with error messages
- Loading states
- Success/error alerts
- Responsive mobile design

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Or use MongoDB Atlas with correct connection string
3. Check `MONGO_URI` in `.env`

### Port Already in Use
```
listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` matches backend URL
- CORS is enabled in server (app.use(cors()))

### Missing Environment Variables
```
JWT_SECRET is not set in environment variables
```
**Solution:**
- Ensure `.env` file exists in root directory
- Add missing variables
- Restart servers

## 📚 File Structure

```
JIT_Complaint_Box/
├── src/
│   ├── App.tsx (Main routing)
│   ├── pages/ (All page components)
│   ├── api/ (API integration)
│   ├── components/ (Reusable components)
│   └── layout/ (Layout components)
├── server/
│   ├── src/
│   │   ├── index.ts (Server entry point)
│   │   ├── controllers/ (Route handlers)
│   │   ├── models/ (Database schemas)
│   │   ├── routes/ (API endpoints)
│   │   ├── middleware/ (Auth middleware)
│   │   └── services/ (Utilities)
│   └── package.json
├── .env (Environment config)
└── package.json
```

## 🔄 Data Flow Example

**Submitting a Complaint:**
1. User fills form on ReportComplaintPage
2. Clicks "Submit" button
3. Frontend calls `submitComplaint()` from complaintApi.ts
4. Axios sends POST request to `/api/complaints`
5. Backend receives at `complaintController.createComplaint()`
6. Mongoose validates and saves to MongoDB
7. Server returns saved complaint with _id
8. Frontend shows success alert
9. Redirects to `/thanks` page

**Admin Viewing Complaints:**
1. Admin logs in with email/password
2. JWT token stored in localStorage
3. Admin navigates to `/admin/dashboard`
4. Frontend calls `getAdminComplaints()`
5. Axios includes token in Authorization header
6. Backend middleware verifies token
7. complaintController fetches from MongoDB
8. Returns filtered complaints
9. Dashboard displays in real-time table

## 📱 Testing Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend health check: http://localhost:5000/api/health
- [ ] Admin login works with provided credentials
- [ ] Submit complaint form works
- [ ] Admin can view all complaints
- [ ] Admin can change complaint status
- [ ] Filtering by status/category works
- [ ] Data persists after page refresh
- [ ] Responsive design on mobile

## 🎯 Next Steps

1. **Customize Admin Credentials** - Change default email/password in production
2. **Add User Authentication** - Implement student login/signup
3. **Email Notifications** - Add nodemailer for status updates
4. **File Uploads** - Allow attachments on complaints
5. **Dashboard Analytics** - Add charts and statistics
6. **Deployment** - Deploy to Heroku, Vercel, or similar

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all environment variables
3. Check browser console for errors
4. Check server terminal logs
5. Ensure MongoDB is running

## ✅ Completion Status

- ✅ Frontend routing (App.tsx)
- ✅ All page components created
- ✅ Backend API structure
- ✅ Database models (Complaint, Admin)
- ✅ Authentication (JWT)
- ✅ API integration (Axios)
- ✅ Styling (Tailwind CSS)
- ✅ Responsive design
- ✅ Error handling
- ✅ Mock database fallback

---

**Created**: December 9, 2025
**Version**: 1.0.0
**Status**: ✅ Ready for Testing & Development
