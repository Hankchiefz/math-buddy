import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from "../objects/TeacherSNav";
import '../teacherstyle/Tprofile.css';

const TeacherProfile = () => {
    const [profileData, setProfileData] = useState(null); // State to hold profile data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [editMode, setEditMode] = useState(false); // State to manage edit mode
    const [updatedProfileData, setUpdatedProfileData] = useState({}); // State for editable inputs

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        if (token) {
            fetch('https://mathbuddyapi.com/teacherInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
                },
                body: JSON.stringify({ token }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProfileData(data);
                setUpdatedProfileData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            });
        } else {
            console.error('No access token found');
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfileData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        const token = localStorage.getItem('access_token');
        fetch('https://mathbuddyapi.com/update_teacher_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...updatedProfileData, token }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setProfileData(updatedProfileData);
            setEditMode(false);
        })
        .catch(error => {
            console.error('Error saving profile data:', error);
        });
    };

    return (
        <div className="teacher-profile-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="Side-navbar">
                <TeacherSNav /> {/* Side navbar */}
                <div className="main-contentTP">
                    {loading ? (
                        <p>Loading profile...</p>
                    ) : !profileData ? (
                        <p>Error loading profile data.</p>
                    ) : (
                        <div className="t-profile">
                            <div className="tpp-header-bar">
                                <th>Your profile</th>
                                <div className="edit-button-container">
                                    {editMode ? (
                                        <>
                                            <button className="tpp-edit-button" onClick={handleSave}>Save</button>
                                            <button className="tpp-edit-button" onClick={toggleEditMode}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="tpp-edit-button" onClick={toggleEditMode}>Edit</button>
                                    )}
                                </div>
                            </div>
                            <div className="tpp-tables-container">
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
                                                <td>Class:</td>
                                                <td>{editMode ? (
                                                    <input type="text" name="class" value={updatedProfileData.class || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.class
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>DOB:</td>
                                                <td>{editMode ? (
                                                    <input type="date" name="date_of_birth" value={new Date(updatedProfileData.date_of_birth).toISOString().substr(0, 10)} onChange={handleInputChange} />
                                                ) : (
                                                    new Date(profileData.date_of_birth).toLocaleDateString()
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender:</td>
                                                <td>{editMode ? (
                                                    <input type="text" name="gender" value={updatedProfileData.gender || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.gender
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>Full name:</td>
                                                <td>{editMode ? (
                                                    <input type="text" name="full_name" value={updatedProfileData.full_name || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.full_name
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>Pronouns:</td>
                                                <td>{editMode ? (
                                                    <input type="text" name="pronouns" value={updatedProfileData.pronouns || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.pronouns
                                                )}</td>
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
                                                <td>{editMode ? (
                                                    <input type="email" name="email" value={updatedProfileData.email || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.email
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>Address:</td>
                                                <td>{editMode ? (
                                                    <input type="text" name="address" value={updatedProfileData.address || ''} onChange={handleInputChange} />
                                                ) : (
                                                    `${profileData.address}, ${profileData.city}, ${profileData.state}, ${profileData.postal_code}`
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone number:</td>
                                                <td>{editMode ? (
                                                    <input type="tel" name="mobile_phone" value={updatedProfileData.mobile_phone || ''} onChange={handleInputChange} />
                                                ) : (
                                                    profileData.mobile_phone || profileData.home_phone
                                                )}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
