import React from 'react';
import './ClassBox.css';

const ClassesBox = ({ icon, title, time, topics, tasks }) => {
  return (
    <div className="classes-box">
      <div className="class-info">
        <div className="class-icon">{icon}</div>
        <div className="class-details">
          <h3 className="class-title">{title}</h3>
          <p className="class-time">{time}</p>
        </div>
      </div>
      <div className="class-stats">
        <div className="stat-item">
          <h4>Topics</h4>
          <p>{topics}</p>
        </div>
        <div className="stat-item">
          <h4>Quiz</h4>
          <p>{tasks}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassesBox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */