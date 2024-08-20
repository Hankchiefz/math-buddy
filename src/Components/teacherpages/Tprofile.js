// src/components/teacherPages/Tprofile.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader'; // Using StudentHeader
import TeacherSNav from '../objects/TeacherSNav'; // Using StudentSNav
import '../teacherstyle/Tprofile.css';

const Tprofile = () => {
    return (
        <div className="teacher-profile-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="Side-navbar">
                <TeacherSNav /> {/* Side navbar */}
                <div className="main-content">
                    <div className="t-profile">
                        <table className="tpp-header-bar">
                            <thead>
                                <tr>
                                    <th>Your profile</th>
                                    <th style={{ textAlign: 'right' }}>
                                        <button className="tpp-edit-button">Edit</button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className="tpp-table-con">
                            <table className="tpp-Personal-info">
                                <thead>
                                    <tr>
                                        <th>Personal information</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DOB:</td>
                                        <td>June 23 2003</td>
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
                                        <td>Valerie Frizzle</td>
                                    </tr>
                                    <tr>
                                        <td>Display name:</td>
                                        <td>Ms.Valerie Frizzle</td>
                                    </tr>
                                    <tr>
                                        <td>Pronouns:</td>
                                        <td>She/Her</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="tpp-table-con">
                            <table className="tpp-contact-details">
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
                                        <td>UOW, Wollongong, NSW, 2500</td>
                                    </tr>
                                    <tr>
                                        <td>Phone number:</td>
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

export default Tprofile;
