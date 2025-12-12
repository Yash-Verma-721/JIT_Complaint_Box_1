# ✅ User Action Checklist - What You Need To Do

## 🎯 Your Next Steps

### Step 1: Prepare Environment (5 minutes)
- [ ] Ensure Node.js is installed (`node --version`)
- [ ] Ensure npm is installed (`npm --version`)
- [ ] Choose MongoDB setup:
  - [ ] **Option A**: Install MongoDB locally from https://www.mongodb.com/try/download/community
  - [ ] **Option B**: Use MongoDB Atlas (FREE Cloud) - https://www.mongodb.com/cloud/atlas

### Step 2: Database Setup (Choose One)

#### If Using Local MongoDB:
```bash
# Windows
1. Download MongoDB Community Edition
2. Install with default settings
3. Start MongoDB:
   mongod
# Keep this terminal running while using the app
```

#### If Using MongoDB Atlas (Recommended):
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for FREE account
3. Create a cluster (free tier)
4. Get connection string
5. In .env file, replace:
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/jit-complaint-box?retryWrites=true&w=majority
6. Save .env file
```

### Step 3: Start the Application

#### Option A: Automated (Windows)
```bash
Double-click:  START-WINDOWS.bat
```
This will automatically:
- Install all dependencies
- Create .env file
- Start both servers
- Open in browser

#### Option B: Manual Start
```bash
# Terminal 1 - Install dependencies
npm install
cd server
npm install
cd ..

# Terminal 2 - Start Backend
cd server
npm run dev

# Terminal 3 - Start Frontend
npm run dev
```

### Step 4: Verify Everything Works

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend responds at http://localhost:5000/api/health
- [ ] No error messages in console

### Step 5: Test The System

- [ ] Click "Report an Issue" on home page
- [ ] Fill out complaint form
- [ ] Submit complaint
- [ ] See success message
- [ ] Redirected to Thank You page

### Step 6: Login as Admin

- [ ] Click "Admin" in navbar
- [ ] Enter: `admin@jit.com` / `admin123456`
- [ ] See your submitted complaint in dashboard
- [ ] Try changing its status

### Step 7: Verify Database

- [ ] Open MongoDB Compass or Atlas UI
- [ ] Navigate to database: `jit_complaint_box`
- [ ] Check `complaints` collection
- [ ] Verify your test data is there

---

## 🚨 Troubleshooting Quick Fixes

### "Cannot find module" error
```bash
# Terminal 1
npm install

# Terminal 2 (in /server directory)
npm install
```

### "Port 3000 already in use"
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID 12345 /F
```

### "MongoDB connection refused"
**Solution 1**: Start MongoDB locally
```bash
mongod
```

**Solution 2**: Use MongoDB Atlas
- Update `MONGO_URI` in `.env`
- Get free cluster at mongodb.com/cloud/atlas

### "Admin login doesn't work"
- Verify `.env` has: `ADMIN_DEFAULT_EMAIL=admin@jit.com`
- Verify `.env` has: `ADMIN_DEFAULT_PASSWORD=admin123456`
- Restart backend server

### "Can't see submitted complaints in dashboard"
- Ensure MongoDB is connected
- Check backend terminal for errors
- Try submitting another complaint
- Refresh admin dashboard

---

## 📚 Documentation to Read (In Order)

1. **QUICK_START.md** - First read this (5 min)
2. **DATABASE_CONNECTION_GUIDE.md** - For detailed setup (10 min)
3. **TESTING_GUIDE.md** - To verify everything works (15 min)
4. **IMPLEMENTATION_COMPLETE.md** - To understand architecture (20 min)

---

## 🎯 Common User Tasks

### I want to test complaint submission
1. Go to http://localhost:3000
2. Click "Report an Issue"
3. Fill form with test data
4. Click "Submit"

### I want to view complaints as admin
1. Click "Admin" → "Login"
2. Enter: admin@jit.com / admin123456
3. Click "Login"
4. View all complaints in dashboard

### I want to change a complaint's status
1. Login as admin (see above)
2. Find complaint in dashboard
3. Click status dropdown
4. Select new status
5. Status updates immediately

