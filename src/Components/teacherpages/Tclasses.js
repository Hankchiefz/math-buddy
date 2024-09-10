// src/components/pages/TActiveTasks.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import "../teacherstyle/Tclasses.css";

const Tclasses = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to store error messages
  const [classes, setClasses] = useState([]); // State to store class data

  // Fetch the teacher classes upon component mount
  useEffect(() => {
    const fetchTeacherClasses = async () => {
      const token = localStorage.getItem("access_token"); // Retrieve the token

      if (!token) {
        setError("No access token found");
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
            body: JSON.stringify({ token }), // Token is sent in the body
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch teacher classes");
        }

        const data = await response.json();
        console.log("Teacher classes:", data); // Log the data

        // Set the returned data directly, as the API returns the array of classes
        setClasses(data || []); // If data is undefined, default to an empty array
      } catch (error) {
        console.error("Error fetching teacher classes:", error);
        setError("Error fetching teacher classes");
      }
    };

    fetchTeacherClasses();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCreateClassClick = () => {
    navigate("/tnewclass"); // Navigate to the TNewClass component
  };

  return (
    <div className="teacherclasses-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="TCcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="TCtable-container">
          <div className="TChome-message">
            <h1>Active Classes</h1>
          </div>
          <table className="line"></table>
          <hr />
          <table className="TCtasks-table">
            <thead>
              <tr>
                <th></th>
                <th>Class Name</th>
                <th>#Students</th>
                <th>Teacher Name</th>
                <th>Active Tasks</th>
              </tr>
            </thead>
            <tbody>
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <tr className="TCtable-row" key={classItem.class_id}>
                    <td>
                      <div className="color"></div>
                    </td>
                    <td>{classItem.class_name}</td>
                    <td>{classItem.student_count}</td>
                    <td>{classItem.teacher_name}</td>
                    <td>1</td>{" "}
                    {/* Placeholder, replace with actual active tasks count if available */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No active classes available</td>
                </tr>
              )}
            </tbody>
          </table>
          <h5>no other quizzes</h5>
          <button
            className="TCcreate-quiz-button"
            onClick={handleCreateClassClick}
          >
            Create Class
          </button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error if any */}
        </div>
      </div>
    </div>
  );
};

export default Tclasses;
