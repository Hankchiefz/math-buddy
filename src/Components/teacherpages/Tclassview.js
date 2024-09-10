import React, { useState, useEffect } from "react";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import { useNavigate, useLocation } from "react-router-dom";
import "../teacherstyle/Tclassview.css";

const Tclassview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClassData = async () => {
    const token = localStorage.getItem("access_token");
    const classId = location.state?.classId; // Get classId from location state

    if (!token || !classId) {
      setError("Missing token or class ID");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://mathbuddyapi.com/class_view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, class_id: classId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch class data");
      }

      const data = await response.json();
      setClassData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [location.state?.classId]); // Depend on classId

  const handleStudentOverview = (studentId) => {
    console.log("Student Overview clicked for student ID:", studentId);
    // Navigate to student overview page or open a modal with student details
  };

  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  const handleAddQuiz = () => {
    navigate("/tnewquiz");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudentEmail("");
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();

    const classId = location.state?.classId; // Get classId from location state

    if (!classId) {
      setError("Class ID is missing");
      return;
    }

    try {
      const response = await fetch("https://mathbuddyapi.com/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_class_id: classId,
          student_email: studentEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      // Refresh class data after adding student
      await fetchClassData();

      setStudentEmail("");
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tclassview-container">
      <StudentHeader />
      <div className="content-wrapper">
        <TeacherSNav />
        <div className="main-content">
          <h2>{classData?.class?.class_name || "Class Name"}</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Average Mark</th>
                <th>Student Overview</th>
              </tr>
            </thead>
            <tbody>
              {classData?.students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_name}</td>
                  <td>{student.email}</td>
                  <td>{student.average_mark}</td>
                  <td>
                    <button
                      onClick={() => handleStudentOverview(student.student_id)}
                      className="overview-button"
                    >
                      Click here!
                    </button>
                  </td>
                </tr>
              ))}
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
