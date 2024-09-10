import React, { useState } from "react";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import { useNavigate } from "react-router-dom";
import "../teacherstyle/Tclassview.css";

const Tclassview = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");

  const handleStudentOverview = () => {
    console.log("Student Overview clicked");
  };

  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  const handleAddQuiz = () => {
    navigate("/quizzes");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudentEmail("");
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    console.log("Adding student with email:", studentEmail);
    // Here you would typically make an API call to add the student
    handleCloseModal();
  };

  return (
    <div className="tclassview-container">
      <StudentHeader />
      <div className="content-wrapper">
        <TeacherSNav />
        <div className="main-content">
          <h2>Class Name</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Average Mark</th>
                <th>Parent Email</th>
                <th>Student Overview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Olivia Bennet</td>
                <td>olivia@example.com</td>
                <td>100%</td>
                <td>oliviaparent@example.com</td>
                <td>
                  <button
                    onClick={handleStudentOverview}
                    className="overview-button"
                  >
                    Click here!
                  </button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>

          <div className="button-container">
            <button onClick={handleAddStudent} className="action-button">
              Add Student
            </button>
            <button onClick={handleAddQuiz} className="action-button">
              Add Quiz
            </button>
          </div>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Add New Student</h3>
                <form onSubmit={handleSubmitStudent}>
                  <input
                    type="email"
                    placeholder="Student Email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                  <div className="modal-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tclassview;
