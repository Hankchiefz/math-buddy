import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie library
import '../homepagestyle/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const url = 'https://mathbuddyapi.com/login';
    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { access_token, personObj } = await response.json();

        // Store the access token and user info in cookies
        Cookies.set('authToken', access_token, { expires: 7 }); // Expires in 7 days
        Cookies.set('userInfo', JSON.stringify(personObj), { expires: 7 });

        // Navigate to the student home page
        navigate('/studenthome');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('There was an error during login');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // Direct navigation functions
  const goToStudentHome = () => {
    navigate('/studenthome');
  };

  const goToTeacherHome = () => {
    navigate('/teacherhomepage');
  };

  return (
    <div className="login-page">
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
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      {/* Additional Buttons for Direct Navigation */}
      <div className="additional-buttons">
        <button onClick={goToStudentHome} className="login-button">
          Go to Student Home
        </button>
        <button onClick={goToTeacherHome} className="login-button">
          Go to Teacher Home
        </button>
      </div>
    </div>
  );
};

export default Login;
