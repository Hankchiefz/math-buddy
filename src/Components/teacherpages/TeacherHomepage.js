// src/Components/teacherpages/TeacherHome.js
import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader'; // Correct header import
import TeacherSNav from '../objects/TeacherSNav';
import { useNavigate } from 'react-router-dom';
import RecentlyAccessedBox from '../objects/RecentlyAccessedBox';
import TaskBox from '../objects/TaskBox';
import '../teacherstyle/TeacherHomepage.css';

const TeacherHome = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Fetch the full name from localStorage
    const storedName = localStorage.getItem('full_name');
    if (storedName) {
      setFullName(storedName);
    }
  }, []);

  const navigate = useNavigate();

  const handleClassesButton = () => {
    navigate('/teacherclasses'); // Navigate to the classes page
  };

  const handleLessonsButton = () => {
    navigate('/teacherlessons'); // Navigate to the lessons page
  };

  const handleFeedbackButton = () => {
    navigate('/tfeedback'); // Navigate to the feedback page
  };

  return (
    <div className="teacherhome-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="THcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="THmain-content">
          <div className="THhome-message">
            <div className="THwelcome-message"> Welcome {fullName} </div> 
            <div className="THactive-message"> Active Quizzes </div> 
          </div>
          <div className="THMain-Container">
            <div className="THbutton-container">
              <button
                type="button"
                className="THB THClassesButton"
                onClick={handleClassesButton} // Navigate to Classes
              >
                <img src="/images/home/classes-icon.png" alt="Classes Icon" className="THbutton-icon" />
                Classes
              </button>
              <button
                type="button"
                className="THB THLessonsButton"
                onClick={handleLessonsButton} // Navigate to Lessons
              >
                <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="THbutton-icon" />
                Lessons
              </button>
              <button
                type="button"
                className="THB THFeedbackButton"
                onClick={handleFeedbackButton} // Navigate to Feedback
              >
                <img src="/images/home/feedback-icon.png" alt="Feedback Icon" className="THbutton-icon" />
                Feedback
              </button>
            </div>
            <div className="THrecently-accessed-container">
              <div className="THmessage-recently">Recently Accessed</div>
              <div className="THRAB recently-accessed-box1">
                <RecentlyAccessedBox iconColor="#FFA07A" text="Class 4B" />
              </div>
            </div>
          </div>
          <div className="THTaskbox-Container">
            <TaskBox title="Class 4b" task="Task: Assignment - Addition & Subtraction" dueDate="Dec 16th, 2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
