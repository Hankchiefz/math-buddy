import React from 'react';
import { Link } from 'react-router-dom';
import './ParentSNav.css';

const ParentSNav = () => {
  return (
    <div className="parent-sidebar">
      <Link to="/parenthome" className="parent-menu-link">
        <div className="parent-menu-icon">
        </div>
      </Link>
      
      <Link to="/parenthome" className="parent-nav-link">
        <div className="parent-nav-item">
          <img src="/images/home/dashboard-icon.png" alt="Dashboard Icon" className="parent-nav-icon" />
          <span className="parent-nav-text">Dashboard</span>
        </div>
      </Link>
      
      <Link to="/parentLessons" className="parent-nav-link">
        <div className="parent-nav-item parent-classes">
          <img src="/images/home/pendingtasks-orange.png" alt="Lessons Icon" className="parent-nav-icon" />
          <span className="parent-nav-pt-text">Pending Tasks</span>
        </div>
      </Link>
      
      <Link to="/parentquiz" className="parent-nav-link">
        <div className="parent-nav-item">
          <img src="/images/home/progressreport-purple.png" alt="Quizzes Icon" className="parent-nav-icon" />
          <span className="parent-nav-pr-text">Progress Report</span>
        </div>
      </Link>
      
      <Link to="/parentfeedback" className="parent-nav-link">
        <div className="parent-nav-item">
          <img src="/images/home/feedback-green.png" alt="Feedback Icon" className="parent-nav-icon" />
          <span className="parent-nav-feedback-text">Feedback</span>
        </div>
      </Link>
      
      <Link to="/parentprofile" className="parent-nav-link">
        <div className="parent-nav-item">
          <img src="/images/home/profile-icon.png" alt="Profile Icon" className="parent-nav-icon" />
          <span className="parent-nav-text">Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default ParentSNav;
