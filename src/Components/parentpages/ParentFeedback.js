import StudentHeader from "../objects/StudentHeader";
import { useNavigate } from "react-router-dom"; 
import ParentSNav from "../objects/ParentSNav";
import '../parentstyle/ParentFeedback.css';
import React, { useEffect, useState } from 'react';
import FeedbackBox from "../objects/Feedbackbox";

const ParentFeedback = () => {
    // State to hold completed quizzes data
    const [completedQuizzes, setCompletedQuizzes] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 

    useEffect(() => {
        // Function to fetch completed quizzes from the API
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

                // Handle non-200 responses
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                // Store the fetched quiz data in state
                const data = await response.json();
                setCompletedQuizzes(data); 
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            } finally {
                // Hide loading spinner after fetching
                setLoading(false); 
            }
        };

        // Call the function to fetch the quizzes when the component mounts
        fetchCompletedQuizzes(); 

        // Update the recently accessed pages in local storage
        const newItem = { page: "/studentfeedback", label: "Feedback" };
        try {
            const storedRecentlyAccessed = JSON.parse(
                localStorage.getItem("recentlyAccessed") || "[]"
            );
            // Add the new item and keep only the last 5 items
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
    }, []); 

   
    const handleFeedbackClick = (quiz_id) => {
        // Navigate to the quiz completion page with the quiz_id passed as state
        navigate(`/parentquizcomplete`, { state: { quiz_id } });
    };

    return (
        <div className="parentfeedback-container">
            <StudentHeader /> 
            <div className="PFcontent-wrapper">
                <ParentSNav /> 
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
                                    // Render each feedback box for quizzes
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
                                    // Display message if no quizzes are available
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
