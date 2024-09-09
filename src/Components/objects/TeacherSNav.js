// src/Components/objects/StudentSNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TeacherSNav.css';

const StudentSNav = () => {
  return (
    <div className="sidebar">
      <Link to="/teacherhomepage" className="menu-link">
        <div className="menu-icon">
        
        </div> {/* Menu icon */}
      </Link>
      
      <Link to="/teacherhomepage" className="nav-link">
        <div className="nav-item">
          <img src="/images/home/dashboard-icon.png" alt="Dashboard Icon" className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </div>
      </Link>
      
      <Link to="/Tclasses" className="nav-link">
        <div className="nav-item classes">
          <img src="/images/home/classes-icon.png" alt="Classes Icon" className="nav-icon" />
          <span className="nav-text">Classes</span>
        </div>
      </Link>
      
      <Link to="/TActiveTasks" className="nav-link">
        <div className="nav-item">
          <img src="/images/home/quizzes-icon.png" alt="Quizzes Icon" className="nav-icon" />
          <span className="nav-text">Quizzes</span>
        </div>
      </Link>
      
      <Link to="/teacherlessons" className="nav-link">
        <div className="nav-item">
          <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="nav-icon" />
          <span className="nav-text">Lessons</span>
        </div>
      </Link>
      
      <Link to="/tfeedback" className="nav-link">
        <div className="nav-item">
          <img src="/images/home/feedback-icon.png" alt="Feedback Icon" className="nav-icon" />
          <span className="nav-text">Feedback</span>
        </div>
      </Link>
      
      <Link to="/tprofile" className="nav-link">
        <div className="nav-item">
          <img src="/images/home/profile-icon.png" alt="Profile Icon" className="nav-icon" />
          <span className="nav-text">Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default StudentSNav;
