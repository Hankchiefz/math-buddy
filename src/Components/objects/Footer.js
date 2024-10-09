// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for the footer

// Import the logo images


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">MathBuddy - 2024. Developed by Rhianan Williams, Lachlan Angelis, Nathan Suryadi, MD Zuhayer Aousaf, RD Rahul Dharamdasani</p>
        <div className="footer-logos">
          <img src="/images/home/Mathbuddylogo.png" alt="Mathbuddy logo" className="footer-logo" /> 
          <img src="/images/home/uow_logo.png" alt="UOW logo" className="footer-logo" /> 
          <img src="/images/home/React-logo.png" alt="React logo" className="footer-logo" /> 
          <img src="/images/home/MySQL-logo.png" alt="MySQL logo" className="footer-logo" /> 
          <img src="/images/home/google_cloud_logo.png" alt="Google Cloud logo" className="footer-logo" /> 
          <img src="/images/home/aws_logo.png" alt="AWS logo" className="footer-logo" /> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
