import StudentHeader from "../objects/StudentHeader";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ParentSNav from "../objects/ParentSNav";
import '../parentstyle/ParentFeedback.css';
import React, { useEffect, useState } from 'react';
import FeedbackBox from "../objects/Feedbackbox";

const ParentFeedback = () => {
    const [completedQuizzes, setCompletedQuizzes] = useState([]); // State to hold completed quizzes
    const [loading, setLoading] = useState(true); // State for loading spinner
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Fetch quizzes once the component mounts
        const fetchCompletedQuizzes = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await fetch(
                    "https://mathbuddyapi.com/get_completed_quizzes",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ token }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCompletedQuizzes(data); // Store completed quizzes data
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            } finally {
                setLoading(false); // Hide loading spinner after fetching
            }
        };

        fetchCompletedQuizzes(); // Call the function to fetch completed quizzes

        // Update recently accessed
        const newItem = { page: "/studentfeedback", label: "Feedback" };
        try {
            const storedRecentlyAccessed = JSON.parse(
                localStorage.getItem("recentlyAccessed") || "[]"
            );
            const updatedItems = [
                newItem,
                ...storedRecentlyAccessed.filter(
                    (item) => item.page !== newItem.page || item.label !== newItem.label
                ),
            ].slice(0, 5);
            localStorage.setItem("recentlyAccessed", JSON.stringify(updatedItems));
        } catch (error) {
            console.error("Error saving recently accessed items:", error);
        }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to handle clicking on feedback box
    const handleFeedbackClick = (quiz_id) => {
        // Navigate to the feedback details page and pass the quiz_id via state
        navigate(`/parentquizcomplete`, { state: { quiz_id } });
    };

    return (
        <div className="parentfeedback-container">
            <StudentHeader /> {/* Top navbar */}
            <div className="PFcontent-wrapper">
                <ParentSNav /> {/* Side navbar */}
                <div className="PFmain-content">
                    <h1 className="Feedback-message">Feedback</h1>
                    {loading ? (
                        <div className="loading-overlay">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        <div className="PFMain-Container">
                            <div className="Feedback-box">
                                {completedQuizzes.length > 0 ? (
                                    completedQuizzes.map((quiz) => (
                                        <div
                                            key={quiz.quiz_id}
                                            className="FeedBox1"
                                            onClick={() => handleFeedbackClick(quiz.quiz_id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FeedbackBox
                                                status="complete"
                                                title={quiz.quiz_title}
                                                dueDate={new Date(quiz.completed_at).toLocaleDateString()}
                                                marks={quiz.score || "Not graded"}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No completed feedback available.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentFeedback;
