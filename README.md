# JIT Complaint Box

A modern, full-stack web application for managing student complaints and feedback at JIT (Jaipur Institute of Technology). Students can submit complaints anonymously or with their name, while administrators can review, categorize, and track the resolution status.

---

## 📋 Overview

JIT Complaint Box is a complaint management system designed to streamline the process of handling student grievances. It provides a user-friendly interface for students to submit complaints and a comprehensive dashboard for administrators to manage and resolve them.

**Key Highlights:**
- 🎓 Student-friendly complaint submission
- 🔐 Anonymous submission support
- 👨‍💼 Admin dashboard with filtering and status tracking
- 📱 Fully responsive design
- ⚡ Real-time updates
- 🔒 JWT-based authentication

---

## ✨ Features

### Student Side
- **Easy Complaint Submission**
  - Simple, intuitive form with required and optional fields
  - Title, description, and category selection
  - Anonymous or named submission option
  - Form validation and error handling

- **Categorized Complaints**
  - Hostel issues
  - Academic concerns
  - Infrastructure problems
  - Administrative matters
  - Other issues

- **Thank You Confirmation**
  - Success message after submission
  - Option to submit another complaint
  - Privacy assurance message

### Admin Side
- **Secure Login**
  - Email and password authentication
  - JWT token-based sessions
  - Automatic token refresh and expiry handling

- **Complaint Dashboard**
  - View all submitted complaints
  - Filter by status (Open, In Progress, Resolved)
  - Filter by category
  - Real-time status updates

- **Complaint Management**
  - Update complaint status
  - View full complaint details
  - Track submission date and time
  - Identify submitter (name or anonymous)

- **Protected Routes**
  - Admin-only access control
  - Automatic redirection for unauthenticated users
  - Secure logout functionality

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Additional styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Tools & Libraries
- **Git** - Version control
- **npm/yarn** - Package management
- **PostCSS** - CSS processing
- **ts-node** - TypeScript execution

---

## 📦 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Proojectt
   ```

2. **Install Dependencies**
   
   For the entire project:
   ```bash
   npm install
   ```

   For frontend only:
   ```bash
   cd src && npm install
   ```

   For backend only:
   ```bash
   cd server && npm install
   ```

3. **Set Up Environment Variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB**
   - Start MongoDB locally or use MongoDB Atlas
   - Update `MONGO_URI` in `.env`

5. **Start the Application**
   
   Development mode (both frontend and backend):
   ```bash
   npm run dev
   ```

   Or separately:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/jit-complaint-box

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Default Admin Credentials (for seeding)
ADMIN_DEFAULT_EMAIL=admin@jit.com
ADMIN_DEFAULT_PASSWORD=admin123456
```

### Frontend (.env or .env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

**Important Security Notes:**
- ⚠️ Never commit `.env` files to version control
- 🔐 Use strong, unique secrets in production
- 🔄 Rotate secrets regularly
- 📝 Keep sensitive data out of logs

---

## 📜 Scripts

### Frontend Scripts
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Scripts
```bash
# Development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Project Root Scripts
```bash
# Install all dependencies
npm install

# Start both frontend and backend
npm run dev
```

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string, admin: { id, email, name } }`

### Complaints (Public)
- `POST /api/complaints` - Create complaint
  - Body: `{ title, description, category?, studentName?, isAnonymous? }`
  - Response: `{ complaint: Complaint }`

### Complaints (Admin Only - Protected)
- `GET /api/complaints/admin` - Get all complaints
  - Query: `?status=Open&category=Hostel`
  - Response: `{ complaints: Complaint[], count: number }`

- `PATCH /api/complaints/admin/:id/status` - Update complaint status
  - Body: `{ status: "Open" | "In Progress" | "Resolved" }`
  - Response: `{ complaint: Complaint }`

### Health Check
- `GET /health` - Server health check
  - Response: `{ status: "ok" }`

---

## 📁 Project Structure

