import React, { useState, useEffect } from 'react';
import api from '../api';
import io from 'socket.io-client';

export default function Board({ user }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => {
    loadProjects();
    const s = io(process.env.REACT_APP_API ? process.env.REACT_APP_API.replace('/api', '') : 'http://localhost:4000');
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
      if (response.data[0]) selectProject(response.data[0]);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const selectProject = async (p) => {
    setSelected(p);
    if (!p) return;
    try {
      const response = await api.get(`/tasks/project/${p._id}`);
      setTasks(response.data);
      if (socket) socket.emit('joinProject', p._id);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!selected) return;
    try {
      const response = await api.post('/tasks', {
        ...newTask,
        project: selected._id,
        status: 'todo'
      });
      setTasks(prev => [response.data, ...prev]);
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowTaskForm(false);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(prev => prev.map(t => t._id === taskId ? response.data : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const renderColumn = (status) => {
    const statusLabels = {
      'todo': '📋 To Do',
      'in-progress': '⚙️ In Progress',
      'completed': '✅ Completed'
    };

    return (
      <div className="column">
        <div className="column-header">{statusLabels[status]}</div>
        {tasks.filter(t => t.status === status).map(t => (
          <div
            key={t._id}
            className="task"
            onClick={() => updateTaskStatus(t._id, status === 'todo' ? 'in-progress' : status === 'in-progress' ? 'completed' : 'todo')}
          >
            <div className="task-title">{t.title}</div>
            <div className="task-description">{t.description}</div>
            <div className="task-meta">
              <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
              <span>{t.assignee?.name || 'Unassigned'}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (!socket || !selected) return;
    socket.on('taskCreated', (t) => {
      if (t.project === selected._id) setTasks(prev => [t, ...prev]);
    });
    socket.on('taskUpdated', (t) => {
      setTasks(prev => prev.map(p => p._id === t._id ? t : p));
    });
    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
    };
  }, [socket, selected]);

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        {error && <div className="alert alert-error">{error}</div>}

        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 250px' }}>
            <h3>Projects</h3>
            <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
              {projects.map(p => (
                <div
                  key={p._id}
                  className="card"
                  onClick={() => selectProject(p)}
                  style={{
                    cursor: 'pointer',
                    borderLeft: selected && selected._id === p._id ? '4px solid #3498db' : '4px solid #bdc3c7'
                  }}
                >
                  <div className="card-header">{p.name}</div>
                  <div className="card-body" style={{ fontSize: '12px' }}>
                    <p>{p.members?.length || 0} members</p>
                    <span className="badge badge-primary">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3>{selected.name}</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowTaskForm(!showTaskForm)}>
                    {showTaskForm ? 'Cancel' : '+ New Task'}
                  </button>
                </div>

                {showTaskForm && (
                  <div className="card" style={{ marginBottom: '16px' }}>
                    <form onSubmit={createTask}>
                      <div className="form-group">
                        <label>Task Title</label>
                        <input
                          type="text"
                          required
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          placeholder="Enter task title"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          placeholder="Enter task description"
                        />
                      </div>
                      <div className="form-group">
                        <label>Priority</label>
                        <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-success btn-block">Create Task</button>
                    </form>
                  </div>
                )}

                <div className="board-columns">
                  {renderColumn('todo')}
                  {renderColumn('in-progress')}
                  {renderColumn('completed')}
                </div>
              </>
            ) : (
              <div className="alert alert-info">Select a project to view tasks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
