const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  status: { type: String, enum: ['active', 'on-hold', 'completed'], default: 'active' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
