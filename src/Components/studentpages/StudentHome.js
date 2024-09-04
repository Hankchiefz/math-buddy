import React, { useEffect, useState } from "react";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import { useNavigate } from "react-router-dom";
import RecentlyAccessedBox from "../objects/RecentlyAccessedBox";
import TaskBox from "../objects/TaskBox";
import "../studentstyle/StudentHome.css";

const StudentHome = () => {
    const [fullName, setFullName] = useState("");
    const [quizzes, setQuizzes] = useState([]); // State to hold quizzes

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
                setQuizzes(data); // fetchquizzes data
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });
    }, []);

    const navigate = useNavigate();

    const handleQuizButton = () => {
        navigate("/studentquiz"); // Navigate to the quiz page
    };

    const handleLessonsButton = () => {
        navigate("/studentLessons"); // Navigate to the lessons page
    };

    const handleFeedbackButton = () => {
        navigate("/studentfeedback"); // Navigate to the feedback page
    };

    return (
        <div className="studenthome-container">
            <StudentHeader /> {/* Top navbar */}
            <div className="SHcontent-wrapper">
                <StudentSNav /> {/* Side navbar */}
                <div className="SHmain-content">
                    <div className="home-message">
                        <div className="SHwelcome-message">
                            {" "}
                            Welcome {fullName}{" "}
                        </div>
                        <div className="SHactive-message"> Active Quizzes </div>
                    </div>
                    <div className="SHMain-Container">
                        <div className="SHbutton-container">
                            <button
                                type="button"
                                className="SHB SHQuizButton"
                                onClick={handleQuizButton} // Navigate to Quizzes
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
                                onClick={handleLessonsButton} // Navigate to Lessons
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
                                onClick={handleFeedbackButton} // Navigate to Feedback
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
                            <div className="RAB recently-accessed-box1">
                                <RecentlyAccessedBox
                                    iconColor="#FFA07A"
                                    text="Quiz: Fun Wordy Math"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="SHTaskbox-Container">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <TaskBox
                                    key={quiz.quiz_id}
                                    title={quiz.quiz_title}
                                    task={quiz.quiz_description}
                                    dueDate={new Date(
                                        quiz.due_date
                                    ).toLocaleDateString()}
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
