# Quick Start Guide - MongoDB Setup

## 🚀 Get MongoDB Running (5 minutes)

### Option 1: MongoDB Atlas Cloud (EASIEST - Recommended)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Click "Start Free"** and create account
3. **Create a Free Cluster**:
   - Select "M0 Free" tier
   - Choose a region
   - Create cluster (wait 1-3 minutes)

4. **Get Connection String**:
   - Click "Connect" button
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://user:pass@cluster0.mongodb.net/jit-complaint-box?retryWrites=true&w=majority`

5. **Update `.env` file**:
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/jit-complaint-box?retryWrites=true&w=majority
   ```

6. **Start Backend**:
   ```powershell
   cd server
   npm run dev
   ```

✅ Done! Backend should connect successfully.

---

### Option 2: Local MongoDB (If you have Docker)

If you have Docker installed, run:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

The `.env` file is already configured for this!

```powershell
cd server
npm run dev
```

---

### Option 3: Download & Install MongoDB Locally

1. **Download**: https://www.mongodb.com/try/download/community
2. **Install** with default settings
3. **Start MongoDB**:
   - Windows: MongoDB should auto-start after installation
   - Or open Services and start "MongoDB Server"

4. **Run Backend**:
   ```powershell
   cd server
   npm run dev
   ```

---

## ✅ Verify Everything Works

### 1. Backend is Running
Look for this output:
```
✅ MongoDB connected successfully!
🚀 Server running on http://localhost:5000
```

### 2. Test the Application

Open your browser and go to:
- **Student Form**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
  - Email: `admin@jit.com`
  - Password: `admin123456`

### 3. Test the Flow
1. Go to Student Form (http://localhost:3000)
2. Fill in and submit a complaint
3. Login to admin dashboard (http://localhost:3000/admin/login)
4. See your complaint in the dashboard
5. Update complaint status

---

## 🎯 Terminal Setup

**Terminal 1 - Frontend** (ALREADY RUNNING):
```powershell
npm run dev
```
Output: `VITE v5.4.21 ready in XXX ms` + `Local: http://localhost:3000/`

**Terminal 2 - Backend** (START AFTER MongoDB):
```powershell
cd server
npm run dev
```
Output: Should show `✅ MongoDB connected` and `🚀 Server running`

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "MongoDB connection refused" | MongoDB not running - start it or use Atlas |
| "Cannot connect to Atlas" | Check connection string in `.env` |
| "Port 5000 already in use" | Kill process: `netstat -ano \| findstr :5000` then `taskkill /PID <id> /F` |
| "Admin login not working" | Ensure backend is running and MongoDB is connected |

---

## 🎉 You're All Set!

✅ Frontend running: http://localhost:3000
⏳ Set up MongoDB above
✅ Start backend: `cd server && npm run dev`
✅ Access app!

Need help? Check `SETUP_GUIDE.md` for detailed instructions.

