import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Board from './components/Board';
import Profile from './components/Profile';
import About from './components/About';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleLogin = ({ token, user }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (!token) {
    return (
      <Router>
        <div>
          <div className="header">
            <h1>📋 PM Tool</h1>
            <div className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <div className="header">
          <h1>📋 PM Tool</h1>
          <div className="nav-menu">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/board" className="nav-link">Board</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/about" className="nav-link">About</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Board user={user} />} />
          <Route path="/board" element={<Board user={user} />} />
          <Route path="/profile" element={<Profile user={user} onUpdate={handleUserUpdate} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}
