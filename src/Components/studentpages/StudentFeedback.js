// src/Components/studentpages/StudentFeedback.js
import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import '../studentstyle/StudentFeedback.css';
import FeedbackBox from '../objects/Feedbackbox';

const StudentFeedback = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // State to hold completed quizzes

  useEffect(() => {
    // Fetch quizzes once the component mounts
    const fetchCompletedQuizzes = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://mathbuddyapi.com/getStudentCompletedQuizzes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCompletedQuizzes(data); // Store completed quizzes data
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchCompletedQuizzes(); // Call the function to fetch completed quizzes
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="studentfeedback-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SFcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SFmain-content">
          <h1 className="Feedback-message">Feedback</h1>

          <div className="SFMain-Container">
            <div className="Feedback-box">
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map(quiz => (
                  <div key={quiz.quiz_id} className="FeedBox1">
                    <FeedbackBox
                      status="complete"
                      title={quiz.quiz_title}
                      dueDate={new Date(quiz.completed_at).toLocaleDateString()}
                      marks={quiz.score || 'Not graded'}
                    />
                  </div>
                ))
              ) : (
                <p>No completed quizzes available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
