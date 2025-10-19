# 📋 PM Tool - Professional Project Management Platform

A full-fledged, responsive project management application built with modern web technologies. Organize, track, and collaborate on projects efficiently with real-time updates and intuitive UI.

## ✨ Key Features

### 🎯 Multi-Page Application
- **Home** - Landing page with feature showcase
- **Dashboard** - Project statistics and overview
- **Projects** - Create and manage multiple projects
- **Board** - Kanban-style task management (To Do → In Progress → Completed)
- **Profile** - User profile and account settings
- **About** - Platform information and FAQ

### 📱 Fully Responsive Design
- Mobile-first approach (works on all devices)
- Smooth animations and transitions
- Professional UI with modern color scheme
- Touch-friendly interface

### 🔄 Real-time Collaboration
- Socket.io integration for live updates
- Instant task notifications
- Real-time team collaboration
- Live project synchronization

### 🔐 Secure Authentication
- User registration and login
- JWT token-based authentication
- Secure password hashing
- Session persistence

### 📊 Project Management
- Create and organize projects
- Assign team members
- Track project progress
- Set priorities and deadlines
- Add comments and collaborate

## 🏗️ Architecture

```
Frontend (React)          Backend (Node.js)         Database (MongoDB)
├── Home                  ├── Auth Routes           ├── Users
├── Dashboard             ├── Project Routes        ├── Projects
├── Projects              ├── Task Routes           ├── Tasks
├── Board                 ├── Comment Routes        └── Comments
├── Profile               ├── Auth Middleware
└── About                 └── Socket.io Server
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router 6, Axios, Socket.io Client |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT + bcryptjs |
| **Styling** | CSS3 with responsive design |

## 📦 Installation & Setup

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm/yarn

### Quick Start

1. **Clone and navigate:**
```bash
cd project-management-app
```

2. **Backend Setup:**
```bash
cd backend
npm install
# Create .env file with MongoDB URI and JWT secret
npm start
```

3. **Frontend Setup (new terminal):**
```bash
cd frontend
npm install
npm start
```

4. **Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

## 🔑 Demo Credentials

- **Email:** demo@example.com
- **Password:** demo123

Or create a new account by clicking "Create new account"

## 📱 Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 480px - 768px
- **Desktop:** > 768px

## 🎨 UI Features

- Gradient headers with navigation
- Card-based layouts with hover effects
- Form validation and error handling
- Alert notifications (success, error, warning, info)
- Loading spinners and states
- Modal dialogs
- Kanban board with drag-friendly design
- Priority badges and status indicators
- Responsive grid system

## 🔌 API Endpoints

**Auth:** POST /register, /login | GET /me | PUT /profile
**Projects:** GET /, POST /, GET /:id, PUT /:id, DELETE /:id
**Tasks:** GET /project/:id, POST /, PUT /:id, DELETE /:id
**Comments:** GET /task/:id, POST /, PUT /:id, DELETE /:id

## 🚀 Deployment

**Frontend:** Vercel, Netlify, or GitHub Pages
**Backend:** Heroku, Railway, or AWS

## 📝 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/ (Home, Dashboard, Projects, Board, Profile, About, Login)
│   │   ├── App.js (Router setup)
│   │   ├── api.js (Axios configuration)
│   │   └── styles.css (Comprehensive responsive styles)
│   └── public/index.html
│
├── backend/
│   ├── models/ (User, Project, Task, Comment)
│   ├── routes/ (auth, projects, tasks, comments)
│   ├── middleware/ (JWT authentication)
│   ├── server.js (Express + Socket.io)
│   └── .env (Configuration)
```

## 🎯 Next Steps

1. Set up MongoDB connection
2. Configure JWT secret in .env
3. Run both servers
4. Create an account or use demo credentials
5. Start managing projects!

---

**Built with ❤️ for efficient project management**
