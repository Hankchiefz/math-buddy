import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TActiveTasks.css";

const TActiveTasks = () => {
  const navigate = useNavigate();

  // State to hold quiz data
  const [quizzesByClass, setQuizzesByClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading overlay

  // Fetch quizzes when the component loads
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Access token is missing");
        }

        const response = await fetch("https://mathbuddyapi.com/getTeachQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }), // Sending the token in the body
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setQuizzesByClass(data); // Update state with fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Hide loading spinner when data is fetched
      }
    };

    fetchQuizzes();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Handle quiz click for not active quizzes
  const handleQuizClick = (quizId) => {
    navigate("/TQuizEdit", { state: { quizId } }); // Navigate to TQuizEdit with quizId
  };

  // Render a table for each quiz type
  const renderQuizTable = (quizzes, title) => (
    <div className="TQtable-container">
      <h2>{title}</h2>
      <hr />
      {Object.keys(quizzes).length === 0 ? (
        <p>No {title.toLowerCase()} quizzes.</p>
      ) : (
        <table className="TQtasks-table">
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Quiz Name</th>
              {title === "Not Active Quizzes" && <th>Actions</th>}
              {title === "Active Quizzes" && <th>Completion %</th>}
              {title === "Completed Quizzes" && <th>Average Score</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(quizzes).map(([className, quizzes], classIndex) =>
              quizzes.map((quiz, quizIndex) => (
                <tr
                  key={`${classIndex}-${quizIndex}`}
                  className="TQtable-row"
                  onClick={() =>
                    title === "Not Active Quizzes" &&
                    handleQuizClick(quiz.quiz_id)
                  }
                >
                  <td>
                    <div className="color"></div>
                  </td>
                  <td>{className}</td>
                  <td>{quiz.title}</td>
                  {title === "Active Quizzes" && (
                    <td>{quiz.completion_percentage.toFixed(2)}%</td>
                  )}
                  {title === "Completed Quizzes" && (
                    <td>
                      {typeof quiz.average_score === "string"
                        ? parseFloat(quiz.average_score).toFixed(2)
                        : "N/A"}
                    </td>
                  )}
                  {title === "Not Active Quizzes" && (
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event from firing
                          handleApprove(className, quiz.quiz_id); // Handle approval if needed
                        }}
                        className="approve-button"
                      >
                        Approve
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="teacherquiz-container">
      <StudentHeader />
      <div className="TQcontent-wrapper">
        <TeacherSNav />
        <div className="TQmain-content">
          {(loading || isSubmitting) && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {renderQuizTable(quizzesByClass.activeQuizzes, "Active Quizzes")}
              {renderQuizTable(
                quizzesByClass.notActiveQuizzes,
                "Not Active Quizzes"
              )}
              {renderQuizTable(
                quizzesByClass.completeQuizzes,
                "Completed Quizzes"
              )}
            </>
          )}
          <button
            className="TQcreate-quiz-button"
            onClick={handleCreateClassClick}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default TActiveTasks;
