import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../objects/StudentHeader";
import TeacherSNav from "../objects/TeacherSNav";
import LoadingOverlay from "../LoadingOverlay";
import "../teacherstyle/Tclasses.css";

const Tclasses = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const [classes, setClasses] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Fetch the teacher classes 
  useEffect(() => {
    const fetchTeacherClasses = async () => {
      const token = localStorage.getItem("access_token"); // Retrieve the token

      if (!token) {
        setError("No access token found");
        setLoading(false); // Stop loading if no token
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
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchTeacherClasses();
  }, []); 

  // Save the "Classes" page to recently accessed
  useEffect(() => {
    const newItem = { page: "/tclasses", label: "Classes" };

    try {
      const storedRecentlyAccessed = JSON.parse(
        localStorage.getItem("recentlyAccessed") || "[]"
      );

      const updatedItems = [
        newItem,
        ...storedRecentlyAccessed.filter(
          (item) => item.page !== newItem.page || item.label !== newItem.label
        ),
      ].slice(0, 5); // Limit stored items to the latest 5

      localStorage.setItem("recentlyAccessed", JSON.stringify(updatedItems));
      console.log("Saved recently accessed items:", updatedItems);
    } catch (error) {
      console.error("Error saving recently accessed items:", error);
    }
  }, []); // Run once when component mounts

  const handleCreateClassClick = () => {
    navigate("/tnewclass"); // Navigate to the TNewClass component
  };

  const handleRowClick = (classId) => {
    navigate("/tclassview", { state: { classId } }); // Pass classId in state
  };

  return (
    <div className="teacherclasses-container">
      <StudentHeader /> 
      {loading && <LoadingOverlay />} 
      <div className="TCcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="TCmain-content">
          <div className="TChome-message">
            <h1>Active Classes</h1>
          </div>
          <div className="TCMain-Container">
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
                    <tr
                      className="TCtable-row"
                      key={classItem.class_id}
                      onClick={() => handleRowClick(classItem.class_id)}
                    >
                      <td>
                        <div className="color"></div>
                      </td>
                      <td>{classItem.class_name}</td>
                      <td>{classItem.student_count}</td>
                      <td>{classItem.teacher_name}</td>
                      <td>1</td>{" "}
                      {/* Placeholder for actual active tasks count */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No active classes available</td>
                  </tr>
                )}
              </tbody>
            </table>
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
    </div>
  );
};

export default Tclasses;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 