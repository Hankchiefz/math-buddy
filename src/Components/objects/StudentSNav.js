// src/Components/objects/StudentSNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentSNav.css';

const StudentSNav = () => {
  return (
    <div className="student-sidebar">
      <Link to="/studenthome" className="student-menu-link">
        <div className="student-menu-icon">
        </div>
      </Link>
      
      <Link to="/studenthome" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/dashboard-icon.png" alt="Dashboard Icon" className="student-nav-icon" />
          <span className="student-nav-text">Dashboard</span>
        </div>
      </Link>
      
      <Link to="/studentLessons" className="student-nav-link">
        <div className="student-nav-item student-classes">
          <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="student-nav-icon" />
          <span className="student-nav-text">Lessons</span>
        </div>
      </Link>
      
      <Link to="/studentquiz" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/quizzes-icon.png" alt="Quizzes Icon" className="student-nav-icon" />
          <span className="student-nav-text">Quizzes</span>
        </div>
      </Link>
      
      <Link to="/studentfeedback" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/feedback-icon.png" alt="Feedback Icon" className="student-nav-icon" />
          <span className="student-nav-text">Feedback</span>
        </div>
      </Link>
      
      <Link to="/studentprofile" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/profile-icon.png" alt="Profile Icon" className="student-nav-icon" />
          <span className="student-nav-text">Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default StudentSNav;
