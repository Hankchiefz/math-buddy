import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../homepagestyle/Signup.css';

const Signup = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [fullName, setFullName] = useState(''); // State for full name
  const [email, setEmail] = useState(''); // State for email
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [error, setError] = useState(''); // State for error messages
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength display
  const [loading, setLoading] = useState(false); // State for loading status

  // Function to handle navigation to teacher signup
  const handleTeacherClick = () => {
    navigate('/teacher-signup');
  };

  // Function to evaluate password strength based on criteria
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W]/.test(password)) strength++;

    // Return password strength as a string based on criteria matched
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

  // Function to handle password input changes and update password strength
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  // Function to handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous error
    setLoading(true); // Set loading to true

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Stop loading
      return;
    }

    // Construct user data for signup
    const userData = {
      email,
      password,
      full_name: fullName,
      phone
    };

    try {
      // API call for signup
      const response = await fetch('https://mathbuddyapi.com/signupStu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // If signup is successful, redirect to login page
      if (response.ok) {
        localStorage.setItem('showRegisterPopup', 'true'); // Set flag for popup display
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
      <h1>Sign up!</h1>
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
        <button type="button" className="teacher-button" onClick={handleTeacherClick}>
          Teacher? Click here!
        </button>
      </form>
    </div>
  );
};

export default Signup;
