import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css'; // Import the new CSS file

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setMessage('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setMessage('Logging in...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        login(result.token);
        setMessage('Login successful! Redirecting...');
        navigate('/admin');
      } else {
        setMessage(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const getMessageClass = () => {
    if (message.includes('successful')) {
      return 'login-message message-success';
    } else if (message.includes('Error') || message.includes('failed')) {
      return 'login-message message-error';
    }
    return 'login-message';
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p className={getMessageClass()}>{message}</p>}
    </div>
  );
}