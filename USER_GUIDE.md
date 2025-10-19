# 👤 User Guide - PM Tool

## Getting Started

### Step 1: Access the Application
1. Open your browser
2. Go to: **http://localhost:3000**
3. You'll see the PM Tool home page

### Step 2: Login or Register

#### Option A: Use Demo Account
1. Click on the login form
2. Enter:
   - Email: `demo@example.com`
   - Password: `demo123`
3. Click "Login"

#### Option B: Create New Account
1. Click "Create new account"
2. Fill in:
   - Full Name
   - Email Address
   - Password
3. Click "Create Account"
4. You'll be logged in automatically

---

## 📊 Dashboard Tour

### What You'll See
- **Statistics Cards** showing:
  - Total Projects
  - Total Tasks
  - Completed Tasks
  - Completion Rate (%)

- **Recent Projects** grid showing your latest projects

### What You Can Do
- Click "View All" to see all projects
- Click on a project card to view its tasks
- Navigate to other sections using the top menu

---

## 📁 Projects Page

### Creating a Project
1. Click "Projects" in the navigation menu
2. Click "+ New Project" button
3. Fill in:
   - **Project Name** (required)
   - **Description** (optional)
   - **Status** (Active, On Hold, or Completed)
4. Click "Create Project"

### Managing Projects
- **View**: Click on a project card to see its tasks
- **Delete**: Click the "Delete" button on a project card
- **Status**: See the project status badge
- **Members**: See how many team members are in the project

### Project Information
Each project shows:
- Project name
- Description
- Number of tasks
- Status badge
- Creation date
- Action buttons

---

## 📋 Board (Kanban)

### Understanding the Board
The board has three columns:
- **📋 To Do** - Tasks not started
- **⚙️ In Progress** - Tasks being worked on
- **✅ Completed** - Finished tasks

### Creating a Task
1. Select a project from the left sidebar
2. Click "+ New Task" button
3. Fill in:
   - **Task Title** (required)
   - **Description** (optional)
   - **Priority** (Low, Medium, High)
4. Click "Create Task"

### Managing Tasks
- **Move Tasks**: Click on a task to move it to the next column
  - To Do → In Progress → Completed → To Do (cycles)
- **View Details**: Click on a task to see full information
- **Priority**: Tasks show priority badges (color-coded)
- **Assignee**: See who the task is assigned to

### Task Information
Each task displays:
- Task title
- Description
- Priority level (with color)
- Assigned person
- Creation date

---

## 👤 Profile Page

### Viewing Your Profile
1. Click "Profile" in the navigation menu
2. You'll see:
   - Your avatar (initials)
   - Your name
   - Your email
   - Member since date

### Editing Your Profile
1. Scroll down to "Edit Profile" section
2. Update any of these fields:
   - **Full Name**
   - **Email**
   - **Phone**
   - **Bio**
3. Click "Save Changes"
4. You'll see a success message

### Account Settings
View your account information:
- Account Status (Active)
- Last Login date
- Two-Factor Authentication status

---

## ℹ️ About Page

### What's Here
- Platform mission and vision
- Key features overview
- Technology stack information
- FAQ section
- Contact information

### FAQ Topics
- Is PM Tool free?
- Can I invite team members?
- Is my data secure?
- Do you offer API access?

---

## 🏠 Home Page

### Features Showcase
The home page displays:
- Welcome message
- Feature cards (6 main features)
- Call-to-action buttons
- Quick navigation

### Features Highlighted
1. 📊 Project Management
2. ✅ Task Tracking
3. 💬 Collaboration
4. 📈 Analytics
5. 🔔 Real-time Updates
6. 👥 Team Collaboration

---

## 🔐 Logout

### How to Logout
1. Click the "Logout" button in the top-right corner
2. You'll be redirected to the login page
3. Your session will be cleared

---

## 💡 Tips & Tricks

### Navigation
- Use the top menu to navigate between pages
- Click on project cards to view tasks
- Use the back button to return to previous pages

### Task Management
- Click tasks to move them between columns
- Use priority levels to organize work
- Assign tasks to team members

### Real-time Updates
- Changes appear instantly for all users
- No need to refresh the page
- See live updates from team members

### Mobile Usage
- The app works perfectly on mobile
- Touch-friendly buttons and forms
- Responsive layout adapts to screen size

### Keyboard Shortcuts
- Tab: Navigate between form fields
- Enter: Submit forms
- Escape: Close modals (if implemented)

---

## 🐛 Troubleshooting

### Can't Login
- Check your email and password
- Make sure Caps Lock is off
- Try creating a new account

### Tasks Not Showing
- Refresh the page
- Make sure you selected a project
- Check browser console for errors

### Changes Not Saving
- Check your internet connection
- Verify the backend is running
- Try again in a few seconds

### Page Won't Load
- Refresh the page (Ctrl + R)
- Clear browser cache
- Check if both servers are running

---

## 🎯 Common Workflows

### Workflow 1: Create and Track a Project
1. Go to Projects page
2. Click "+ New Project"
3. Enter project details
4. Go to Board
5. Select your project
6. Create tasks
7. Move tasks through columns
8. Check Dashboard for progress

### Workflow 2: Collaborate on Tasks
1. Go to Board
2. Select a project
3. Create a task
4. Assign it to a team member
5. Add comments (if available)
6. Track progress
7. Mark as completed

### Workflow 3: Monitor Progress
1. Go to Dashboard
2. Check statistics
3. View recent projects
4. Click on a project to see tasks
5. Check completion rate
6. Update task status

---

## 📱 Mobile Tips

### Responsive Design
- The app adapts to your screen size
- Touch-friendly buttons
- Optimized spacing for mobile

### Mobile Navigation
- Menu items stack vertically
- Easier to tap buttons
- Scrollable content

### Mobile Forms
- Large input fields
- Easy to type
- Clear labels

---

## 🔄 Real-time Features

### Live Updates
- See tasks update instantly
- No need to refresh
- Real-time collaboration

### Notifications
- Get notified of new tasks
- See when tasks are updated
- Instant team communication

---

## 📞 Need Help?

### Resources
- Check README.md for detailed documentation
- See QUICKSTART.md for quick setup
- Review FEATURES.md for complete features list
- Check RUNNING.md for troubleshooting

### Common Issues
- Backend not running? Start it with `npm start` in backend folder
- Frontend not loading? Check if port 3000 is available
- Database error? Verify MongoDB is running

---

**Happy Project Managing! 🎉**

**For more information, see the documentation files in the project root.**

