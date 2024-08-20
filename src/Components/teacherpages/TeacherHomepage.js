// src/Components/studentpages/StudentClasses.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import RecentlyAccessedBox from '../objects/RecentlyAccessedBox';
import TaskBox from '../objects/TaskBox';
import '../teacherstyle/TeacherHomepage.css';

const TeacherHome = () => {
  return (
    <div className="teacherhome-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="THcontent-wrapper">
        <TeacherSNav />  {/* Side navbar */}
        <div className="THmain-content">
          <div className="THhome-message">
            <div className="THwelcome-message"> Welcome Ms. Valerie Frizzle </div> 
            <div className="THactive-message"> Active Quizzes </div> 
          </div>
          <div className="THMain-Container">
            <div className="THbutton-container">
              <button type="button" className="THB THQuizButton">
                <img src="/images/home/classes-icon.png" alt="Classes Icon" className="THbutton-icon" />
                Classes
              </button>
              <button type="button" className="THB THLessonsButton">
                <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="THbutton-icon" />
                Lessons
              </button>
              <button type="button" className="THB THFeedbackButton">
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