```
Proojectt/
├── src/                          # Frontend source
│   ├── components/
│   │   └── RequireAdmin.tsx      # Protected route wrapper
│   ├── pages/
│   │   ├── StudentComplaintPage.tsx
│   │   ├── ThankYouPage.tsx
│   │   ├── AdminLoginPage.tsx
│   │   └── AdminDashboard.tsx
│   ├── styles/                   # Component-specific CSS
│   ├── api/                      # API helpers
│   │   ├── axiosInstance.ts
│   │   ├── authApi.ts
│   │   └── complaintApi.ts
│   ├── index.css                 # Tailwind & base styles
│   └── main.tsx                  # Application entry point
│
├── server/                       # Backend source
│   ├── src/
│   │   ├── api/                  # API utilities
│   │   ├── components/           # Reusable logic
│   │   ├── config/               # Configuration files
│   │   │   └── seedAdmin.ts      # Database seeding
│   │   ├── controllers/          # Request handlers
│   │   │   ├── authController.ts
│   │   │   └── complaintController.ts
│   │   ├── middleware/           # Express middleware
│   │   │   └── authMiddleware.ts
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── Admin.ts
│   │   │   └── Complaint.ts
│   │   ├── routes/               # Express routes
│   │   │   ├── authRoutes.ts
│   │   │   └── complaintRoutes.ts
│   │   ├── types/                # TypeScript types
│   │   ├── index.ts              # Server entry point
│   │   └── server.ts             # Express app setup
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── main.tsx                      # Root entry point
├── package.json
├── tsconfig.json
└── README.md                     # This file
```

---

## 🔐 Authentication Flow

1. **Admin Login**
   - Admin enters email and password
   - Backend validates credentials against Admin model
   - Password is compared using bcryptjs
   - JWT token generated with 1-day expiry
   - Token stored in localStorage

2. **Protected Routes**
   - RequireAdmin component checks localStorage for token
   - Token attached to API requests via Axios interceptor
   - Backend verifies token signature and expiry
   - 401 Unauthorized if token invalid or expired

3. **Logout**
   - Token removed from localStorage
   - Admin redirected to login page

---

## 🗄 Database Schema

### Admin Collection
```typescript
{
  _id: ObjectId,
  email: string (unique, lowercase),
  passwordHash: string (bcrypt hashed),
  name: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Collection
```typescript
{
  _id: ObjectId,
  title: string (required),
  description: string (required),
  category: "Hostel" | "Academics" | "Infrastructure" | "Administration" | "Other",
  studentName?: string,
  isAnonymous: boolean,
  status: "Open" | "In Progress" | "Resolved",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Manual Testing Checklist

**Student Side:**
- [ ] Submit complaint with all fields
- [ ] Submit complaint with anonymous option
- [ ] Form validation errors display
- [ ] Success message shows after submission
- [ ] Redirect to thank you page works
- [ ] Can submit another complaint

**Admin Side:**
- [ ] Login with correct credentials
- [ ] Login error with wrong credentials
- [ ] Dashboard loads complaints
- [ ] Filter by status works
- [ ] Filter by category works
- [ ] Update complaint status works
- [ ] Status changes reflect immediately
- [ ] Logout redirects to login page
- [ ] Accessing dashboard without token redirects to login

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variables in deployment platform
4. Configure API URL for production

### Backend Deployment (Heroku/Railway/Render)
1. Build TypeScript: `npm run build`
2. Set environment variables in deployment platform
3. Start with: `npm start`
4. Ensure MongoDB connection string is accessible

---

## 🔄 Future Improvements

### Short Term
- [ ] Email notifications to admin on new complaint
- [ ] Email status updates to students (with tracking code)
- [ ] Advanced search and sorting options
- [ ] Complaint attachments/file uploads
- [ ] Admin comments on complaints
- [ ] Complaint statistics and analytics dashboard

### Medium Term
- [ ] Two-factor authentication (2FA)
- [ ] Complaint resolution timeline
- [ ] Department-specific routing
- [ ] Automated escalation if not resolved within timeframe
- [ ] SMS notifications
- [ ] Mobile app (React Native)

### Long Term
- [ ] AI-powered complaint categorization
- [ ] Sentiment analysis for complaints
- [ ] Predictive analytics for issue trends
- [ ] Integration with student management system
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Real-time notifications using WebSockets

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Support & Contact

For support, email: support@jit-complaint-box.com

---

## 🙏 Acknowledgments

- JIT (Jaipur Institute of Technology) for the use case
- React and Express communities
- MongoDB documentation
- Tailwind CSS framework

---

**Built with ❤️ for JIT Community**

Last Updated: December 3, 2025
