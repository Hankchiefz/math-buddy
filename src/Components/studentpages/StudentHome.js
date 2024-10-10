import React, { useEffect, useState } from "react";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import RecentlyAccessedBox from "../objects/RecentlyAccessedBox";
import TaskBox from "../objects/TaskBox";
import Footer from "../objects/Footer";
import { useNavigate } from "react-router-dom";
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
        if (token) {
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
                    setQuizzes(data);
                })
                .catch((error) => {
                    console.error("Error fetching quizzes:", error);
                });
        } else {
            console.warn("No token found in localStorage");
        }

        // Load recently accessed items from localStorage
        const loadRecentlyAccessed = () => {
            try {
                const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
                console.log("Loaded recently accessed items:", storedRecentlyAccessed);
                setRecentlyAccessed(storedRecentlyAccessed.slice(0, 3)); // Limit display to the last 3 pages
            } catch (error) {
                console.error("Error loading recently accessed items:", error);
            }
        };

        loadRecentlyAccessed();
    }, []);

    const handleNavigation = (page, label) => {
        console.log(`Navigating to: ${page}, ${label}`);
        
        // Update recently accessed items
        const newItem = { page, label };
        setRecentlyAccessed(prevItems => {
            const updatedItems = [newItem, ...prevItems.filter(item => 
                item.page !== newItem.page || item.label !== newItem.label
            )].slice(0, 3); 

            // Save to localStorage
            try {
                localStorage.setItem('recentlyAccessed', JSON.stringify(updatedItems));
                console.log("Saved recently accessed items:", updatedItems);
            } catch (error) {
                console.error("Error saving recently accessed items:", error);
            }

            return updatedItems;
        });

        // Navigate to the recent page
        navigate(page);
    };

    return (
        <div className="studenthome-container">
            <StudentHeader />
            <div className="SHcontent-wrapper">
                <StudentSNav />
                <div className="SHmain-content">
                    <div className="home-message">
                        <div className="SHwelcome-message">Welcome {fullName}</div>
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

                        <div className="SHrecently-accessed-container">
                            <div className="SHmessage-recently">Recently Accessed</div>
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
                            <p>No pending quizzes now</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;
