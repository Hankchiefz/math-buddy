import React from 'react';
import { Link } from 'react-router-dom';
import './Feedbackbox.css';

const Quizbox = ({ status, title, dueDate, timeLimit, marks }) => {
  return (
    <div className="feedbackbox">
      <div className={`status ${status === 'incomplete' ? 'incomplete' : 'complete'}`}>
        {status === 'incomplete' ? '✕' : '✓'}
      </div>
      <div className="feedbackbox-info">
        <h3 className="title">{title}</h3>
        <div className="details">
          <span className="due-date">Completed at: {dueDate}</span>
          <span className="marks">Marks: {marks}</span>
        </div>
      </div>
      <Link to="/studentquizcomplete" className="feedback-button">
        Feedback
      </Link>
    </div>
  );
};

export default Quizbox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */