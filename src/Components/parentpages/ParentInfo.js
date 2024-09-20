import React, { useEffect, useState } from 'react';
import StudentHeader from '../objects/StudentHeader';
import ParentSNav from '../objects/ParentSNav';
import '../parentstyle/ParentInfo.css';

const ParentProfile = () => {
    const [profileData, setProfileData] = useState(null); // State to hold profile data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [editMode, setEditMode] = useState(false); // State to manage edit mode
    const [updatedProfileData, setUpdatedProfileData] = useState({}); // State for editable inputs

    useEffect(() => {
        // Fetch parent profile data from the API
        const token = localStorage.getItem('access_token');
        
        if (token) {
            fetch('https://mathbuddyapi.com/parent_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

        // Update recently accessed
        const newItem = { page: '/parentprofile', label: 'Profile' };
        try {
            const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
            const updatedItems = [newItem, ...storedRecentlyAccessed.filter(item =>
                item.page !== newItem.page || item.label !== newItem.label
            )].slice(0, 5);
            localStorage.setItem('recentlyAccessed', JSON.stringify(updatedItems));
            console.log('Saved recently accessed items:', updatedItems);
        } catch (error) {
            console.error('Error saving recently accessed items:', error);
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
        fetch('https://mathbuddyapi.com/update_parent_info', {
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

    if (loading) {
        return (
            <div className="parent-profile-page">
                <StudentHeader />
                <div className="Side-navbar">
                    <ParentSNav />
                    <div className="main-content">
                        <p>Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="parent-profile-page">
                <StudentHeader />
                <div className="Side-navbar">
                    <ParentSNav />
                    <div className="main-content">
                        <p>Error loading profile data.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="parent-profile-page">
            <StudentHeader /> {/* Top navbar */}
            <div className="Side-navbar">
                <ParentSNav /> {/* Side navbar */}
                <div className="main-content">
                    <div className="p-profile">
                        <table className="ppp-header-bar">
                            <thead>
                                <tr>
                                    <th>Your profile</th>
                                    <th style={{ textAlign: 'right' }}>
                                        {editMode ? (
                                            <>
                                                <button className="ppp-save-button" onClick={handleSave}>Save</button>
                                                <button className="ppp-cancel-button" onClick={toggleEditMode}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className="ppp-edit-button" onClick={toggleEditMode}>Edit</button>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                        <div className="ppp-tables-container">
                            <div className="ppp-table-con">
                                <table className="ppp-Personal-info">
                                    <thead>
                                        <tr>
                                            <th>Personal information</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Full name:</td>
                                            <td>{editMode ? (
                                                <input type="text" name="full_name" value={updatedProfileData.full_name || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.full_name
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{editMode ? (
                                                <input type="email" name="email" value={updatedProfileData.email || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.email
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone number:</td>
                                            <td>{editMode ? (
                                                <input type="tel" name="phone_number" value={updatedProfileData.phone_number || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.phone_number
                                            )}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="ppp-table-con">
                                <table className="ppp-address-details">
                                    <thead>
                                        <tr>
                                            <th>Address Details</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{editMode ? (
                                                <input type="text" name="address" value={updatedProfileData.address || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.address
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td>City:</td>
                                            <td>{editMode ? (
                                                <input type="text" name="city" value={updatedProfileData.city || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.city
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td>State:</td>
                                            <td>{editMode ? (
                                                <input type="text" name="state" value={updatedProfileData.state || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.state
                                            )}</td>
                                        </tr>
                                        <tr>
                                            <td>Postal code:</td>
                                            <td>{editMode ? (
                                                <input type="text" name="postal_code" value={updatedProfileData.postal_code || ''} onChange={handleInputChange} />
                                            ) : (
                                                profileData.postal_code
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

export default ParentProfile;
