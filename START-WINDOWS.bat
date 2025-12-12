@echo off
REM JIT Complaint Box - Quick Start Script for Windows

echo.
echo ====================================================
echo   JIT Complaint Box - Complete System Setup
echo ====================================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detected
echo.

REM Install root dependencies
echo Installing frontend dependencies...
call npm install >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

REM Install server dependencies
echo Installing backend dependencies...
cd server
call npm install >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..

echo.
echo ====================================================
echo   Configuration Check
echo ====================================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo ⚠ .env file not found. Creating with defaults...
    (
        echo # Server Configuration
        echo PORT=5000
        echo NODE_ENV=development
        echo.
        echo # Database
        echo MONGO_URI=mongodb://localhost:27017/jit-complaint-box
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
        echo.
        echo # Default Admin Credentials
        echo ADMIN_DEFAULT_EMAIL=admin@jit.com
        echo ADMIN_DEFAULT_PASSWORD=admin123456
        echo.
        echo # Frontend
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env
    echo ✓ .env file created with default values
) else (
    echo ✓ .env file already exists
)

echo.
echo ====================================================
echo   Prerequisites
echo ====================================================
echo.
echo Before starting, please ensure:
echo.
echo 1. MongoDB is running:
echo    - Local: mongod command
echo    - Cloud: MongoDB Atlas (update MONGO_URI in .env)
echo.
echo 2. Ports are available:
echo    - Frontend: 3000
echo    - Backend: 5000
echo.

echo ====================================================
echo   Starting Servers
echo ====================================================
echo.
echo 🚀 Starting Backend Server (Port 5000)...
echo    Terminal will open in a new window
start "JIT Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak

echo 🚀 Starting Frontend Server (Port 3000)...
echo    Terminal will open in a new window
start "JIT Frontend Server" cmd /k "npm run dev"

echo.
echo ====================================================
echo   ✅ STARTUP COMPLETE
echo ====================================================
echo.
echo 📍 Access the application at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000/api/health
echo.
echo 🔐 Admin Login:
echo    Email:    admin@jit.com
echo    Password: admin123456
echo.
echo 📚 Documentation:
echo    - DATABASE_CONNECTION_GUIDE.md
echo    - IMPLEMENTATION_COMPLETE.md
echo    - TESTING_GUIDE.md
echo.
echo Press any key to close this window...
pause >nul
