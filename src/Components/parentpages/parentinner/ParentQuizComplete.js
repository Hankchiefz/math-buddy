import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentHeader from "../../objects/StudentHeader";
import ParentSNav from "../../objects/ParentSNav";
import "../../parentstyle/ParentQuizComplete.css";

const ParentQuizComplete = () => {
  const { state } = useLocation(); // Get the state from the router
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null); // State to hold student_id

  // Extract quiz_id from state
  const quiz_id = state?.quiz_id; // Using optional chaining to avoid errors if state is undefined

  useEffect(() => {
    // Fetch student_id from child_info route
    const fetchStudentId = async () => {
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch("https://mathbuddyapi.com/child_info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,

          },
          body: JSON.stringify({
            token: accessToken, // Send parent's access token to get child info
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student ID from child_info route");
        }

        const data = await response.json();
        setStudentId(data.student_id); // Set student_id from response
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentId();
  }, []); // Run this once to fetch student_id

  useEffect(() => {
    const fetchQuizCompletionData = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!quiz_id || !studentId) {
        setError("Quiz ID or Student ID is missing.");
        return;
      }

      try {
        const response = await fetch(
          "https://mathbuddyapi.com/parent_quiz_complete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quiz_id,
              token: accessToken, // Send access token in the body
              student_id: studentId, // Include student_id from child_info
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
      }
    };

    // Fetch quiz completion data only when studentId is available
    if (studentId) {
      fetchQuizCompletionData();
    }
  }, [quiz_id, studentId]); // Dependency array includes quiz_id and studentId

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizData) {
    return <div>Loading...</div>;
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
        <ParentSNav /> 
        <div className="sqc-main-content">
          <h1 className="sqc-h1">Quiz Complete!</h1>
          <hr className="sqc-line"></hr>
          <h2 className="sqc-h2">Feedback:</h2>
          <h3 className="sqc-h3">
            Quiz completed: {new Date(quizData.completed_at).toLocaleString()}
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
                    <a href={article} target="_blank" rel="noopener noreferrer">
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
        </div>
      </div>
    </div>
  );
};

export default ParentQuizComplete;
