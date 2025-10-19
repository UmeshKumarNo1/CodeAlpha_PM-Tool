import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ totalProjects: 0, totalTasks: 0, completedTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data.slice(0, 6));
      
      // Calculate stats
      const totalProjects = response.data.length;
      const totalTasks = response.data.reduce((sum, p) => sum + (p.tasks?.length || 0), 0);
      const completedTasks = response.data.reduce((sum, p) => 
        sum + (p.tasks?.filter(t => t.status === 'completed').length || 0), 0
      );
      
      setStats({ totalProjects, totalTasks, completedTasks });
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Dashboard</h2>
        <p>Welcome back, {user?.name}!</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalProjects}</div>
            <div className="stat-label">Total Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completedTasks}</div>
            <div className="stat-label">Completed Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Recent Projects</h3>
            <Link to="/projects" className="btn btn-primary">View All</Link>
          </div>

          {projects.length === 0 ? (
            <div className="alert alert-info">
              No projects yet. <Link to="/projects">Create your first project</Link>
            </div>
          ) : (
            <div className="grid">
              {projects.map(project => (
                <div key={project._id} className="card">
                  <div className="card-header">{project.name}</div>
                  <div className="card-body">
                    <p>{project.description}</p>
                    <p><strong>Tasks:</strong> {project.tasks?.length || 0}</p>
                    <p><strong>Status:</strong> <span className="badge badge-primary">{project.status}</span></p>
                  </div>
                  <div className="card-footer">
                    <Link to={`/projects/${project._id}`} className="btn btn-sm btn-primary">View</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

