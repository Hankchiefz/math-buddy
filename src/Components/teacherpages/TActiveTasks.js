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
        // Get the access token from local storage
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token is missing");
        }

        // Send the POST request to the API
        const response = await fetch("https://mathbuddyapi.com/getTeachQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }), // Sending the token in the body
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
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

  const handleCreateClassClick = () => {
    navigate("/tnewquiz"); // Navigate to the TNewClass component
  };

  // Handle the approve action
  const handleApprove = async (className, quizId) => {
    setIsSubmitting(true); // Show loading overlay
    try {
      // Get the access token from local storage
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Access token is missing");
      }

      // Send the POST request to the API to assign the quiz
      const response = await fetch("https://mathbuddyapi.com/assign_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          class_name: className,
          quiz_id: quizId,
        }), // Sending class_name and quiz_id to assign the quiz
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Refresh the quizzes after assignment
      const updatedData = await response.json();
      setQuizzesByClass(updatedData); // Update state with assigned data
    } catch (error) {
      console.error("Assignment error:", error); // Optional: Handle errors if needed
    } finally {
      setIsSubmitting(false); // Hide loading overlay
      window.location.reload(); // Reload the page after assignment
    }
  };

  // Helper function to filter quizzes based on their status
  const filterQuizzesByStatus = (status) => {
    const filteredQuizzes = {};
    Object.keys(quizzesByClass).forEach((className) => {
      const quizzes = quizzesByClass[className];

      // Ensure quizzes is an array
      if (Array.isArray(quizzes)) {
        const filtered = quizzes.filter((quiz) => quiz.active === status);

        if (filtered.length > 0) {
          filteredQuizzes[className] = filtered;
        }
      } else {
        console.warn(
          `Expected quizzes to be an array but got ${typeof quizzes}`
        );
      }
    });
    return filteredQuizzes;
  };

  // Get quizzes by status
  const activeQuizzes = filterQuizzesByStatus("Active");
  const notActiveQuizzes = filterQuizzesByStatus("Not Active");
  const completeQuizzes = filterQuizzesByStatus("Complete");

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
              {title === "Not Active Quizzes" && <th>Actions</th>}{" "}
              {/* Add Actions column for Not Active quizzes */}
              {title === "Active Quizzes" && <th>Completion %</th>}{" "}
              {/* Add Completion % column for Active quizzes */}
              {title === "Completed Quizzes" && <th>Average Score</th>}{" "}
              {/* Add Average Score column for Completed quizzes */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(quizzes).map(([className, quizzes], classIndex) =>
              quizzes.map((quiz, quizIndex) => (
                <tr key={`${classIndex}-${quizIndex}`} className="TQtable-row">
                  <td>
                    <div className="color"></div>
                  </td>
                  <td>{className}</td>
                  <td>{quiz.title}</td>
                  {title === "Active Quizzes" && (
                    <td>{quiz.completion_percentage.toFixed(2)}%</td> // Display completion percentage for active quizzes
                  )}
                  {title === "Completed Quizzes" && (
                    <td>
                      {typeof quiz.average_score === "string"
                        ? parseFloat(quiz.average_score).toFixed(2)
                        : "N/A"}
                    </td> // Convert average_score to number and display, or 'N/A' if not valid
                  )}
                  {title === "Not Active Quizzes" && (
                    <td>
                      <button
                        onClick={() => handleApprove(className, quiz.quiz_id)}
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
      {/* Top navbar */}
      <div className="TQcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
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
              {/* Active Quizzes */}
              {renderQuizTable(activeQuizzes, "Active Quizzes")}

              {/* Not Active Quizzes */}
              {renderQuizTable(notActiveQuizzes, "Not Active Quizzes")}

              {/* Completed Quizzes */}
              {renderQuizTable(completeQuizzes, "Completed Quizzes")}
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
