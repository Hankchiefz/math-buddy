import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import "../studentstyle/StudentFeedback.css";
import FeedbackBox from "../objects/Feedbackbox";

const StudentFeedback = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch quizzes 
    const fetchCompletedQuizzes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://mathbuddyapi.com/getStudentCompletedQuizzes",
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
        setCompletedQuizzes(data); // Store completed quizzes data
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCompletedQuizzes(); // Call the function to fetch completed quizzes

    // Update recently accessed
    const newItem = { page: "/studentfeedback", label: "Feedback" };
    try {
      const storedRecentlyAccessed = JSON.parse(
        localStorage.getItem("recentlyAccessed") || "[]"
      );
      const updatedItems = [
        newItem,
        ...storedRecentlyAccessed.filter(
          (item) => item.page !== newItem.page || item.label !== newItem.label
        ),
      ].slice(0, 5);
      localStorage.setItem("recentlyAccessed", JSON.stringify(updatedItems));
      console.log("Saved recently accessed items:", updatedItems);
    } catch (error) {
      console.error("Error saving recently accessed items:", error);
    }
  }, []); 

  const handleFeedbackClick = (quiz_id) => {
    // Navigate to the feedback details page and pass the quiz_id via state
    navigate(`/StudentQuizComplete`, { state: { quiz_id } });
  };

  return (
    <div className="studentfeedback-container">
      <StudentHeader />
      <div className="SFcontent-wrapper">
        <StudentSNav /> 
        <div className="SFmain-content">
          <h1 className="Feedback-message">Feedback</h1>

          <div className="SFMain-Container">
            <div className="Feedback-box">
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((quiz) => (
                  <div
                    key={quiz.quiz_id}
                    className="FeedBox1"
                    onClick={() => handleFeedbackClick(quiz.quiz_id)}
                    style={{ cursor: "pointer" }} 
                  >
                    <FeedbackBox
                      status="complete"
                      title={quiz.quiz_title}
                      dueDate={new Date(quiz.completed_at).toLocaleDateString()}
                      marks={quiz.score || "Not graded"}
                    />
                  </div>
                ))
              ) : (
                <p>No completed feedback available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 