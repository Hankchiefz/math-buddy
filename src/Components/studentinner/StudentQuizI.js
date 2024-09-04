import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import '../studentstyle/StudentQuizI.css';

const StudentQuizI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const quizId = location.state.quizId; // Assuming the quiz ID is passed from the previous page

        const response = await fetch('https://mathbuddyapi.com/current_quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, quiz_id: quizId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [location.state.quizId]);

  const handleNextButtonClick = () => {
    // Submit the answers and navigate to StudentQuizComplete on click
    navigate('/studentquizcomplete');
  };

  const handleLeaveButtonClick = () => {
    // Show a confirmation pop-up
    const confirmLeave = window.confirm('Are you sure you want to leave the quiz? Your progress may not be saved.');
    if (confirmLeave) {
      // Navigate to the student homepage if the user confirms leaving
      navigate('/studentquiz');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (!quizData) {
    return <div>Error loading quiz data.</div>; // Handle errors or no data
  }

  return (
    <div className="studentquiz-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SQIcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SQImain-content">
          <h1 className="quiz-message">Quiz</h1>
          <div className="question-container">
            {quizData.questions.map((question, index) => (
              <div key={question.question_id} className={`question q-${index + 1}`}>
                <p>{`Q${index + 1}. ${question.question_text}`}</p>
                <form className="answer-form">
                  <input type="text" name={`answer${index + 1}`} placeholder="Enter your answer" />
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* Question-box Section */}
        <div className="Question-box">
          <div className="header-box">Quiz Navigation</div>
          <div className="SQI-questionsbox">
            {quizData.questions.map((_, index) => (
              <div key={index} className={`SQI${index + 1}`}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="next-button">
  <button type="button" className="next-btn" onClick={handleNextButtonClick}>Submit</button>
  <button type="button" className="leave-btn" onClick={handleLeaveButtonClick}>Leave</button>
</div>

      </div>
    </div>
  );
};

export default StudentQuizI;
