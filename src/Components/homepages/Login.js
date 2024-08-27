import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../homepagestyle/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    setLoading(true);
    const url = 'https://mathbuddyapi.com/login';
    const data = {
      email: formData.email,
      password: formData.password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        setLoading(false);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Backend response:', data); // Log the response for debugging
        if (data.access_token) {
          // Save the access token and user details (full_name, role)
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('full_name', data.personObj.full_name);
          localStorage.setItem('role', data.personObj.role);

          // Redirect based on the user's role
          if (data.personObj.role === 'student') {
            navigate('/studenthome');
          } else if (data.personObj.role === 'teacher') {
            navigate('/teacherhomepage');
          } else if (data.personObj.role === 'parent') {
            navigate('/parenthomepage'); // Assuming there's a parent home page
          } else {
            setError('Unknown role'); // Handle unknown roles
          }
        } else {
          setError(data.message || 'Invalid email or password');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('There was an error!', error);
        setError('There was an error during login');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Trigger the login process
  };

  return (
    <div className="login-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <h1>Welcome Back</h1>
      <h2>Sign In!</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#forgot-password">Forgot Password?</a>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      {/* Additional Buttons for Direct Navigation */}
      <div className="additional-buttons">
        <button onClick={() => navigate('/studenthome')} className="login-button">
          Go to Student Home
        </button>
        <button onClick={() => navigate('/teacherhomepage')} className="login-button">
          Go to Teacher Home
        </button>
      </div>
    </div>
  );
};

export default Login;
