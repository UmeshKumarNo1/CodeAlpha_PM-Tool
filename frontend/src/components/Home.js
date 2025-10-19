import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="hero">
        <h2>Welcome to PM Tool</h2>
        <p>Organize, track, and collaborate on projects efficiently</p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="btn btn-primary btn-lg">Get Started</Link>
          <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
        </div>
      </div>

      <div className="container">
        <div className="grid">
          <div className="card">
            <div className="card-header">📊 Project Management</div>
            <div className="card-body">
              Create and manage multiple projects with ease. Organize your work and keep track of all your initiatives in one place.
            </div>
          </div>

          <div className="card">
            <div className="card-header">✅ Task Tracking</div>
            <div className="card-body">
              Break down projects into tasks, assign them to team members, and track progress in real-time with our intuitive board.
            </div>
          </div>

          <div className="card">
            <div className="card-header">💬 Collaboration</div>
            <div className="card-body">
              Comment on tasks, share updates, and communicate with your team members directly within the platform.
            </div>
          </div>

          <div className="card">
            <div className="card-header">📈 Analytics</div>
            <div className="card-body">
              Get insights into your project progress with detailed statistics and performance metrics.
            </div>
          </div>

          <div className="card">
            <div className="card-header">🔔 Real-time Updates</div>
            <div className="card-body">
              Stay updated with real-time notifications when tasks are created, updated, or completed.
            </div>
          </div>

          <div className="card">
            <div className="card-header">👥 Team Collaboration</div>
            <div className="card-body">
              Invite team members, assign roles, and work together seamlessly on shared projects.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3>Ready to get started?</h3>
          <p>Sign up or log in to access your projects</p>
          <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

