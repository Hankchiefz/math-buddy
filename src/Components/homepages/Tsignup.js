// src/components/pages/Tsign.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../homepagestyle/Tsignup.css"; // Reuse the same styles if applicable

const Tsign = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success message
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup submission
  const handleSignup = (e) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success message

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const url = "https://mathbuddyapi.com/signup"; // Assuming signup route
    const data = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccess("Sign-up successful!");
          // Redirect to login page
          navigate("/login");
        } else {
          setError(data.message || "Sign-up failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("There was an error!", error);
        setError("There was an error during sign-up");
      });
  };

  return (
    <div className="signup-page">
      <h1>Teacher Sign up!</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Tsign;