### I want to filter complaints
1. Login as admin
2. Use "Status" dropdown to filter by status
3. Use "Category" dropdown to filter by type
4. Can combine filters

### I want to check my database
1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Select database: `jit_complaint_box`
4. Check `complaints` collection
5. Click on a document to see details

### I want to modify admin credentials
1. Open `.env` file
2. Find: `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD`
3. Change them
4. Restart backend server
5. Next startup will use new credentials

### I want to change the database
1. Open `.env` file
2. Find: `MONGO_URI`
3. Replace with your MongoDB connection string
4. Save and restart servers

---

## 🔧 Configuration You Might Want to Change

### In `.env` file:

```env
# Change port (if 5000 is in use)
PORT=5000              # ← Change to 5001, 8000, etc.

# Change admin credentials (do this for production!)
ADMIN_DEFAULT_EMAIL=admin@jit.com          # ← Change email
ADMIN_DEFAULT_PASSWORD=admin123456         # ← Change password

# Change JWT secret (do this for production!)
JWT_SECRET=your_super_secret_jwt_key       # ← Use a random secret

# Change database
MONGO_URI=mongodb://localhost:27017/jit-complaint-box
# ↑ Or your MongoDB Atlas URL
```

---

## 📊 What Gets Stored Where

| Data | Location | Format |
|------|----------|--------|
| Complaints | MongoDB `complaints` collection | JSON documents |
| Admin user | MongoDB `admins` collection | JSON documents |
| JWT token | Browser localStorage | String |
| Configuration | `.env` file | Key-value pairs |

---

## 🔒 Important Security Notes

⚠️ **Before Production:**
1. Change `JWT_SECRET` in `.env` to a random string
2. Change `ADMIN_DEFAULT_PASSWORD` to something secure
3. Use HTTPS (not just HTTP)
4. Don't commit `.env` to version control
5. Use environment variables for secrets

---

## 📞 Need Help?

1. **Check the documentation**
   - Read relevant .md file
   - Look for similar issue

2. **Check error messages**
   - Read what the error says
   - Search that error online

3. **Check the terminal**
   - Frontend errors show in browser console (F12)
   - Backend errors show in terminal

4. **Check MongoDB**
   - Verify it's running
   - Verify connection string is correct
   - Verify database exists

---

## ✨ Success Indicators

You'll know everything is working when:

✅ Frontend loads at localhost:3000  
✅ Backend responds at localhost:5000/api/health  
✅ Can submit a complaint  
✅ Complaint appears in MongoDB  
✅ Can login as admin  
✅ Can see complaint in admin dashboard  
✅ Can change complaint status  
✅ No error messages in console  

---

## 🎓 Learning Resources

If you want to understand the code:

1. **React Docs**: https://react.dev
2. **TypeScript Docs**: https://www.typescriptlang.org
3. **Express Docs**: https://expressjs.com
4. **MongoDB Docs**: https://docs.mongodb.com
5. **Tailwind CSS**: https://tailwindcss.com

---

## 🚀 Production Deployment Tips

When you're ready to deploy:

1. Use MongoDB Atlas (cloud)
2. Deploy backend to Heroku, Railway, or similar
3. Deploy frontend to Vercel, Netlify
4. Use environment variables for secrets
5. Set up HTTPS certificates
6. Enable database backups
7. Set up monitoring/logs
8. Test thoroughly before going live

---

## ✅ Final Verification

Before declaring success, verify:

- [ ] Application loads
- [ ] Can submit complaint
- [ ] Data saved to database
- [ ] Admin can login
- [ ] Admin can view complaints
- [ ] Admin can update status
- [ ] Responsive on mobile
- [ ] No console errors

---

## 🎉 You're All Set!

Once all checks pass, you have a fully functional:
- ✅ Frontend React application
- ✅ Backend Express API
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Complete complaint system

**Happy coding!** 🚀

---

**Last Updated**: December 9, 2025  
**For Questions**: See documentation files or check browser console/terminal for errors
