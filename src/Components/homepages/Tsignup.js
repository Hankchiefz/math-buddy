import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../homepagestyle/Tsignup.css'; // Assuming you have a CSS file for the signup page

const Tsign = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W]/.test(password)) strength++;

    if (strength === 1) {
      return 'Very Weak';
    } else if (strength === 2) {
      return 'Weak';
    } else if (strength === 3) {
      return 'Medium';
    } else if (strength === 4) {
      return 'Strong';
    } else if (strength === 5) {
      return 'Very Strong';
    } else {
      return '';
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Stop loading
      return;
    }

    const userData = {
      email,
      password,
      full_name: fullName,
      phone
    };

    try {
      const response = await fetch('https://mathbuddyapi.com/signupTeach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        localStorage.setItem('showRegisterPopup', 'true'); // Set flag to show popup after registration
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <h1>Teacher Sign up!</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
          Password Strength: {passwordStrength}
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};

export default Tsign;
