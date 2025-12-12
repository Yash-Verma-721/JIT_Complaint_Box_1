# 📁 Complete Project File Structure & Guide

## 🗂️ Project Directory Tree

```
D:\Proojectt/
│
├── 📄 Documentation Files
│   ├── README.md                              ← Original README
│   ├── QUICK_START.md                         ← ⭐ START HERE (5 min)
│   ├── DATABASE_CONNECTION_GUIDE.md           ← Complete reference (15 min)
│   ├── IMPLEMENTATION_COMPLETE.md             ← Architecture details (20 min)
│   ├── TESTING_GUIDE.md                       ← Test scenarios (20 min)
│   ├── USER_ACTION_CHECKLIST.md               ← What to do (10 min)
│   ├── PROJECT_COMPLETION_SUMMARY.md          ← Overview (10 min)
│   ├── README_COMPLETE.md                     ← Full summary
│   ├── DELIVERY_PACKAGE.md                    ← This delivery package
│   ├── MONGODB_SETUP.md                       ← Database setup guide
│   ├── SETUP_GUIDE.md                         ← Initial setup
│   ├── APP_STATUS.md                          ← Status tracker
│   └── STARTUP_COMPLETE.md                    ← Startup guide
│
├── 🚀 Automated Setup
│   └── START-WINDOWS.bat                      ← Auto-start script (Windows)
│
├── 📦 Configuration Files
│   ├── .env                                   ← Environment variables
│   ├── package.json                           ← Frontend dependencies
│   ├── tailwind.config.js                     ← Tailwind CSS config
│   ├── tsconfig.json                          ← TypeScript config (Frontend)
│   ├── tsconfig.node.json                     ← TypeScript config (Node/Build)
│   ├── vite.config.ts                         ← Vite build config
│   ├── postcss.config.js                      ← PostCSS config (Tailwind)
│   └── .gitignore                             ← Git ignore rules
│
├── 📜 Frontend Files (SPA - Single Page App)
│   ├── index.html                             ← HTML entry point
│   ├── main.tsx                               ← React entry point (with BrowserRouter)
│   │
│   └── src/
│       ├── App.tsx                            ← ⭐ Main router (ALL ROUTES)
│       ├── index.css                          ← Global styles + Tailwind directives
│       │
│       ├── 📄 API Layer
│       │   ├── axiosInstance.ts               ← Axios config (base URL)
│       │   ├── authApi.ts                     ← Admin login endpoint
│       │   └── complaintApi.ts                ← Complaint CRUD endpoints
│       │
│       ├── 🛡️ Components
│       │   └── RequireAdmin.tsx               ← Route protection wrapper
│       │
│       ├── 📐 Layout
│       │   └── MainLayout.tsx                 ← Header + Footer + Outlet
│       │
│       └── 📄 Pages (9 Pages Total)
│           ├── HomePage.tsx                   ← Landing page (Hero + Categories)
│           ├── StudentLoginPage.tsx           ← Student login (mock)
│           ├── StudentSignupPage.tsx          ← Student signup (mock)
│           ├── StudentDashboardPage.tsx       ← View complaints (mock data)
│           ├── ReportComplaintPage.tsx        ← ⭐ Submit complaint (API)
│           ├── ThankYouPage.tsx               ← Confirmation page
│           ├── AdminLoginPage.tsx             ← ⭐ Admin login (API)
│           ├── AdminDashboard.tsx             ← ⭐ Admin panel (API)
│           └── NotFoundPage.tsx               ← 404 error page
│
├── 🖥️ Backend Server
│   ├── server/
│   │   ├── package.json                       ← Backend dependencies
│   │   ├── tsconfig.json                      ← TypeScript config
│   │   │
│   │   └── src/
│   │       ├── index.ts                       ← ⭐ Server entry point
│   │       │                                   (MongoDB connection + routes)
│   │       │
│   │       ├── 🎮 Controllers
│   │       │   ├── authController.ts          ← Admin login logic
│   │       │   └── complaintController.ts     ← Complaint CRUD logic
│   │       │
│   │       ├── 🗄️ Models
│   │       │   ├── Admin.ts                   ← Admin schema (with middleware)
│   │       │   └── Complaint.ts               ← Complaint schema
│   │       │
│   │       ├── 🛣️ Routes
│   │       │   ├── authRoutes.ts              ← /api/auth/* routes
│   │       │   └── complaintRoutes.ts         ← /api/* + /api/admin/* routes
│   │       │
│   │       ├── 🔐 Middleware
│   │       │   └── authMiddleware.ts          ← JWT verification
│   │       │
│   │       ├── ⚙️ Services
│   │       │   ├── mockDatabase.ts            ← In-memory fallback DB
│   │       │   └── databaseService.ts         ← DB initialization
│   │       │
│   │       └── 🌱 Config
│   │           └── seedAdmin.ts               ← Create default admin
│   │
│
├── 🎨 Styling Files
│   └── src/styles/
│       ├── AdminDashboard.css
│       ├── AdminLoginPage.css
│       ├── StudentComplaintPage.css
│       └── ThankYouPage.css
│
└── 📋 Other Files
    └── (Old/Legacy files from previous iterations)
```

