// src/components/teacherPages/TFeedback.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../objects/StudentHeader'; // Using StudentHeader
import TeacherSNav from '../objects/TeacherSNav';
import '../teacherstyle/TFeedback.css';

const TFeedback = () => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate('/teacher/TClassFeedback'); // Navigate to TClassFeedback
    };

    return (
        <div className="teacher-feedback-container">
            <StudentHeader /> {/* Top navbar */}
            <div className="teacher-side-navbar">
                <TeacherSNav /> {/* Side navbar */}
                <div className="teacher-feedback-content">
                    <h1 className="teacher-feedback-message">Feedback</h1>
                    <hr />
                    <table className="teacher-feedback-table">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Topic</th>
                                <th>Submissions</th>
                                <th>Close Date/Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="teacher-feedback-row">
                                <td>Class 4b</td>
                                <td>Adding and subtracting fractions</td>
                                <td>Submissions: 9/10</td>
                                <td>Close: Dec 09, 2024</td>
                                <td>
                                    <button className="teacher-feedback-button" onClick={handleDetailsClick}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                            <tr className="teacher-feedback-row">
                                <td>Class 4b</td>
                                <td>Adding and subtracting fractions</td>
                                <td>Submissions: 9/10</td>
                                <td>Close: Dec 09, 2024</td>
                                <td>
                                    <button className="teacher-feedback-button" onClick={handleDetailsClick}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TFeedback;
