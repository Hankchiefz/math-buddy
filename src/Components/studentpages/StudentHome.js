import React, { useEffect, useState } from "react";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import { useNavigate } from "react-router-dom";
import RecentlyAccessedBox from "../objects/RecentlyAccessedBox";
import TaskBox from "../objects/TaskBox";
import "../studentstyle/StudentHome.css";

const StudentHome = () => {
    const [fullName, setFullName] = useState("");
    const [quizzes, setQuizzes] = useState([]);
    const [recentlyAccessed, setRecentlyAccessed] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the full name from localStorage
        const storedName = localStorage.getItem("full_name");
        if (storedName) {
            setFullName(storedName);
        }

        // Fetch pending quizzes
        const token = localStorage.getItem("access_token");
        fetch("https://mathbuddyapi.com/getStudentPendingQuizzes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setQuizzes(data); // fetch quizzes data
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });

        // Fetch the recently accessed pages from localStorage
        const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
        setRecentlyAccessed(storedRecentlyAccessed);
    }, []);

    const handleNavigation = (page, label) => {
        // Navigate to a specific page and add it to recently accessed
        navigate(page);

        // Add the page to the recently accessed list and update localStorage
        const newItem = { page, label };
        setRecentlyAccessed(prevItems => {
            const updatedItems = [newItem, ...prevItems.filter(item => 
                item.page !== newItem.page || item.label !== newItem.label
            )].slice(0, 5);
            localStorage.setItem('recentlyAccessed', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    return (
        <div className="studenthome-container">
            <StudentHeader />
            <div className="SHcontent-wrapper">
                <StudentSNav />
                <div className="SHmain-content">
                    <div className="home-message">
                        <div className="SHwelcome-message">
                            Welcome {fullName}
                        </div>
                        <div className="SHactive-message">Active Quizzes</div>
                    </div>
                    <div className="SHMain-Container">
                        <div className="SHbutton-container">
                            <button
                                type="button"
                                className="SHB SHQuizButton"
                                onClick={() => handleNavigation("/studentquiz", "Quiz")}
                            >
                                <img
                                    src="/images/home/quizzes-icon.png"
                                    alt="Quizzes Icon"
                                    className="SHbutton-icon"
                                />
                                Quizzes
                            </button>
                            <button
                                type="button"
                                className="SHB SHLessonsButton"
                                onClick={() => handleNavigation("/studentLessons", "Lessons")}
                            >
                                <img
                                    src="/images/home/lessons-icon.png"
                                    alt="Lessons Icon"
                                    className="SHbutton-icon"
                                />
                                Lessons
                            </button>
                            <button
                                type="button"
                                className="SHB SHFeedbackButton"
                                onClick={() => handleNavigation("/studentfeedback", "Feedback")}
                            >
                                <img
                                    src="/images/home/feedback-icon.png"
                                    alt="Feedback Icon"
                                    className="SHbutton-icon"
                                />
                                Feedback
                            </button>
                        </div>
                        <div className="recently-accessed-container">
                            <div className="message-recently">
                                Recently Accessed
                            </div>
                            {recentlyAccessed.length > 0 ? (
                                recentlyAccessed.map((item, index) => (
                                    <RecentlyAccessedBox
                                        key={index}
                                        iconColor="#FFA07A"
                                        text={item.label}
                                        onClick={() => handleNavigation(item.page, item.label)}
                                    />
                                ))
                            ) : (
                                <p>No recently accessed pages.</p>
                            )}
                        </div>
                    </div>
                    <div className="SHTaskbox-Container">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <TaskBox
                                    key={quiz.quiz_id}
                                    title={quiz.quiz_title}
                                    task={quiz.quiz_description}
                                    dueDate={new Date(quiz.due_date).toLocaleDateString()}
                                />
                            ))
                        ) : (
                            <p>No pending quizzes at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;