---

## 🚀 How to Use This Structure

### Frontend Files You Care About

**Most Important:**
```
src/
├── App.tsx                    ← Where ALL routes are defined
├── pages/                     ← Where ALL pages live
└── api/                       ← Where API calls happen
```

**Key Pages:**
- `ReportComplaintPage.tsx` - Submits to backend
- `AdminLoginPage.tsx` - Login with API
- `AdminDashboard.tsx` - View/manage complaints from API

### Backend Files You Care About

**Most Important:**
```
server/src/
├── index.ts                   ← Server startup (MongoDB connection)
├── routes/                    ← API endpoints definition
├── controllers/               ← Business logic
├── models/                    ← Database schemas
└── middleware/                ← Auth verification
```

**Key Endpoints:**
- `/api/complaints` - POST (create)
- `/api/auth/admin/login` - POST (login)
- `/api/admin/complaints` - GET (list)
- `/api/admin/complaints/:id/status` - PATCH (update)

---

## 📖 Documentation Map

```
Want to...                          Read This:
─────────────────────────────────────────────────────
Get started in 5 min                → QUICK_START.md
Know what to do                     → USER_ACTION_CHECKLIST.md
Set up database                     → DATABASE_CONNECTION_GUIDE.md
Test everything                     → TESTING_GUIDE.md
Understand architecture             → IMPLEMENTATION_COMPLETE.md
See complete overview               → PROJECT_COMPLETION_SUMMARY.md
Get full delivery info              → DELIVERY_PACKAGE.md
See file structure                  → THIS FILE (FILE_STRUCTURE.md)
```

---

## 🔄 Data Flow Through Files

### Submitting a Complaint

```
1. ReportComplaintPage.tsx (User fills form)
       ↓
2. complaintApi.ts (submitComplaint() function)
       ↓
3. axiosInstance.ts (HTTP POST request)
       ↓
4. [NETWORK]
       ↓
5. server/src/index.ts (Express app receives)
       ↓
6. server/src/routes/complaintRoutes.ts (Routes request)
       ↓
7. server/src/controllers/complaintController.ts (Handles logic)
       ↓
8. server/src/models/Complaint.ts (Validates & saves)
       ↓
9. MongoDB (Stores data)
       ↓
10. Server returns JSON response
       ↓
11. Frontend shows success alert
```

### Admin Viewing Complaints

```
1. AdminDashboard.tsx (Page loads)
       ↓
2. useEffect calls getAdminComplaints()
       ↓
3. complaintApi.ts (getAdminComplaints function)
       ↓
4. axiosInstance.ts (GET request + token in header)
       ↓
5. [NETWORK]
       ↓
6. server/src/routes/complaintRoutes.ts (Routes GET request)
       ↓
7. server/src/middleware/authMiddleware.ts (Verifies token)
       ↓
8. server/src/controllers/complaintController.ts (Gets data)
       ↓
9. server/src/models/Complaint.ts (Queries MongoDB)
       ↓
10. MongoDB (Searches complaints collection)
       ↓
11. Returns array of complaints
       ↓
12. AdminDashboard.tsx (Displays in table)
```

