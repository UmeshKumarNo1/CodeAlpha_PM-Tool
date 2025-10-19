const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Task = require('../models/Task');

// Create comment
router.post('/', auth, async (req, res) => {
  try {
    const { text, task, attachments } = req.body;
    const comment = await Comment.create({
      text,
      task,
      author: req.user.id,
      attachments: attachments || []
    });

    // Add comment to task
    await Task.findByIdAndUpdate(task, { $push: { comments: comment._id } });

    await comment.populate('author', 'name email');

    // Notify via socket
    const { io } = require('../server');
    const taskDoc = await Task.findById(task);
    io.to(taskDoc.project.toString()).emit('commentCreated', comment);

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments by task
router.get('/task/:taskId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ task: req.params.taskId })
      .populate('author', 'name email')
      .populate('replies')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single comment
router.get('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('author', 'name email')
      .populate('replies');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update comment
router.put('/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    comment.text = text;
    await comment.save();
    await comment.populate('author', 'name email');
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Task.findByIdAndUpdate(comment.task, { $pull: { comments: req.params.id } });
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like comment
router.post('/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.likes.includes(req.user.id)) {
      comment.likes.push(req.user.id);
    } else {
      comment.likes = comment.likes.filter(id => id.toString() !== req.user.id);
    }
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
