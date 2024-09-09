// src/components/teacherPages/TClassFeedback.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader'; // Importing StudentHeader
import StudentSNav from '../objects/StudentSNav'; // Importing StudentSNav
import '../teacherstyle/TClassFeedback.css';

const TClassFeedback = () => {
    return (
        <div className="teacher-class-feedback-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="teacher-side-navbar">
                <StudentSNav /> {/* Side navbar */}
                <div className="teacher-class-feedback-content">
                    <h1>Feedback - Class *ID*</h1>
                    <hr />
                    <div className="class-feedback-container">
                        <h2>Quiz 1 - Adding and subtracting fractions</h2>
                        <div className="cf-info-container">
                            <h3>Submissions: 9/10</h3>
                            <h3>Close: Dec 09 2024, 23:00</h3>
                            <h3>Class: 4B</h3>
                            <h3>Average mark: 73%</h3>
                        </div>
                        <hr />
                        <div className="cf-table-container">
                            <table className="cf-table">
                                <thead className="cf-table-head">
                                    <tr>
                                        <th>Student name</th>
                                        <th>Completed date/time</th>
                                        <th>Mark</th>
                                        <th>AI feedback</th>
                                        <th>Your comments</th>
                                    </tr>
                                </thead>
                                <tbody className="cf-table-body">
                                    <tr>
                                        <td>Olivia Bennet</td>
                                        <td>Dec 06 2024, 17:45</td>
                                        <td>100%</td>
                                        <td>"Excellent, Good work!"</td>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td>Ethan Carter</td>
                                        <td>Dec 07 2024, 19:00</td>
                                        <td>64%</td>
                                        <td>"Good try! Need to practice division.."</td>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td>Jackson Reed</td>
                                        <td>N/A</td>
                                        <td>0%</td>
                                        <td>N/A</td>
                                        <td><input type="text" value="Jackson has not completed his quiz again, please contact me" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="buttons-container">
                            <button className="save-feedback-button">Save edits</button>
                            <button className="approve-submit-feedback-button">Approve & Submit feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TClassFeedback;
