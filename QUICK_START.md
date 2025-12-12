# 🚀 Quick Start Guide - JIT Complaint Box

## ⚡ 30-Second Setup

### Option 1: Automated (Windows)
```bash
# Double-click this file
START-WINDOWS.bat
```
This will:
- ✅ Install all dependencies
- ✅ Create .env file
- ✅ Start both servers
- ✅ Open in browser

### Option 2: Manual Setup

#### Step 1: Install Dependencies
```bash
npm install                    # Frontend
cd server && npm install       # Backend
```

#### Step 2: Configure Database
Choose ONE option:

**A. Local MongoDB** (requires mongod running)
```bash
mongod
```

**B. MongoDB Atlas** (Recommended - Free Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace `MONGO_URI` in `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/jit-complaint-box?retryWrites=true&w=majority
```

#### Step 3: Start Servers
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

#### Step 4: Access Application
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 📋 Essential Information

### Admin Credentials (Pre-Configured)
```
Email:    admin@jit.com
Password: admin123456
```

### API Endpoints
- Submit Complaint: `POST /api/complaints`
- Admin Login: `POST /api/auth/admin/login`
- Get Complaints: `GET /api/admin/complaints` (requires JWT)
- Update Status: `PATCH /api/admin/complaints/:id/status` (requires JWT)

### File Structure
```
jit-complaint-box/
├── src/              (Frontend React)
├── server/           (Backend Express)
├── .env              (Configuration)
└── docs/             (Guides)
```

---

## ✨ Key Features

### Student (Public)
- 🏠 Report complaints anonymously
- 📊 View complaint status
- 📱 Mobile-friendly interface

### Admin (Protected)
- 👁️ View all complaints
- 🔄 Update complaint status
- 🔍 Filter by category/status
- 📊 Dashboard analytics

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 3000 in use** | `netstat -ano \| findstr :3000` → Kill process |
| **Port 5000 in use** | Kill node process on port 5000 |
| **MongoDB connection error** | Use MongoDB Atlas OR start `mongod` |
| **Module not found** | Run `npm install` in both root and `/server` |
| **Login fails** | Check ADMIN_DEFAULT_EMAIL in .env |

---

## 📖 Full Documentation

- **DATABASE_CONNECTION_GUIDE.md** - Complete setup & API reference
- **IMPLEMENTATION_COMPLETE.md** - Architecture & features
- **TESTING_GUIDE.md** - How to test all features

---

## 🎯 Test It Out

### 1. Submit Complaint
1. Go to http://localhost:3000
2. Click "Report an Issue"
3. Fill out form
4. Click "Submit"
5. Should see success message

### 2. View as Admin
1. Click "Admin" in navbar
2. Login with:
   - Email: `admin@jit.com`
   - Password: `admin123456`
3. Should see your complaint in dashboard
4. Try changing status

### 3. Check Database
1. Open MongoDB Compass
2. Connect to your database
3. Check `complaints` collection
4. Should see your submitted data

---

## 🔐 Security Notes

- Passwords are hashed with bcryptjs
- JWT tokens expire in 24 hours
- Admin routes require valid token
- CORS enabled for localhost:3000

---

## 🚀 Ready to Go!

**Frontend**: http://localhost:3000
**Backend**: http://localhost:5000/api/health
**Admin Panel**: http://localhost:3000/admin/login

---

## 📝 Next Steps

1. ✅ Understand the project structure
2. ✅ Test all features
3. ✅ Customize for your institution
4. ✅ Deploy to production

---

**Questions?** Check the full documentation or review the test guide!
