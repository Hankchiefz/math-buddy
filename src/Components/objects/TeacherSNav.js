import React from 'react';
import { Link } from 'react-router-dom';
import './TeacherSNav.css';

const TeacherSNav = () => {
  return (
    <div className="teacher-sidebar">
      <Link to="/teacherhomepage" className="teacher-menu-link">
        <div className="teacher-menu-icon">
        </div>
      </Link>

      <Link to="/teacherhomepage" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/dashboard-icon.png" alt="Dashboard Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-dash-text">Dashboard</span>
        </div>
      </Link>

      <Link to="/Tclasses" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/classes-icon.png" alt="Classes Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-classes-text">Classes</span>
        </div>
      </Link>

      <Link to="/TActiveTasks" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/quizzes-orange.png" alt="Quizzes Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-quizzes-text">Quizzes</span>
        </div>
      </Link>

      <Link to="/teacherlessons" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/lessons-purple.png" alt="Lessons Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-lessons-text">Lessons</span>
        </div>
      </Link>

      <Link to="/tfeedback" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/feedback-green.png" alt="Feedback Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-feedback-text">Feedback</span>
        </div>
      </Link>

      <Link to="/tprofile" className="teacher-nav-link">
        <div className="teacher-nav-item">
          <img src="/images/home/profile-icon.png" alt="Profile Icon" className="teacher-nav-icon" />
          <span className="teacher-nav-dash-text">Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default TeacherSNav;
