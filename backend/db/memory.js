// In-memory database for development/testing
// This is a fallback when MongoDB is not available

const crypto = require('crypto');

class MemoryDB {
  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.comments = new Map();
    this.initializeDemoData();
  }

  initializeDemoData() {
    // Create demo user
    const demoUserId = crypto.randomBytes(12).toString('hex');
    // bcrypt hash of 'demo123' with salt rounds 10
    // Generated using: bcrypt.hashSync('demo123', 10)
    this.users.set(demoUserId, {
      _id: demoUserId,
      name: 'Demo User',
      email: 'demo@example.com',
      passwordHash: '$2a$10$woNUBgxeo2A8F0HR5WhqfOw1Z0WgR18JU8bEwnzgjNQHkpbn8Sb0e', // bcrypt hash of 'demo123'
      phone: '+1234567890',
      bio: 'Demo user for testing',
      role: 'admin',
      lastLogin: new Date(),
      isActive: true,
      projects: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create demo project
    const projectId = crypto.randomBytes(12).toString('hex');
    this.projects.set(projectId, {
      _id: projectId,
      name: 'Demo Project',
      description: 'This is a demo project',
      owner: demoUserId,
      members: [demoUserId],
      tasks: [],
      status: 'active',
      priority: 'high',
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      tags: ['demo', 'testing'],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create demo task
    const taskId = crypto.randomBytes(12).toString('hex');
    this.tasks.set(taskId, {
      _id: taskId,
      title: 'Demo Task',
      description: 'This is a demo task',
      project: projectId,
      assignee: demoUserId,
      status: 'todo',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedHours: 8,
      actualHours: 0,
      attachments: [],
      tags: ['demo'],
      createdBy: demoUserId,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Update project with task
    this.projects.get(projectId).tasks.push(taskId);
  }

  // User methods
  findUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  findUserById(id) {
    return this.users.get(id) || null;
  }

  createUser(userData) {
    const id = crypto.randomBytes(12).toString('hex');
    const user = {
      _id: id,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }

  // Project methods
  findProjectById(id) {
    return this.projects.get(id) || null;
  }

  findProjectsByUser(userId) {
    const result = [];
    for (const project of this.projects.values()) {
      if (project.owner === userId || project.members.includes(userId)) {
        result.push(project);
      }
    }
    return result;
  }

  createProject(projectData) {
    const id = crypto.randomBytes(12).toString('hex');
    const project = {
      _id: id,
      ...projectData,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  updateProject(id, updates) {
    const project = this.projects.get(id);
    if (!project) return null;
    const updated = { ...project, ...updates, updatedAt: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  deleteProject(id) {
    return this.projects.delete(id);
  }

  // Task methods
  findTaskById(id) {
    return this.tasks.get(id) || null;
  }

  findTasksByProject(projectId) {
    const result = [];
    for (const task of this.tasks.values()) {
      if (task.project === projectId) {
        result.push(task);
      }
    }
    return result;
  }

  createTask(taskData) {
    const id = crypto.randomBytes(12).toString('hex');
    const task = {
      _id: id,
      ...taskData,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.set(id, task);
    
    // Add task to project
    const project = this.projects.get(taskData.project);
    if (project) {
      project.tasks.push(id);
    }
    
    return task;
  }

  updateTask(id, updates) {
    const task = this.tasks.get(id);
    if (!task) return null;
    const updated = { ...task, ...updates, updatedAt: new Date() };
    this.tasks.set(id, updated);
    return updated;
  }

  deleteTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      const project = this.projects.get(task.project);
      if (project) {
        project.tasks = project.tasks.filter(t => t !== id);
      }
    }
    return this.tasks.delete(id);
  }

  // Comment methods
  findCommentById(id) {
    return this.comments.get(id) || null;
  }

  findCommentsByTask(taskId) {
    const result = [];
    for (const comment of this.comments.values()) {
      if (comment.task === taskId) {
        result.push(comment);
      }
    }
    return result;
  }

  createComment(commentData) {
    const id = crypto.randomBytes(12).toString('hex');
    const comment = {
      _id: id,
      ...commentData,
      likes: [],
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.comments.set(id, comment);
    
    // Add comment to task
    const task = this.tasks.get(commentData.task);
    if (task) {
      task.comments.push(id);
    }
    
    return comment;
  }

  updateComment(id, updates) {
    const comment = this.comments.get(id);
    if (!comment) return null;
    const updated = { ...comment, ...updates, updatedAt: new Date() };
    this.comments.set(id, updated);
    return updated;
  }

  deleteComment(id) {
    const comment = this.comments.get(id);
    if (comment) {
      const task = this.tasks.get(comment.task);
      if (task) {
        task.comments = task.comments.filter(c => c !== id);
      }
    }
    return this.comments.delete(id);
  }

  // Statistics
  getStats(userId) {
    const userProjects = this.findProjectsByUser(userId);
    let totalTasks = 0;
    let completedTasks = 0;

    for (const project of userProjects) {
      for (const taskId of project.tasks) {
        const task = this.tasks.get(taskId);
        if (task) {
          totalTasks++;
          if (task.status === 'completed') {
            completedTasks++;
          }
        }
      }
    }

    return {
      totalProjects: userProjects.length,
      totalTasks,
      completedTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  }
}

// Create singleton instance
const memoryDB = new MemoryDB();

module.exports = memoryDB;

