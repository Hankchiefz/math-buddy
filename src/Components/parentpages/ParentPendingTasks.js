import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader';
import ParentSNav from '../objects/ParentSNav';
import '../parentstyle/ParentPendingTasks.css';

const ParentPendingTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingTasks = async () => {
            try {
                // Get the access token from localStorage
                const token = localStorage.getItem("access_token");

                if (!token) {
                    throw new Error("Access token is missing");
                }

                // Send the POST request to the API
                const response = await fetch("https://mathbuddyapi.com/get_pending_tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ token }), // Sending the token in the body
                });

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Parse the JSON response
                const data = await response.json();
                setTasks(data); // Update state with fetched data
            } catch (error) {
                setError(error.message); // Set error state if any
            } finally {
                setLoading(false); // Hide loading spinner after data is fetched
            }
        };

        // Call the function to fetch pending tasks
        fetchPendingTasks();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <div>Loading...</div>;  // Show loading message while fetching
    }

    if (error) {
        return <div>Error fetching tasks: {error}</div>;  // Show error message if any
    }

    return (
        <div className="parent-pending-tasks-container">
            <StudentHeader /> {/* Header at the top */}
            <div className="content-area">
                <ParentSNav /> {/* Sidebar on the left */}
                <div className="main-content"> {/* Main content on the right */}
                    <h1 className="tasks-heading">Pending Tasks</h1> {/* Place heading on top */}
                    <div className="tasks-list">
                        {tasks.map(task => (
                            <div className="task-card" key={task.quiz_id}>
                                <div className="task-content">
                                    <div className="task-icon"></div>
                                    <div className="task-details">
                                        <h2>{task.quiz_title}</h2>
                                        <p>{task.quiz_description}</p>
                                    </div>
                                    <div className="task-due-date">
                                        <p>Due by {new Date(task.quiz_due_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ParentPendingTasks;


