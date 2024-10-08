import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/TActiveTasks.css";

const TActiveTasks = () => {
  const navigate = useNavigate();

  const [quizzesByClass, setQuizzesByClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Access token is missing");
        }

        const response = await fetch("https://mathbuddyapi.com/getTeachQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setQuizzesByClass(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleCreateClassClick = () => {
    navigate("/tnewquiz");
  };

  const handleApprove = async (className, quizId) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token is missing");
      }

      const response = await fetch("https://mathbuddyapi.com/assign_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, class_name: className, quiz_id: quizId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setQuizzesByClass(updatedData);
    } catch (error) {
      console.error("Assignment error:", error);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };

  const filterQuizzesByStatus = (status) => {
    const filteredQuizzes = {};
    Object.keys(quizzesByClass).forEach((className) => {
      const quizzes = quizzesByClass[className];
      if (Array.isArray(quizzes)) {
        const filtered = quizzes.filter((quiz) => quiz.active === status);
        if (filtered.length > 0) {
          filteredQuizzes[className] = filtered;
        }
      } else {
        console.warn(`Expected quizzes to be an array but got ${typeof quizzes}`);
      }
    });
    return filteredQuizzes;
  };

  const activeQuizzes = filterQuizzesByStatus("Active");
  const notActiveQuizzes = filterQuizzesByStatus("Not Active");
  const completeQuizzes = filterQuizzesByStatus("Complete");

  const handleQuizClick = (quiz) => {
    if (quiz.active === "Active" || quiz.active === "Complete") {
      navigate("/TQuizView", { state: { quizId: quiz.quiz_id } }); // Send quiz_id in state
    } else {
      navigate("/TQuizEdit", { state: { quizId: quiz.quiz_id } }); // Send quiz_id in state
    }
  };

  const renderQuizTable = (quizzes, title) => (
    <div className="TQtable-container">
      <h2>{title}</h2>
      <hr />
      {Object.keys(quizzes).length === 0 ? (
        <p>No {title.toLowerCase()} quizzes.</p>
      ) : (
        <table className="TQtasks-table">
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Quiz Name</th>
              {title === "Not Active Quizzes" && <th>Actions</th>}
              {title === "Active Quizzes" && <th>Completion %</th>}
              {title === "Completed Quizzes" && <th>Average Score</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(quizzes).map(([className, quizzes], classIndex) =>
              quizzes.map((quiz, quizIndex) => (
                <tr
                  key={`${classIndex}-${quizIndex}`}
                  className="TQtable-row"
                  onClick={() => handleQuizClick(quiz)} // Handle row click
                >
                  <td>
                    <div className="color"></div>
                  </td>
                  <td>{className}</td>
                  <td>{quiz.title}</td>
                  {title === "Active Quizzes" && (
                    <td>{quiz.completion_percentage.toFixed(2)}%</td>
                  )}
                  {title === "Completed Quizzes" && (
                    <td>
                      {typeof quiz.average_score === "string"
                        ? parseFloat(quiz.average_score).toFixed(2)
                        : "N/A"}
                    </td>
                  )}
                  {title === "Not Active Quizzes" && (
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleApprove(className, quiz.quiz_id);
                        }}
                        className="approve-button"
                      >
                        Approve
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="teacherquiz-container">
      <StudentHeader />
      <div className="TQcontent-wrapper">
        <TeacherSNav />
        <div className="TQmain-content">
          {(loading || isSubmitting) && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {renderQuizTable(activeQuizzes, "Active Quizzes")}
              {renderQuizTable(notActiveQuizzes, "Not Active Quizzes")}
              {renderQuizTable(completeQuizzes, "Completed Quizzes")}
            </>
          )}
          <button
            className="TQcreate-quiz-button"
            onClick={handleCreateClassClick}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default TActiveTasks;
