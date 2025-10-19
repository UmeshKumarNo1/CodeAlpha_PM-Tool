const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, project, assignee, priority, dueDate, tags } = req.body;
    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      priority: priority || 'medium',
      dueDate,
      tags: tags || [],
      createdBy: req.user.id,
      status: 'todo'
    });

    // Add task to project
    await Project.findByIdAndUpdate(project, { $push: { tasks: task._id } });

    // Notify via socket
    const { io } = require('../server');
    io.to(project.toString()).emit('taskCreated', task);

    await task.populate('assignee', 'name email');
    await task.populate('createdBy', 'name email');
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tasks by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single task
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name email' }
      });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, status, priority, assignee, dueDate, estimatedHours, actualHours, tags } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, assignee, dueDate, estimatedHours, actualHours, tags },
      { new: true }
    )
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');

    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Notify via socket
    const { io } = require('../server');
    io.to(task.project.toString()).emit('taskUpdated', task);

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await Project.findByIdAndUpdate(task.project, { $pull: { tasks: req.params.id } });
    await Task.findByIdAndDelete(req.params.id);

    const { io } = require('../server');
    io.to(task.project.toString()).emit('taskDeleted', req.params.id);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
