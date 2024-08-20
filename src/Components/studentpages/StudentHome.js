// src/Components/studentpages/StudentClasses.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import { useNavigate } from 'react-router-dom';
import RecentlyAccessedBox from '../objects/RecentlyAccessedBox';
import TaskBox from '../objects/TaskBox';
import '../studentstyle/StudentHome.css';

const StudentHome = () => {
  const navigate = useNavigate();

  const handleQuizButton = () => {
    navigate('/studentquiz'); // Navigate to the quiz page
  };

  const handleLessonsButton = () => {
    navigate('/studentLessons'); // Navigate to the lessons page
  };

  const handleFeedbackButton = () => {
    navigate('/studentfeedback'); // Navigate to the feedback page
  };

  return (
    <div className="studenthome-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SHcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SHmain-content">
          <div className="home-message">
            <div className="SHwelcome-message"> Welcome Olivia Bennet </div> 
            <div className="SHactive-message"> Active Quizzes </div> 
          </div>
          <div className="SHMain-Container">
            <div className="SHbutton-container">
              <button
                type="button"
                className="SHB SHQuizButton"
                onClick={handleQuizButton} // Navigate to Quizzes
              >
                <img src="/images/home/quizzes-icon.png" alt="Quizzes Icon" className="SHbutton-icon" />
                Quizzes
              </button>
              <button
                type="button"
                className="SHB SHLessonsButton"
                onClick={handleLessonsButton} // Navigate to Lessons
              >
                <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="SHbutton-icon" />
                Lessons
              </button>
              <button
                type="button"
                className="SHB SHFeedbackButton"
                onClick={handleFeedbackButton} // Navigate to Feedback
              >
                <img src="/images/home/feedback-icon.png" alt="Feedback Icon" className="SHbutton-icon" />
                Feedback
              </button>
            </div>
            <div className="recently-accessed-container">
              <div className="message-recently">Recently Accessed</div>
              <div className="RAB recently-accessed-box1">
                <RecentlyAccessedBox iconColor="#FFA07A" text="Quiz: Fun Wordy Math" />
              </div>
            </div>
          </div>
          <div className="SHTaskbox-Container">
            <TaskBox title="Class 4b" task="Task: Assignment - Addition & Subtraction" dueDate="Dec 16th, 2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
