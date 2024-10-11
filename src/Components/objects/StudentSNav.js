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
          <span className="student-nav-dash-text">Dashboard</span>
        </div>
      </Link>
      
      <Link to="/studentLessons" className="student-nav-link">
        <div className="student-nav-item student-classes">
          <img src="/images/home/lessons-purple.png" alt="Lessons Icon" className="student-nav-icon" />
          <span className="student-nav-lessons-text">Lessons</span>
        </div>
      </Link>
      
      <Link to="/studentquiz" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/quizzes-orange.png" alt="Quizzes Icon" className="student-nav-icon" />
          <span className="student-nav-quizzes-text">Quizzes</span>
        </div>
      </Link>
      
      <Link to="/studentfeedback" className="student-nav-link">
        <div className="student-nav-item">
          <img src="/images/home/feedback-green.png" alt="Feedback Icon" className="student-nav-icon" />
          <span className="student-nav-feedback-text">Feedback</span>
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
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */