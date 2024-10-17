import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LessonCollapsibleBox.css'; 
import Quizbox from './QuizBox'; 

const LessonCollapsibleBox = ({ title, introduction, quizData, video, gameLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

    const handleOpenQuiz = () => {
        navigate('/studentquizi', { state: { quizId: quizData.quizId } });
    };

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lesson-collapsible-box">
      <div className="lesson-collapsible-header" onClick={toggleBox}>
        <h3 className="lesson-collapsible-title">{title}</h3>
        <span className={`lesson-collapsible-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="lesson-collapsible-content">
          <div className="lesson-section lesson-introduction">{introduction}</div>
         
          <div className="lesson-section lesson-quizbox">
            <Quizbox 
              quizId={quizData.quizId}
              status={quizData.status}
              title={quizData.title}
              dueDate={quizData.dueDate}
              timeLimit={quizData.timeLimit}
              marks={quizData.marks}
              onOpenQuiz={handleOpenQuiz}
            />
          </div>
          <div className="lesson-section lesson-video">
            {video}
          </div>
          <div className="lesson-section lesson-game-link">
  <a href={gameLink} target="_blank" rel="noopener noreferrer" className="lesson-action-button">
    Play Game
  </a>
</div>

        </div>
      )}
    </div>
  );
};

export default LessonCollapsibleBox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */