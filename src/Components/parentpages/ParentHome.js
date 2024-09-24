import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";
import '../parentstyle/ParentHome.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const ParentHome = () => {
  const [fullName, setFullName] = useState('');
  const [childName, setChildName] = useState('');
  const [schoolClass, setSchoolClass] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the full name from localStorage
    const storedName = localStorage.getItem('full_name');
    if (storedName) {
      setFullName(storedName);
    }
    //Other stuff here
    // Fetch child info from the backend
    const fetchChildInfo = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const response = await fetch('https://mathbuddyapi.com/childinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch child info');
          }
  
          const data = await response.json();
          setChildName(data.childName); // Assuming childName is returned
          setSchoolClass(data.schoolClass); // Assuming schoolClass is returned
        } catch (error) {
          console.error('Error fetching child info:', error);
        }
      };
  
      fetchChildInfo();
    
    }, []);
  
  
  
  return (
    <div className="parenthome-container">
      <StudentHeader />
      <div className="PHcontent-wrapper">
        <ParentSNav />
        <div className = "PHmain-content">
        <div className="PHome-message">
            <div className="PHwelcome-message">Welcome {fullName}</div>
        </div>
            <div className="childName">Child name {childName}</div>
            <div className="School">Wollongong School of Math - Class</div>
            {/* Image and buttons container */}
          <div className="image-buttons-container">
            <img
              src="/images/home/face.png"
              alt="Child Profile"
              className="child-profile-image"
            />

            <div className="button-group">
              <button className="profile-button first-button" onClick={() => navigate('/parentLessons')}>View Pending Tasks</button>
              <button className="profile-button second-button" onClick={() => navigate('/parentquiz')}>View Progress Report</button>
              <button className="profile-button third-button" onClick={() => navigate('/parentfeedback')}>View Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHome;
