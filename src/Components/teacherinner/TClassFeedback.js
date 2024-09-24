import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TClassFeedback.css";

const TClassFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract class_name, quiz_id, and quiz_title from location state
  const { class_name, quiz_id, quiz_title } = location.state || {};

  // State to hold quiz completion data and loading status
  const [completionData, setCompletionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [className, setClassName] = useState(class_name || "Class Name Here");
  const [quizName, setQuizName] = useState(quiz_title || "Quiz Name Here");

  // State to handle modal visibility and feedback being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Log location state for debugging
  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location.state]);

  // Fetch quiz completion data on component mount
  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("No access token found");
        }

        if (class_name && quiz_id) {
          const response = await fetch(
            "https://mathbuddyapi.com/quiz_completion_details",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ class_name, quiz_id }),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setCompletionData(data);
        } else {
          throw new Error("Class name or quiz ID is missing");
        }
      } catch (error) {
        console.error("Error fetching completion data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletionData();
  }, [class_name, quiz_id]);

  // Handle opening the modal with feedback prefilled
  const handleEditClick = (feedback, studentId) => {
    setSelectedFeedback(feedback || ""); // Prefill the input with the current feedback
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  // Handle saving the edited feedback
  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      // Update local data
      const updatedCompletionData = completionData.map((entry) =>
        entry.student_id === selectedStudentId
          ? { ...entry, feedback: selectedFeedback }
          : entry
      );
      setCompletionData(updatedCompletionData);

      // Make API call to add additional feedback
      const response = await fetch(
        "https://mathbuddyapi.com/add_additional_feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: selectedStudentId,
            quiz_id: quiz_id,
            additional_feedback_teacher: selectedFeedback,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update feedback");
      }

      // Close the modal after saving
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating feedback:", error);
      setError(error.message);
    }
  };

  // Close the modal without saving
  const handleCancelClick = () => {
    setIsModalOpen(false);
    setSelectedFeedback("");
  };

  // Format the date as needed
  const formatDate = (date) => {
    if (!date) return "Not completed";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  // Render the completion data table
  const renderCompletionTable = (data) => (
    <div className="completion-table-container">
      <h2>{quizName ? `Quiz: ${quizName}` : "Quiz Name"}</h2>
      <hr />
      {data.length === 0 ? (
        <p>No completion data available.</p>
      ) : (
        <table className="completion-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Completed At</th>
              <th>Feedback</th>
              <th>Edit Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.student_id}>
                <td>{entry.student_name}</td>
                <td>{entry.score !== null ? entry.score : "N/A"}</td>
                <td>{formatDate(entry.completed_at)}</td>
                <td>{entry.feedback || "No feedback"}</td>
                <td>
                  <button
                    className="edit-feedback-button"
                    onClick={() =>
                      handleEditClick(entry.feedback, entry.student_id)
                    }
                  >
                    Edit Feedback
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
          {completionData.length > 0
            ? renderCompletionTable(completionData)
            : "No completion data available."}
        </div>
      </div>

      {/* Modal for editing feedback */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Feedback</h3>
            <form onSubmit={handleSaveClick}>
              <textarea
                value={selectedFeedback}
                onChange={(e) => setSelectedFeedback(e.target.value)}
                className="feedback-input"
                rows="5"
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TClassFeedback;