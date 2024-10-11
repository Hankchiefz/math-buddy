import React, { useState, useEffect, Suspense } from "react";
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import '../teacherstyle/TeacherLessons.css';

const TeacherLessons = () => {
    const [grade, setGrade] = useState(null);
    const [LessonComponent, setLessonComponent] = useState(null);

    // Fetch and set the appropriate lesson component when 'grade' changes
    useEffect(() => {
        if (grade) {
            const loadLessonComponent = async () => {
                try {
                    const module = await import(`../lessons/Year${grade}Lessons.js`);
                    setLessonComponent(() => module.default);
                } catch (error) {
                    console.error(`Error loading Year${grade} lessons:`, error);
                }
            };
            loadLessonComponent();
        }
    }, [grade]);

    return (
        <div className="teacher-lessons-container">
            <StudentHeader />
            <div className="TLcontent-wrapper">
                <TeacherSNav />
                <div className="TLmain-content">
                    <h1 className="teacher-lessons-title">Lessons</h1>
                    <p className="teacher-lessons-description">
                        Each year has their very own pre-generated lessons created for their age group!
                    </p>
                    <p className="teacher-lessons-description">
                        Click on your chosen year group below to load their pre-generated lessons.
                    </p>
                    {grade === null ? (
                        // Display buttons if no grade is selected
                        <div className="teacher-lessons-button-container">
                            {[1, 2, 3, 4, 5, 6].map((year) => (
                                <button
                                    key={year}
                                    className="teacher-lessons-button"
                                    onClick={() => setGrade(year)}
                                >
                                    Year {year}
                                </button>
                            ))}
                        </div>
                    ) : (
                        // Display the lesson component if a grade is selected
                        <div className="lesson-content">
                            <button className="back-button" onClick={() => setGrade(null)}>
                                Back to Year Selection
                            </button>
                            <Suspense fallback={<div>Loading lesson...</div>}>
                                {LessonComponent && <LessonComponent />}
                            </Suspense>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherLessons;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 