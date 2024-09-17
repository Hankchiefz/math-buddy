// src/components/LessonCollapsibleBox.js
import React, { useState } from 'react';
import './LessonCollapsibleBox.css'; // Import the corresponding CSS file
import Quizbox from './QuizBox'; // Import the Quizbox component

const LessonCollapsibleBox = ({ title, introduction, article, quizData, video, gameLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lesson-collapsible-box" onClick={toggleBox}>
      <div className="lesson-collapsible-header">
        <h3 className="lesson-collapsible-title">{title}</h3>
        <span className={`lesson-collapsible-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="lesson-collapsible-content">
          <div className="lesson-section lesson-introduction">{introduction}</div>
          <div className="lesson-section lesson-article">{article}</div>
          <div className="lesson-section lesson-quizbox">
            {/* Render the Quizbox component with the necessary props */}
            <Quizbox 
              quizId={quizData.quizId}
              status={quizData.status}
              title={quizData.title}
              dueDate={quizData.dueDate}
              timeLimit={quizData.timeLimit}
              marks={quizData.marks}
              onOpenQuiz={quizData.onOpenQuiz}
            />
          </div>
          <div className="lesson-section lesson-video">
            {/* Placeholder for embedded video */}
            {video}
          </div>
          <div className="lesson-section lesson-game-link">
            <a href={gameLink} target="_blank" rel="noopener noreferrer">Play Game</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCollapsibleBox;
