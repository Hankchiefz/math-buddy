import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader'; // Correct header import
import TeacherSNav from '../objects/TeacherSNav';
import RecentlyAccessedBox from '../objects/RecentlyAccessedBox'; // Import Recently Accessed Component
import TaskBox from '../objects/TaskBox';
import { useNavigate } from 'react-router-dom';
import '../teacherstyle/TeacherHomepage.css';

const TeacherHome = () => {
  const [fullName, setFullName] = useState('');
  const [quizzes, setQuizzes] = useState([]); // State to hold the quiz data
  const [recentlyAccessed, setRecentlyAccessed] = useState([]); // State to hold recently accessed items

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the full name from localStorage
    const storedName = localStorage.getItem('full_name');
    if (storedName) {
      setFullName(storedName);
    }

    // Fetch quizzes for the teacher
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://mathbuddyapi.com/getTeachQuiz', {
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
        setQuizzes(data); // Store all quizzes data
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();

    // Load recently accessed items from localStorage
    const loadRecentlyAccessed = () => {
      try {
        const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
        setRecentlyAccessed(storedRecentlyAccessed.slice(0, 3)); // Limit to the latest 3
      } catch (error) {
        console.error("Error loading recently accessed items:", error);
      }
    };

    loadRecentlyAccessed();
  }, []);

  const handleNavigation = (page, label) => {
    console.log(`Navigating to: ${page}, ${label}`);

    // Update recently accessed items
    const newItem = { page, label };
    setRecentlyAccessed(prevItems => {
      const updatedItems = [newItem, ...prevItems.filter(item =>
        item.page !== newItem.page || item.label !== newItem.label
      )].slice(0, 3); // Limit stored items to the latest 3

      // Save to localStorage
      try {
        localStorage.setItem('recentlyAccessed', JSON.stringify(updatedItems));
        console.log("Saved recently accessed items:", updatedItems);
      } catch (error) {
        console.error("Error saving recently accessed items:", error);
      }

      return updatedItems;
    });

    // Navigate to the desired page
    navigate(page);
  };

  const handleClassesButton = () => {
    handleNavigation('/teacherclasses', 'Classes');
  };

  const handleLessonsButton = () => {
    handleNavigation('/teacherlessons', 'Lessons');
  };

  const handleFeedbackButton = () => {
    handleNavigation('/tfeedback', 'Feedback');
  };

  return (
    <div className="teacherhome-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="THcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="THmain-content">
          <div className="THhome-message">
            <div className="THwelcome-message">Welcome {fullName}</div>
            <div className="THactive-message">Active Quizzes</div>
          </div>
          <div className="THMain-Container">
            <div className="THbutton-container">
              <button
                type="button"
                className="THB THClassesButton"
                onClick={handleClassesButton}
              >
                <img src="/images/home/classes-icon.png" alt="Classes Icon" className="THbutton-icon" />
                Classes
              </button>
              <button
                type="button"
                className="THB THLessonsButton"
                onClick={handleLessonsButton}
              >
                <img src="/images/home/lessons-icon.png" alt="Lessons Icon" className="THbutton-icon" />
                Lessons
              </button>
              <button
                type="button"
                className="THB THFeedbackButton"
                onClick={handleFeedbackButton}
              >
                <img src="/images/home/feedback-icon.png" alt="Feedback Icon" className="THbutton-icon" />
                Feedback
              </button>
            </div>

            {/* Task Box Section */}
            <div className="THTaskbox-Container">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <TaskBox
                    key={quiz.quiz_id}
                    title={quiz.title}
                    task={`Completion: ${quiz.completion_percentage}%`}
                  />
                ))
              ) : (
                <p>No active quizzes available.</p>
              )}
            </div>

            {/* Recently Accessed Section */}
            <div className="THrecently-accessed-container">
              <div className="THmessage-recently">Recently Accessed</div>
              {recentlyAccessed.length > 0 ? (
                recentlyAccessed.map((item, index) => (
                  <RecentlyAccessedBox
                    key={index}
                    iconColor="#FFA07A"
                    text={item.label}
                    onClick={() => handleNavigation(item.page, item.label)} // Use handleNavigation on click
                  />
                ))
              ) : (
                <p>No recently accessed pages.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
