import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import RecentlyAccessedBox from '../objects/RecentlyAccessedBox';
import TaskBox from '../objects/TaskBox';
import { useNavigate } from 'react-router-dom';
import '../teacherstyle/TeacherHomepage.css';

const TeacherHome = () => {
  const [fullName, setFullName] = useState('');
  const [quizzesByClass, setQuizzesByClass] = useState({});
  const [recentlyAccessed, setRecentlyAccessed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('full_name');
    if (storedName) {
      setFullName(storedName);
    }

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
        setQuizzesByClass(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();

    const loadRecentlyAccessed = () => {
      try {
        const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
        setRecentlyAccessed(storedRecentlyAccessed.slice(0, 3));
      } catch (error) {
        console.error("Error loading recently accessed items:", error);
      }
    };

    loadRecentlyAccessed();
  }, []);

  const handleNavigation = (page, label) => {
    const newItem = { page, label };
    const updatedItems = [newItem, ...recentlyAccessed.filter(item =>
      item.page !== newItem.page || item.label !== newItem.label
    )];
    const limitedItems = updatedItems.slice(0, 3);

    setRecentlyAccessed(limitedItems);

    try {
      localStorage.setItem('recentlyAccessed', JSON.stringify(limitedItems));
    } catch (error) {
      console.error("Error saving recently accessed items:", error);
    }

    switch (page) {
      case '/teacherclasses':
      case '/teacherlessons':
      case '/tfeedback':
      case '/tprofile':
      case '/TActiveTasks':
        navigate(page);
        break;
      default:
        console.error('Invalid navigation path:', page);
        break;
    }
  };

  const handleClassesButton = () => handleNavigation('/teacherclasses', 'Classes');
  const handleLessonsButton = () => handleNavigation('/teacherlessons', 'Lessons');
  const handleFeedbackButton = () => handleNavigation('/tfeedback', 'Feedback');

  const filterActiveQuizzes = () => {
    const activeQuizzes = {};
    Object.keys(quizzesByClass).forEach((className) => {
      const quizzes = quizzesByClass[className];
      if (Array.isArray(quizzes)) {
        const filteredQuizzes = quizzes.filter((quiz) => quiz.active === 'Active');
        if (filteredQuizzes.length > 0) {
          activeQuizzes[className] = filteredQuizzes;
        }
      }
    });
    return activeQuizzes;
  };

  const activeQuizzes = filterActiveQuizzes();

  return (
    <div className="teacherhome-container">
      <StudentHeader />
      <div className="THcontent-wrapper">
        <TeacherSNav />
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

            <div className="THTaskbox-Container">
              <h2 className="THTaskbox-heading"></h2>
              {error ? (
                <p>Error: {error}</p>
              ) : (
                Object.entries(activeQuizzes).map(([className, quizzes]) =>
                  quizzes.map((quiz, quizIndex) => (
                    <TaskBox
                      key={`${className}-${quizIndex}`}
                      title={`${className}: ${quiz.title}`}
                      task={`Completion: ${quiz.completion_percentage.toFixed(2)}%`}
                      onClick={() => navigate('/TQuizView', { state: { quizId: quiz.quiz_id } })}
                    />
                  ))
                )
              )}
              {Object.keys(activeQuizzes).length === 0 && !loading && (
                <p>No active quizzes available.</p>
              )}
            </div>

            <div className="THrecently-accessed-container">
              <div className="THmessage-recently">Recently Accessed</div>
              {recentlyAccessed.length > 0 ? (
                recentlyAccessed.map((item, index) => (
                  <RecentlyAccessedBox
                    key={index}
                    iconColor="#FFA07A"
                    text={item.label}
                    onClick={() => handleNavigation(item.page, item.label)}
                  />
                ))
              ) : (
                <p>No recently accessed pages.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default TeacherHome;
