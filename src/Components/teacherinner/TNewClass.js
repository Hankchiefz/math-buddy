  import React, { useState } from "react";
  import StudentHeader from "../objects/StudentHeader";
  import TeacherSNav from "../objects/TeacherSNav";
  import "../teacherstyle/TNewClass.css";

  const TNewClass = () => {
    const [className, setClassName] = useState(""); // State for class name
    const [grade, setGrade] = useState(""); // State for grade
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No access token found");
        return;
      }

      const classData = {
        token: token,
        class_name: className,
        class_grade: grade,
      };

      try {
        const response = await fetch("https://mathbuddyapi.com/create_class", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classData), // Send the class data in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to create class");
        }

        const result = await response.json();
        console.log("Class created successfully:", result);

        // Clear form and show success message
        setClassName("");
        setGrade("");
        setSuccessMessage("Class created successfully!");
      } catch (error) {
        console.error("Error creating class:", error);
        setError("Error creating class. Please try again.");
      }
    };

    return (
      <div className="TCInewclass-container">
        <StudentHeader /> 
        <div className="TCIcontent-wrapper">
          <TeacherSNav />
          <div className="TCImain-content">
            <div className="TCIform-container">
              <div className="createclass">
                <h1>Create Class</h1>
              </div>
              <form className="TCInew-class-form" onSubmit={handleSubmit}>
                {/* Input field for class name */}
                <div className="TCIinput-field">
                  <label htmlFor="class_name">Class Name</label>
                  <input
                    type="text"
                    id="class_name"
                    className="TCIclass-name-input"
                    placeholder="Enter Class Name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </div>

                {/* Input field for grade */}
                <div className="TCIinput-field">
                  <label htmlFor="grade">Grade</label>
                  <input
                    type="number"
                    id="grade"
                    className="TCIgrade-input"
                    placeholder="Enter Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                    min="1"
                    max="12" 
                  />
                </div>

                <button type="submit" className="TCInew-class-button">
                  Submit new Class
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}{" "}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TNewClass;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */