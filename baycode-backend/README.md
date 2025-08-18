# Bay Code Backend

This is the backend server for the Bay Code application, providing user authentication and data management.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and update the values:
```bash
cp env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/baycode
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `baycode`

#### Option B: MongoDB Atlas (Cloud) - **RECOMMENDED**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Admin (User Management)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get specific user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get user statistics
- `GET /api/admin/search` - Search users

### Test
- `GET /api/hello` - Test endpoint

## Features
- User registration and login
- JWT-based authentication
- MongoDB data persistence
- Guild assignment system
- Password hashing with bcrypt
- **Admin dashboard for user management**
- **Real-time user statistics**
- **User search and filtering**

## Admin Dashboard

Access your admin dashboard at: `http://localhost:3000/admin.html`

### Admin Dashboard Features:
- **User Overview**: View all registered users
- **Statistics**: Total users, guild distribution, respect points
- **User Management**: Edit, delete, and search users
- **Guild Analytics**: See how users are distributed across guilds
- **Real-time Updates**: Auto-refresh every 30 seconds

### How to Access:
1. Start your backend server
2. Open `admin.html` in your browser
3. View all user data from your MongoDB Atlas cluster

## Cross-Device Access
✅ Users can sign up on one device and sign in on another  
✅ No IP address restrictions  
✅ JWT tokens work from any device  
✅ Global user database accessible from anywhere  
✅ Admin dashboard accessible from any device  

## Security Notes
- Admin routes currently have no authentication (for development)
- In production, implement proper admin role checking
- Consider adding rate limiting for admin endpoints
- Use environment variables for sensitive configuration 