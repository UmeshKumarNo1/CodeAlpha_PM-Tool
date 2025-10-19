const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  dueDate: { type: Date, default: null },
  estimatedHours: { type: Number, default: 0 },
  actualHours: { type: Number, default: 0 },
  attachments: [String],
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TaskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
