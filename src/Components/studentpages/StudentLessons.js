import React, { useState, useEffect, Suspense } from "react";
import "../studentstyle/StudentLessons.css";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const StudentLessons = () => {
    const [grade, setGrade] = useState(null);
    const [LessonComponent, setLessonComponent] = useState(null);

    useEffect(() => {
        const fetchGrade = async () => {
            try {
                const token = localStorage.getItem("access_token");
                console.log(token);
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
            }
        };

        fetchGrade();
    }, []);

    useEffect(() => {
        if (grade) {
            const loadLessonComponent = async () => {
                const module = await import(`../lessons/Year${grade}Lessons.js`);
                setLessonComponent(() => module.default);
            };
            loadLessonComponent();
        }
    }, [grade]);

    if (!LessonComponent) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-lessons-container">
            <StudentHeader />
            <div className="SLcontent-wrapper">
                <StudentSNav />
                <div className="SLmain-content">
                    <Suspense fallback={<div>Loading lesson...</div>}>
                        <LessonComponent />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default StudentLessons;
