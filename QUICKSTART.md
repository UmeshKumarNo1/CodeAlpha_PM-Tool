# 🚀 Quick Start Guide

## Prerequisites
- Node.js v14+
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn

## Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/pm_app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start backend server:
```bash
npm start
```

Expected output:
```
Server listening on 4000
Mongo connected
```

## Step 2: Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 3: Login or Register

### Option A: Use Demo Account
- Email: demo@example.com
- Password: demo123

### Option B: Create New Account
1. Click "Create new account"
2. Fill in name, email, and password
3. Click "Create Account"

## Step 4: Start Using the App

### Dashboard
- View project statistics
- See recent projects
- Quick access to all features

### Projects
- Click "+ New Project" to create a project
- View all your projects
- Click on a project to manage tasks

### Board
- View tasks in Kanban columns (To Do, In Progress, Completed)
- Click "+ New Task" to add tasks
- Click tasks to move them between columns
- Set priority and assign tasks

### Profile
- Update your profile information
- View account settings
- See member since date

### About
- Learn about the platform
- View technology stack
- Read FAQ

## 🎨 Features Overview

### Real-time Updates
- Tasks update instantly across all connected users
- Socket.io enables live collaboration

### Responsive Design
- Works on mobile, tablet, and desktop
- Optimized for all screen sizes
- Touch-friendly interface

### Project Management
- Create unlimited projects
- Assign team members
- Track task progress
- Add comments and collaborate

### Security
- JWT authentication
- Secure password hashing
- Protected API endpoints

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Verify .env file exists with correct MONGO_URI
- Check port 4000 is not in use

### Frontend won't start
- Delete node_modules and package-lock.json
- Run `npm install` again
- Check port 3000 is not in use

### Can't connect to backend
- Verify backend is running on port 4000
- Check CORS is enabled
- Verify API_BASE_URL in frontend/src/api.js

### MongoDB connection error
- Ensure MongoDB is running
- Check connection string in .env
- For MongoDB Atlas, whitelist your IP

## 📚 API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
PUT /api/auth/profile
```

### Projects
```
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id
```

### Tasks
```
GET /api/tasks/project/:projectId
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

### Comments
```
GET /api/comments/task/:taskId
POST /api/comments
PUT /api/comments/:id
DELETE /api/comments/:id
```

## 🎯 Next Steps

1. Create your first project
2. Add team members
3. Create tasks and assign them
4. Add comments and collaborate
5. Track progress on the dashboard

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the main README.md
3. Check browser console for errors
4. Check terminal output for backend errors

---

**Happy Project Managing! 🎉**

