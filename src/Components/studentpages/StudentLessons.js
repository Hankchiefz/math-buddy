import React, { useState, useEffect, Suspense } from "react";
import "../studentstyle/StudentLessons.css";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const StudentLessons = () => {
    const [grade, setGrade] = useState(null);
    const [LessonComponent, setLessonComponent] = useState(null);
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
                    setGrade(result.grade);
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error("Error fetching grade:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGrade();
    }, []);

    useEffect(() => {
        if (grade) {
            const loadLessonComponent = async () => {
                setLoading(true); // Show loading spinner while fetching
                try {
                    const module = await import(`../lessons/Year${grade}Lessons.js`);
                    setLessonComponent(() => module.default);
                } catch (error) {
                    console.error("Error loading lesson component:", error);
                } finally {
                    setLoading(false); // Hide loading spinner once done
                }
            };
            loadLessonComponent();
        }
    }, [grade]);

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
