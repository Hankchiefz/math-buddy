import React, { useEffect, useState } from "react";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";
import "../studentstyle/StudentProfile.css";

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [updatedProfileData, setUpdatedProfileData] = useState({}); // State for editable inputs

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetch("https://mathbuddyapi.com/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({ token }), 
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProfileData(data); // Set the profile data from the response
          setUpdatedProfileData(data); // Initialize the editable fields with the fetched data
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false); // Stop loading in case of error
        });
    } else {
      console.error("No access token found");
      setLoading(false); // Stop loading if no token
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    const token = localStorage.getItem("access_token");
    fetch("https://mathbuddyapi.com/update_student_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...updatedProfileData, token }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setProfileData(updatedProfileData);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  if (loading) {
    return (
      <div className="student-profile-page">
        <StudentHeader />
        <div className="Side-navbar">
          <StudentSNav />
          <div className="main-contentSP">
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
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
          <StudentSNav />
          <div className="main-contentSP">
            <p>Error loading profile data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-profile-page">
      <StudentHeader />
      <div className="Side-navbar">
        <StudentSNav />
        <div className="main-contentSP">
          <div className="s-profile">
            <table className="spp-header-bar">
              <thead>
                <tr>
                  <th className="profile-title">Your profile</th>
                  <th className="profile-actions">
                    {editMode ? (
                      <>
                        <button
                          className="spp-save-button"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="spp-cancel-button"
                          onClick={toggleEditMode}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="spp-edit-button"
                        onClick={toggleEditMode}
                      >
                        Edit
                      </button>
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
                      <th>Personal Information</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Class:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="class_name"
                            value={updatedProfileData.class_name || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.class_name
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>DOB:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="date"
                            name="date_of_birth"
                            value={
                              updatedProfileData.date_of_birth
                                ? new Date(updatedProfileData.date_of_birth)
                                    .toISOString()
                                    .substr(0, 10)
                                : ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : profileData.date_of_birth ? (
                          new Date(
                            profileData.date_of_birth
                          ).toLocaleDateString()
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="gender"
                            value={updatedProfileData.gender || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.gender || "N/A"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Full Name:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="full_name"
                            value={updatedProfileData.full_name || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.full_name
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Preferred First Name:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="preferred_first_name"
                            value={
                              updatedProfileData.preferred_first_name || ""
                            }
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.preferred_first_name || "N/A"
                        )}
                      </td>
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
                      <td>
                        {editMode ? (
                          <input
                            type="email"
                            name="email"
                            value={updatedProfileData.email || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.email
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="address"
                            value={updatedProfileData.address || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          `${profileData.address || "N/A"}, ${
                            profileData.city || "N/A"
                          }, ${profileData.state || "N/A"}, ${
                            profileData.postal_code || "N/A"
                          }`
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Phone Number:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="tel"
                            name="mobile_phone"
                            value={updatedProfileData.mobile_phone || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          profileData.mobile_phone || profileData.home_phone
                        )}
                      </td>
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

export default StudentProfile;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 