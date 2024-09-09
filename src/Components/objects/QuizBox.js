import React from 'react';
import './QuizBox.css';

const Quizbox = ({ quizId, status, title, dueDate, timeLimit, marks, onOpenQuiz }) => {
  return (
    <div className="quizbox">
      <div className={`status ${status === 'incomplete' ? 'incomplete' : 'complete'}`}>
        {status === 'incomplete' ? '✕' : '✓'}
      </div>
      <div className="quiz-info">
        <h3 className="title">{title}</h3>
        <div className="details">
          <span className="due-date">Due Date: {dueDate}</span>
          <span className="time-limit">Time Limit: {timeLimit}</span>
          <span className="marks">Marks: {marks}</span>
        </div>
      </div>
      <button className="OpenQuiz-button" onClick={() => onOpenQuiz(quizId)}>
        Open Quiz
      </button>
    </div>
  );
};

export default Quizbox;
