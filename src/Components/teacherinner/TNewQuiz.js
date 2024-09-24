import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import LoadingOverlay from "../LoadingOverlay"; // Import the LoadingOverlay
import "../teacherstyle/TNewQuiz.css";

const TNewQuiz = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchClasses = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await fetch(
          "https://mathbuddyapi.com/teacher_classes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }), // Token sent in the body
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClasses(data || []); // Ensure classes is set correctly
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleNumberOfQuestionsChange = (event) => {
    setNumberOfQuestions(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedClassData = classes.find(
      (cls) => cls.class_name === selectedClass
    );
    if (!selectedClassData) {
      setError("Selected class not found");
      return;
    }

    const payload = {
      class_id: selectedClassData.class_id,
      topic,
      number_of_questions: parseInt(numberOfQuestions, 10),
    };

    console.log("Payload being sent:", payload); // Debugging line

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://mathbuddyapi.com/create_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Get the error response body
        throw new Error(errorResponse.message || "Network response was not ok");
      }

      const data = await response.json();
      setSuccess("Quiz created successfully!");
      console.log("Quiz created:", data);

      // Navigate to TActiveTasks after successful quiz creation
      navigate("/TActiveTasks");
    } catch (error) {
      setError("Failed to create quiz: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TCQnewclass-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="TCQcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="TCQmain-content">
          {loading && <LoadingOverlay />}{" "}
          {/* Show loading overlay when loading */}
          <div className="TCQform-container">
            <div className="createclass">
              <h1>Create Quiz</h1>
            </div>
            <form className="TCQnew-class-form" onSubmit={handleSubmit}>
              <select
                className="TCQtopic-dropdown"
                required
                onChange={handleTopicChange}
                value={topic}
              >
                <option value="" disabled>
                  Select Topic
                </option>
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
              </select>
              <select
                className="TCQstudent-dropdown"
                required
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="" disabled>
                  Select Class
                </option>
                {classes.map((cls) => (
                  <option key={cls.class_id} value={cls.class_name}>
                    {cls.class_name}
                  </option>
                ))}
              </select>
              <select
                className="TCQquestions-dropdown"
                required
                value={numberOfQuestions}
                onChange={handleNumberOfQuestionsChange}
              >
                <option value="" disabled>
                  Select number of questions (max 10)
                </option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="TCQnew-class-button"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit new Quiz"}
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TNewQuiz;
