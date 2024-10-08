import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TFeedback.css";

const TFeedback = () => {
  const navigate = useNavigate();

  // State to hold feedback data and loading status
  const [feedbackData, setFeedbackData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Save the "Feedback" page to recently accessed
  useEffect(() => {
    const newItem = { page: "/tfeedback", label: "Feedback" };

    try {
      const storedRecentlyAccessed = JSON.parse(
        localStorage.getItem("recentlyAccessed") || "[]"
      );

      const updatedItems = [
        newItem,
        ...storedRecentlyAccessed.filter(
          (item) => item.page !== newItem.page || item.label !== newItem.label
        ),
      ].slice(0, 5); // Limit stored items to the latest 5

      localStorage.setItem("recentlyAccessed", JSON.stringify(updatedItems));
      console.log("Saved recently accessed items:", updatedItems);
    } catch (error) {
      console.error("Error saving recently accessed items:", error);
    }
  }, []); // Run once when the component mounts

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  // Navigate to TClassFeedback with class_name and quiz_id
  const handleDetailsClick = (class_name, quiz_id, quiz_title) => {
    if (class_name && quiz_id && quiz_title) {
      navigate("/TClassFeedback", {
        state: { class_name, quiz_id, quiz_title },
      });
    } else {
      console.error("Class name, quiz ID, or quiz title is missing");
    }
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
  const renderFeedbackTable = (feedbacks, class_name) => (
    <div className="feedback-table-container" key={class_name}>
      <h2>Feedback for {class_name}</h2>
      <hr />
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Average Grade (%)</th>
              <th>Close Date</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((quiz) => (
              <tr key={quiz.quiz_id} className="feedback-table-row">
                <td>{quiz.title}</td>
                <td>{formatPercentage(quiz.average_score)}%</td>
                <td>{formatDueDate(quiz.due_date)}</td>
                <td>
                  <button
                    className="feedback-details-button"
                    onClick={() =>
                      handleDetailsClick(class_name, quiz.quiz_id, quiz.title)
                    }
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

  // Render the component
  return (
    <div className="teacher-feedback-container">
      <StudentHeader />
      <div className="teacher-feedback-content">
        <TeacherSNav />
        <div className="teacher-feedback-main-content">
          {loading ? (
            // Show loading spinner while data is being fetched
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            // Show error message if there is an error
            <p>Error: {error}</p>
          ) : // Render feedback tables if data is successfully fetched
          Object.keys(feedbackData).length > 0 ? (
            Object.entries(feedbackData).map(
              ([className, quizzes]) => renderFeedbackTable(quizzes, className) // Pass className as the title
            )
          ) : (
            <p>No feedback available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TFeedback;
