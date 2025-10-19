import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'active' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/projects', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ name: '', description: '', status: 'active' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProjects();
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Projects</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {showForm && (
          <div className="card" style={{ marginBottom: '24px' }}>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter project description"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success btn-block">Create Project</button>
            </form>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="alert alert-info">No projects found. Create your first project!</div>
        ) : (
          <div className="grid">
            {projects.map(project => (
              <div key={project._id} className="card">
                <div className="card-header">{project.name}</div>
                <div className="card-body">
                  <p>{project.description}</p>
                  <p><strong>Tasks:</strong> {project.tasks?.length || 0}</p>
                  <p><strong>Status:</strong> <span className={`badge badge-${project.status === 'active' ? 'success' : 'primary'}`}>{project.status}</span></p>
                  <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/projects/${project._id}`} className="btn btn-sm btn-primary">View</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

