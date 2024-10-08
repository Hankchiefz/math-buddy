import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TQuizEdit.css"; // Ensure your CSS is in place

const TQuizEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = location.state || {};

  // State to hold quiz data
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    due_date: "",
    time_limit: "",
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz details when the component loads
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Access token is missing");
        }

        const response = await fetch(
          "https://mathbuddyapi.com/get_quiz_details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quiz_id: quizId }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Update state with the fetched quiz data
        setQuizData({
          title: data.title || "",
          description: data.description || "",
          due_date: data.due_date
            ? new Date(data.due_date).toISOString().substring(0, 10)
            : "",
          time_limit: data.time_limit || "",
          questions: data.questions || [],
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizDetails();
    } else {
      setError("Quiz ID is missing");
      setLoading(false);
    }
  }, [quizId]);

  // Handle form input changes for quiz details
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for quiz questions and answers
  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: value,
    };
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  // Handle form submission to save edited quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Access token is missing");
      }

      // Prepare data for the backend
      const updateData = {
        quiz_id: quizId,
        title: quizData.title,
        description: quizData.description,
        due_date: quizData.due_date,
        time_limit: quizData.time_limit,
        questions: quizData.questions,
      };

      const response = await fetch("https://mathbuddyapi.com/update_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, ...updateData }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert("Quiz updated successfully!");
      navigate("/TActiveTasks");
    } catch (error) {
      setError(error.message);
    }
  };

  // Render the form for editing quiz details
  const renderQuizForm = () => (
    <form onSubmit={handleSubmit} className="quiz-edit-form">
      <div className="form-group">
        <label>Quiz Title:</label>
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleQuizChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Quiz Description:</label>
        <textarea
          name="description"
          value={quizData.description}
          onChange={handleQuizChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          name="due_date"
          value={quizData.due_date}
          onChange={handleQuizChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Time Limit (minutes):</label>
        <input
          type="number"
          name="time_limit"
          value={quizData.time_limit}
          onChange={handleQuizChange}
          placeholder="No time limit"
        />
      </div>

      <h3>Edit Quiz Questions</h3>
      {quizData.questions.length === 0 ? (
        <p>No questions found for this quiz.</p>
      ) : (
        quizData.questions.map((question, index) => (
          <div key={question.question_id} className="form-group">
            <label>Question {index + 1}:</label>
            <input
              type="text"
              name="question_text"
              value={question.question_text}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />
            <label>Correct Answer:</label>
            <input
              type="text"
              name="correct_answer"
              value={question.correct_answer}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />
          </div>
        ))
      )}

      <button type="submit" className="btn-submit">
        Save Changes
      </button>
    </form>
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
              <h2>Edit Quiz Details</h2>
              {renderQuizForm()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TQuizEdit;
