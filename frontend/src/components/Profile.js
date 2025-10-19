import React, { useState } from 'react';
import api from '../api';

export default function Profile({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.put('/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
      setError('');
      if (onUpdate) onUpdate(response.data.user);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>My Profile</h2>

        <div className="profile-header">
          <div className="profile-avatar">{getInitials(user?.name)}</div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="card" style={{ maxWidth: '600px' }}>
          <div className="card-header">Edit Profile</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="card" style={{ maxWidth: '600px', marginTop: '24px' }}>
          <div className="card-header">Account Settings</div>
          <div className="card-body">
            <p><strong>Account Status:</strong> <span className="badge badge-success">Active</span></p>
            <p><strong>Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</p>
            <p><strong>Two-Factor Authentication:</strong> <span className="badge badge-primary">Disabled</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

