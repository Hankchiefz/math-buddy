// src/Components/studentpages/StudentQuiz.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import '../studentstyle/StudentQuiz.css';
import Quizbox from '../objects/QuizBox';

const StudentQuiz = () => {
  return (
    <div className="studentquiz-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SQcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SQmain-content">
          <h1 className="Quiz-message">Quizzes</h1>
          {/* Your classes content goes here */}

          <div className="SQMain-Container">
            <div className="SQQuiz-box">
              <Link to="/studentquizi" className="quiz-link"> {/* Link to StudentQuizI */}
                <div className="QuizBox1">
                  <Quizbox
                    status="incomplete"
                    title="Quiz - Fun wordy math"
                    dueDate="11/12/24"
                    timeLimit="30 Minutes"
                    marks="20"
                  />
                </div>
              </Link>
              <div className="QuizBox2">
                <Quizbox
                  status="complete"
                  title="Quiz - Fun wordy math"
                  dueDate="11/12/24"
                  timeLimit="30 Minutes"
                  marks="20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;