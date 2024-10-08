import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import "../studentstyle/StudentQuiz.css";
import Quizbox from "../objects/QuizBox";

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState([]); // State to hold quizzes
  const [loading, setLoading] = useState(false); // State to manage loading overlay
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pending quizzes once the component mounts
    const fetchPendingQuizzes = async () => {
      try {
        setLoading(true); // Show loading spinner
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://mathbuddyapi.com/getStudentPendingQuizzes",
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
        setQuizzes(data); // Store quizzes data
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false); // Hide loading spinner after fetching
      }
    };

    // Call the function to fetch quizzes
    fetchPendingQuizzes();

    // Update recently accessed
    const newItem = { page: "/studentquiz", label: "Quiz" };
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
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleOpenQuiz = async (quizId) => {
    try {
      setLoading(true); // Show loading spinner
      const token = localStorage.getItem("access_token");
      const response = await fetch("https://mathbuddyapi.com/current_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, quiz_id: quizId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const quizData = await response.json();
      navigate("/studentquizi", { state: { quizData, quizId } }); // Pass quizId and quizData
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false); // Hide loading spinner after navigating
    }
  };

  return (
    <div className="studentquiz-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SQcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SQmain-content">
          <h1 className="Quiz-message">Quizzes</h1>
          <div className="SQMain-Container">
            <div className="SQQuiz-box">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div key={quiz.quiz_id} className="QuizBox1">
                    <Quizbox
                      quizId={quiz.quiz_id} // Pass the quizId to the Quizbox
                      status={quiz.completed ? "complete" : "incomplete"}
                      title={quiz.quiz_title}
                      dueDate={new Date(quiz.due_date).toLocaleDateString()}
                      timeLimit={quiz.time_limit || "No time limit"}
                      marks="20"
                      onOpenQuiz={() => handleOpenQuiz(quiz.quiz_id)} // Call the function with quizId
                    />
                  </div>
                ))
              ) : (
                <p>No pending quizzes at the moment.</p>
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

export default StudentQuiz;
