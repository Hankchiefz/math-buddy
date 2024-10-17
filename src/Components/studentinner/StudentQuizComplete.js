import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import "../studentstyle/StudentQuizComplete.css";

const StudentQuizComplete = () => {
  const { state } = useLocation(); 
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Extract quiz_id from state
  const quiz_id = state?.quiz_id; 

  useEffect(() => {
    const fetchQuizCompletionData = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!quiz_id) {
        setError("Quiz ID is missing.");
        setLoading(false); // Stop loading if there's no quiz ID
        return;
      }

      try {
        const response = await fetch(
          "https://mathbuddyapi.com/student_quiz_complete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quiz_id,
              token: accessToken, // Send access token in the body
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading when done fetching
      }
    };

    fetchQuizCompletionData();
  }, [quiz_id]); // Dependency array now includes quiz_id

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
    return `https://www.youtube.com/embed/${videoId}`; // Return embed URL
  };

  return (
    <div className="studentquizcomplete-container">
      <StudentHeader /> 
      <div className="sqc-content-wrapper">
        <StudentSNav /> 
        <div className="sqc-main-content">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <>
              <h1 className="sqc-h1">Quiz Complete!</h1>
              <hr className="sqc-line" />
              <h2 className="sqc-h2">Feedback:</h2>
              <h3 className="sqc-h3">
                Quiz completed:{" "}
                {new Date(quizData.completed_at).toLocaleString()}
              </h3>
              <table className="sqc-feedback-table">
                <thead>
                  <tr>
                    <th>Your mark</th>
                    <th>AI Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quizData.student_score}</td>
                    <td>{quizData.feedback}</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="sqc-h2">Learning Resources:</h2>
              <table className="sqc-learning-table">
                <thead>
                  <tr>
                    <th>Learning resources for {quizData.quiz_name}!</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.related_articles.map((article, index) => (
                    <tr key={index}>
                      <td>{article}</td>
                      <td>
                        <a
                          href={article}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="sqc-h2">Related Video:</h2>
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={getYouTubeEmbedUrl(quizData.related_video)} // Use the embed URL
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizComplete;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */