const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Create project
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, status, priority, tags } = req.body;
    const project = await Project.create({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id],
      status: status || 'active',
      priority: priority || 'medium',
      tags: tags || []
    });
    await project.populate('owner', 'name email');
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }]
    })
      .populate('owner', 'name email')
      .populate('members', 'name email')
      .populate('tasks');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email')
      .populate({
        path: 'tasks',
        populate: [
          { path: 'assignee', select: 'name email' },
          { path: 'createdBy', select: 'name email' }
        ]
      });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { name, description, status, priority, progress, tags } = req.body;
    Object.assign(project, { name, description, status, priority, progress, tags });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Task.deleteMany({ project: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add member to project
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
