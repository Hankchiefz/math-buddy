import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TQuizView.css"; 

const TQuizView = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { quizId } = location.state || {}; // Extract quizId from state

  // State to hold student data and quiz questions
  const [students, setStudents] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz details when the component loads
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        // Get the access token from local storage
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token is missing");
        }

        // Send the POST request to the API
        const response = await fetch(
          "https://mathbuddyapi.com/getQuizDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, quiz_id: quizId }), // Sending token and quiz_id in the body
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        setStudents(data.students); // Update state with student data
        setQuizQuestions(data.quiz_questions); // Update state with quiz questions
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    if (quizId) {
      // Ensure quizId is available before fetching
      fetchQuizDetails();
    } else {
      setError("Quiz ID is missing");
      setLoading(false);
    }
  }, [quizId]); 

  const renderStudentTable = () => (
    <div className="TQtable-container">
      <h2>Students Assigned to the Quiz</h2>
      <hr />
      {students.length === 0 ? (
        <p>No students found for this quiz.</p>
      ) : (
        <table className="TQtasks-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Completion Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id} className="TQtable-row">
                <td>{student.student_name}</td>{" "}
                <td>{student.score !== null ? student.score : "N/A"}</td>
                <td>{student.completed ? "Completed" : "Not Completed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // Render the quiz questions
  const renderQuizQuestions = () => (
    <div className="TQquestions-container">
      <h2>Quiz Questions</h2>
      <hr />
      {quizQuestions.length === 0 ? (
        <p>No questions found for this quiz.</p>
      ) : (
        <ul>
          {quizQuestions.map((question) => (
            <li key={question.question_id}>
              <strong>{question.question_text}</strong>{" "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="teacherquiz-container">
      <StudentHeader />
      <div className="TQcontent-wrapper">
        <TeacherSNav />
        <div className="TQmain-content">
          {loading ? (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {renderStudentTable()}
              {renderQuizQuestions()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TQuizView;
