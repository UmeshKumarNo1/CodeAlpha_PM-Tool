import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const url = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? { name, email, password } : { email, password };

      const response = await api.post(url, payload);
      onLogin({ token: response.data.token, user: response.data.user });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '420px', margin: '40px auto' }}>
        <div className="card">
          <div className="card-header" style={{ textAlign: 'center', fontSize: '24px' }}>
            {isRegister ? '📝 Create Account' : '🔐 Login'}
          </div>

          <form onSubmit={submit} style={{ padding: '20px' }}>
            {error && <div className="alert alert-error">{error}</div>}

            {isRegister && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login')}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{ marginTop: '12px' }}
            >
              {isRegister ? '✓ Already have an account? Login' : '+ Create new account'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#666' }}>
          <p>Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}
