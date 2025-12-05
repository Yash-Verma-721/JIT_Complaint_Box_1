# JIT Complaint Box - Setup & Installation Guide

## ✅ Project Structure Fixed

All errors have been fixed. Your project is now ready to run!

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn

### Installation Steps

#### 1. Install Root Dependencies
```bash
npm install
```

#### 2. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

#### 3. Create Environment File
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values (especially MONGO_URI and JWT_SECRET)
```

#### 4. Update .env file
Edit `.env` in the root directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jit-complaint-box
JWT_SECRET=your_super_secret_key_12345
ADMIN_DEFAULT_EMAIL=admin@jit.com
ADMIN_DEFAULT_PASSWORD=admin123456
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Option 1: Run Both Frontend & Backend Separately

**Terminal 1 - Backend Server:**
```bash
cd server
npm install  # if not already installed
npm run dev
```

Backend will start on: **http://localhost:5000**

**Terminal 2 - Frontend Server:**
```bash
npm install  # if not already installed
npm run dev
```

Frontend will start on: **http://localhost:3000**

#### Option 2: Run Only Backend (for testing API)
```bash
cd server
npm run dev
```

Test the API:
```bash
# Health check
curl http://localhost:5000/health

# Admin login
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jit.com","password":"admin123456"}'
```

---

## 📋 What Was Fixed

### Backend (server/)
✅ Fixed Mongoose model exports (removed duplicate exports)
✅ Fixed pre-save middleware error handling
✅ Updated server.ts with proper imports and routes
✅ All TypeScript compilation errors resolved

### Frontend (src/)
✅ Created missing App.tsx component
✅ Created src/api directory with:
  - axiosInstance.ts - Axios client with interceptors
  - complaintApi.ts - Complaint API functions
  - authApi.ts - Authentication API functions
✅ All React components connected properly

### Configuration Files
✅ tsconfig.json - Frontend TypeScript config
✅ tsconfig.node.json - Vite config TypeScript
✅ vite.config.ts - Vite build configuration
✅ tailwind.config.js - Tailwind CSS configuration
✅ postcss.config.js - PostCSS configuration
✅ index.html - HTML entry point
✅ .env.example - Environment variables template

### Root Package
✅ Updated package.json with all required dependencies and scripts

---

## 🧪 Testing the Application

### 1. Start Backend
```bash
cd server && npm run dev
```

### 2. Start Frontend (in another terminal)
```bash
npm run dev
```

### 3. Access the Application
- Student Complaints: http://localhost:3000/
- Admin Login: http://localhost:3000/admin/login
- Admin Dashboard: http://localhost:3000/admin/dashboard

### 4. Default Admin Login
- Email: `admin@jit.com`
- Password: `admin123456`

---

## 📱 Pages

1. **Student Complaint Form** (`/`)
   - Submit complaints anonymously or with name
   - Select category
   - Validation included

2. **Thank You Page** (`/thanks`)
   - Shown after successful complaint submission
   - Option to submit another complaint

3. **Admin Login** (`/admin/login`)
   - Email and password authentication
   - JWT token stored in localStorage

4. **Admin Dashboard** (`/admin/dashboard`)
   - View all complaints
   - Filter by status and category
   - Update complaint status in real-time
   - Logout button

---

## 🔗 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `POST /api/complaints` - Submit complaint
- `POST /api/auth/admin/login` - Admin login

### Admin-Protected Endpoints
- `GET /api/complaints/admin` - Get all complaints (with filters)
- `PATCH /api/complaints/admin/:id/status` - Update complaint status

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
# Start MongoDB locally:
mongod

# Or use MongoDB Atlas connection string in .env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jit-complaint-box
```

### Port Already in Use
```bash
# Change PORT in .env for backend
PORT=5001

# Change port in vite.config.ts for frontend
server: {
  port: 3001,
}
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# For server
cd server
rm -r node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env matches backend URL

---

## 📦 Project Structure

```
Proojectt/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts
│   │   ├── complaintApi.ts
│   │   └── authApi.ts
│   ├── components/
│   │   └── RequireAdmin.tsx
│   ├── pages/
│   │   ├── StudentComplaintPage.tsx
│   │   ├── ThankYouPage.tsx
│   │   ├── AdminLoginPage.tsx
│   │   └── AdminDashboard.tsx
│   ├── styles/
│   │   ├── StudentComplaintPage.css
│   │   ├── AdminLoginPage.css
│   │   ├── AdminDashboard.css
│   │   └── ThankYouPage.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server/
│   ├── src/
│   │   ├── api/
│   │   ├── config/
│   │   │   └── seedAdmin.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── .gitignore
├── index.html
├── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js
└── README.md
```

---

## ✨ Features

### Student Features
- ✅ Simple complaint submission form
- ✅ Anonymous or named submission
- ✅ Category selection
- ✅ Form validation
- ✅ Thank you confirmation

### Admin Features
- ✅ Secure login (JWT authentication)
- ✅ View all complaints
- ✅ Filter by status and category
- ✅ Update complaint status
- ✅ Real-time updates
- ✅ Secure logout

---

## 🎉 You're All Set!

Your JIT Complaint Box application is now fully functional and ready to use!

Start the servers and begin using the application. 

**Happy Coding! 🚀**

Last Updated: December 3, 2025
