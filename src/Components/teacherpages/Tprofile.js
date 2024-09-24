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
        // Fetch student profile data from the API
        const token = localStorage.getItem('access_token');
        
        if (token) {
            fetch('https://mathbuddyapi.com/teacherInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
                },
                body: JSON.stringify({ token }), // Optionally pass the token in the body as well if needed by the API
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProfileData(data); // Set the profile data from the response
                setUpdatedProfileData(data); // Initialize the editable fields with the fetched data
                setLoading(false); // Stop loading
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
                setLoading(false); // Stop loading in case of error
            });
        } else {
            console.error('No access token found');
            setLoading(false); // Stop loading if no token
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
        // Send the updated profile data to the API to save changes
        const token = localStorage.getItem('access_token');
        fetch('https://mathbuddyapi.com/update_teacher_profile', { // Ensure this endpoint exists in your API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
            },
            body: JSON.stringify({ ...updatedProfileData, token }), // Include the token in the body if needed by the API
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setProfileData(updatedProfileData); // Update the profile data with the new data
            setEditMode(false); // Exit edit mode and return to view mode
        })
        .catch(error => {
            console.error('Error saving profile data:', error);
        });
    };

    if (loading) {
        return (
            <div className="student-profile-page">
                <StudentHeader />
                <div className="Side-navbar">
                    <TeacherSNav />
                    <div className="main-contentTP">
                        <p>Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="student-profile-page">
                <StudentHeader />
                <div className="Side-navbar">
                    <TeacherSNav />
                    <div className="main-content">
                        <p>Error loading profile data.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="student-profile-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="Side-navbar">
                <TeacherSNav /> {/* Side navbar */}
                <div className="main-content">
                    <div className="s-profile">
                        <table className="spp-header-bar">
                            <thead>
                                <tr>
                                    <th>Your profile</th>
                                    <th style={{ textAlign: 'right' }}>
                                        {editMode ? (
                                            <>
                                                <button className="spp-save-button" onClick={handleSave}>Save</button>
                                                <button className="spp-cancel-button" onClick={toggleEditMode}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className="spp-edit-button" onClick={toggleEditMode}>Edit</button>
                                        )}
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
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
