require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/pm_app';

// Connect to MongoDB with retry logic
let dbConnected = false;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully');
    dbConnected = true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Using in-memory database for development');
    dbConnected = false;
    // Don't retry - use in-memory mode
  }
};

connectDB();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
  });
  socket.on('taskUpdated', (data) => {
    // broadcast to project room
    io.to(data.project).emit('taskUpdated', data);
  });
});

app.get('/', (req, res) => res.send('Project Management API'));

server.listen(PORT, ()=>console.log('Server listening on', PORT));
module.exports = { io };