---

## 🎯 What Each File Does

### Frontend Pages

| File | Purpose | Features |
|------|---------|----------|
| HomePage | Landing page | Hero, categories, CTAs |
| StudentLoginPage | Student login | Email/password form |
| StudentSignupPage | Student signup | Registration form |
| StudentDashboardPage | View complaints | Status, filter, mock data |
| ReportComplaintPage | Submit complaint | Form, validation, API call |
| AdminLoginPage | Admin login | Secure login with API |
| AdminDashboard | Admin panel | View, filter, update status |
| ThankYouPage | Confirmation | Thank you message |
| NotFoundPage | 404 error | Page not found |

### Backend Controllers

| File | Purpose | Functions |
|------|---------|-----------|
| authController | Authentication | adminLogin() |
| complaintController | Complaints | createComplaint(), getAllComplaintsForAdmin(), updateComplaintStatus() |

### Backend Models

| File | Purpose | Schema |
|------|---------|--------|
| Admin | Admin users | email, passwordHash, name |
| Complaint | Complaints | title, description, category, status, etc. |

### Backend Routes

| File | Purpose | Endpoints |
|------|---------|-----------|
| authRoutes | Auth endpoints | POST /api/auth/admin/login |
| complaintRoutes | Complaint endpoints | POST /api/complaints, GET /api/admin/complaints, PATCH /api/admin/complaints/:id/status |

---

## 🔑 Key Configuration Files

### `.env` - Environment Variables
```env
# You edit this file
PORT=5000                              # Backend port
MONGO_URI=mongodb://...                # Database connection
JWT_SECRET=your_secret_key             # Security key
ADMIN_DEFAULT_EMAIL=admin@jit.com      # Admin username
ADMIN_DEFAULT_PASSWORD=admin123456     # Admin password
VITE_API_URL=http://localhost:5000/api # Backend URL
```

### `tailwind.config.js` - Tailwind Settings
```javascript
// Customize colors, fonts, spacing here
// Current: Indigo/Purple for student, Slate for admin
```

### `vite.config.ts` - Frontend Build
```typescript
// Vite dev server (port 3000)
// TypeScript support
// React JSX support
```

### `tsconfig.json` - TypeScript Config
```json
// Strict mode enabled
// React JSX preset
// ES2020 target
```

---

## 📊 Lines of Code by Area

```
Frontend:
  Pages & Components    ~1,500 lines
  API Integration       ~300 lines
  Styling (CSS/Tailwind) ~500 lines
  Configuration        ~200 lines
  ───────────────────
  Total Frontend       ~2,500 lines

Backend:
  Controllers          ~300 lines
  Models              ~150 lines
  Routes              ~50 lines
  Middleware          ~100 lines
  Config              ~50 lines
  ───────────────────
  Total Backend       ~650 lines

Documentation:
  Total              ~80 pages (75+ minutes reading)
```

---

## 🚀 How to Navigate the Code

### To Find Something...

**"Where's the code to submit a complaint?"**
→ `src/pages/ReportComplaintPage.tsx` (Frontend form)
→ `src/api/complaintApi.ts` (API function)
→ `server/src/controllers/complaintController.ts` (Backend logic)

**"Where's the authentication?"**
→ `server/src/controllers/authController.ts` (Login logic)
→ `server/src/middleware/authMiddleware.ts` (Token verification)
→ `src/pages/AdminLoginPage.tsx` (Login form)

**"Where are the routes?"**
→ `src/App.tsx` (Frontend routes)
→ `server/src/routes/` (Backend routes)

**"Where's the database setup?"**
→ `server/src/index.ts` (MongoDB connection)
→ `server/src/models/` (Database schemas)

**"Where's the styling?"**
→ `tailwind.config.js` (Tailwind config)
→ `src/index.css` (Global styles)
→ Individual `tsx` files (Component styles)

---

## 📋 File Dependencies (What Imports What)

