import React, { useState, useEffect, Suspense } from "react";
import "../studentstyle/StudentLessons.css";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const StudentLessons = () => {
    // State that stores the student's grade level
    const [grade, setGrade] = useState(null);
    // State that stores  the dynamically loaded lesson component based on the grade
    const [LessonComponent, setLessonComponent] = useState(null);
    // State that manages loading state for fetching data and components
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrade = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await fetch("https://mathbuddyapi.com/get_student_grade", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const result = await response.json();
                if (response.ok) {
                    setGrade(result.grade); // Set the fetched grade in state
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error("Error fetching grade:", error); 
            } finally {
                setLoading(false); 
            }
        };

        fetchGrade(); // Call fetchGrade
    }, []);

    useEffect(() => {
        // Load the appropriate lesson component when the grade is there
        if (grade) {
            const loadLessonComponent = async () => {
                setLoading(true); // Start loading
                try {
                    // Dynamically import the lesson component based on the grade
                    const module = await import(`../lessons/Year${grade}Lessons.js`);
                    setLessonComponent(() => module.default); // Set the loaded component in state
                } catch (error) {
                    console.error("Error loading lesson component:", error); 
                } finally {
                    setLoading(false); 
                }
            };
            loadLessonComponent(); // Call loadLessonComponent when grade changes
        }
    }, [grade]); // Effect runs when the grade value changes

    return (
        <div className="student-lessons-container">
            <StudentHeader /> 
            <div className="SLcontent-wrapper">
                <StudentSNav /> 
                <div className="SLmain-content">
                    {loading ? (
                        <div className="loading-overlay">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        LessonComponent && (
                            <div className="lessons-title-container">
                                <Suspense fallback={<div className="loading-overlay"><div className="loading-spinner"></div></div>}>
                                    <LessonComponent />
                                </Suspense>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentLessons;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 