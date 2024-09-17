import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TClassFeedback.css";

const TClassFeedback = () => {
  const navigate = useNavigate();

  // State to hold feedback data and loading status
  const [feedbackData, setFeedbackData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedback data on component mount
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          "https://mathbuddyapi.com/teacherFeedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleDetailsClick = () => {
    navigate("/teacher/TClassFeedback");
  };

  // Format average score as a percentage
  const formatPercentage = (score) => (score !== null ? Math.round(score) : 0);

  // Format due date to show only the date
  const formatDueDate = (dueDate) => {
    if (!dueDate) return "";
    const date = new Date(dueDate);
    return date.toLocaleDateString(); // Default to user's locale date format
  };

  // Render feedback tables for each class
  const renderFeedbackTable = (feedbacks, title) => (
    <div className="feedback-table-container">
      <h2>Feedback for {title}</h2> {/* Updated heading */}
      <hr />
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Average Grade (%)</th>
              <th>Close Date</th>{" "}
              {/* Changed from "Close Date/Time" to "Close Date" */}
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((quiz) => (
              <tr key={quiz.quiz_id} className="feedback-table-row">
                <td>{quiz.title}</td>
                <td>{formatPercentage(quiz.average_score)}%</td>
                <td>{formatDueDate(quiz.due_date)}</td>{" "}
                {/* Use formatted date */}
                <td>
                  <button
                    className="feedback-details-button"
                    onClick={handleDetailsClick}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="teacher-feedback-container">
      <StudentHeader />
      <div className="teacher-feedback-content">
        <TeacherSNav />
        <div className="teacher-feedback-main-content">
          {Object.keys(feedbackData).length > 0 ? (
            Object.entries(feedbackData).map(
              ([className, quizzes]) => renderFeedbackTable(quizzes, className) // Pass className as the title
            )
          ) : (
            <p>No feedback available.</p>
          )}
          <button
            className="feedback-create-button"
            onClick={handleDetailsClick}
          >
            Create Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default TClassFeedback;