```
App.tsx
  ├── imports all Page components
  ├── imports MainLayout
  └── imports RequireAdmin

ReportComplaintPage.tsx
  └── imports complaintApi.ts
      └── imports axiosInstance.ts

AdminDashboard.tsx
  └── imports complaintApi.ts
      └── imports axiosInstance.ts

AdminLoginPage.tsx
  └── imports authApi.ts
      └── imports axiosInstance.ts

axiosInstance.ts
  └── creates Axios instance with baseURL from .env

server/src/index.ts
  ├── imports authRoutes
  ├── imports complaintRoutes
  └── imports seedAdmin

complaintRoutes.ts
  └── imports complaintController

complaintController.ts
  └── imports Complaint model

Complaint.ts
  └── imports mongoose (for schema)

authController.ts
  └── imports Admin model
```

---

## 🎯 Commonly Edited Files

### When You Want to...

**Change admin login email/password:**
→ Edit `.env` file
→ `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD`

**Change database connection:**
→ Edit `.env` file
→ `MONGO_URI` variable

**Add a new page:**
→ Create new file in `src/pages/`
→ Import in `src/App.tsx`
→ Add new Route in App.tsx

**Change colors/styling:**
→ Edit `tailwind.config.js`
→ Or modify className in pages

**Add a new API endpoint:**
→ Add endpoint in `server/src/routes/`
→ Create handler in `server/src/controllers/`
→ Add API function in `src/api/`

**Change database fields:**
→ Edit schema in `server/src/models/`
→ Update controller to handle new fields
→ Update frontend form accordingly

---

## 📍 Key Files Locations

```
FRONTEND
├── Routes defined:          src/App.tsx
├── Pages live:              src/pages/
├── API calls:               src/api/
├── Styling config:          tailwind.config.js
└── Entry point:             src/main.tsx

BACKEND
├── Server runs:             server/src/index.ts
├── Routes defined:          server/src/routes/
├── Business logic:          server/src/controllers/
├── Database schemas:        server/src/models/
├── Auth verification:       server/src/middleware/
└── Config entry:            .env

DATABASE
├── Connection string:       .env (MONGO_URI)
├── Schemas defined:         server/src/models/
└── Collections:             MongoDB (jit_complaint_box)
```

---

## 🔍 Finding Code Examples

```
Want to see...                          Look in:
─────────────────────────────────────────────────
React component                         src/pages/HomePage.tsx
Form validation                         src/pages/ReportComplaintPage.tsx
API call with error handling            src/api/complaintApi.ts
Express route                           server/src/routes/complaintRoutes.ts
Database query                          server/src/controllers/complaintController.ts
Mongoose schema                         server/src/models/Complaint.ts
JWT verification                        server/src/middleware/authMiddleware.ts
React hooks usage                       src/pages/AdminDashboard.tsx
Tailwind styling                        src/pages/HomePage.tsx
TypeScript interfaces                   src/api/complaintApi.ts
```

---

## ✨ Project Organization Summary

```
Clean Code Structure:
  ✓ Frontend separated from backend
  ✓ API calls abstracted in dedicated files
  ✓ Controllers handle business logic
  ✓ Models define data structure
  ✓ Middleware handles auth
  ✓ Routes organized by feature

Easy to Navigate:
  ✓ Consistent naming conventions
  ✓ Files organized by type
  ✓ Clear imports and exports
  ✓ Comments where needed
  ✓ TypeScript for clarity

Easy to Modify:
  ✓ Configuration in .env
  ✓ Styling in one place
  ✓ API functions reusable
  ✓ Components modular
  ✓ Controllers focused
```

---

## 🚀 Next: Start Here

1. **Understand the structure** (this file)
2. **Read QUICK_START.md** (get it running)
3. **Look at key files** (App.tsx, index.ts)
4. **Test it out** (submit complaint, see it in admin)
5. **Explore code** (follow the data flow)
6. **Customize** (change colors, text, etc.)
7. **Deploy** (when ready)

---

**File Structure Guide Created**: December 9, 2025  
**Total Files**: 60+  
**Total Lines of Code**: 3,000+  
**Total Documentation**: 80+ pages
