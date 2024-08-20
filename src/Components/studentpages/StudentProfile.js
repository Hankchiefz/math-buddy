// src/components/studentPages/StudentProfile.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import '../studentstyle/StudentProfile.css';

const StudentProfile = () => {
    return (
        <div className="student-profile-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="Side-navbar">
                <StudentSNav /> {/* Side navbar */}
                <div className="main-content">
                    <div className="s-profile">
                        <table className="spp-header-bar">
                            <thead>
                                <tr>
                                    <th>Your profile</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <button className="spp-edit-button">Edit</button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className="spp-tables-container">
                            <div className="spp-table-con">
                                <table className="spp-Personal-info">
                                    <thead>
                                        <tr>
                                            <th>Personal information</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class:</td>
                                            <td>4B</td>
                                        </tr>
                                        <tr>
                                            <td>DOB:</td>
                                            <td>December 3 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>Female</td>
                                        </tr>
                                        <tr>
                                            <td>Nationality:</td>
                                            <td>Australian</td>
                                        </tr>
                                        <tr>
                                            <td>Full name:</td>
                                            <td>Olivia Bennet</td>
                                        </tr>
                                        <tr>
                                            <td>Pronouns:</td>
                                            <td>She/Her</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="spp-table-con">
                                <table className="spp-contact-details">
                                    <thead>
                                        <tr>
                                            <th>Contact Details</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td>profile@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>Wollongong Primary School, Wollongong, NSW, 2500</td>
                                        </tr>
                                        <tr>
                                            <td>Phone number:</td>
                                            <td>+61 0000 0000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="spp-table-con-full">
                            <table className="spp-guardian-details">
                                <thead>
                                    <tr>
                                        <th>Parent/Guardian details</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>Greg Bennet</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>parent@example.com</td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td>+61 0000 0000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
