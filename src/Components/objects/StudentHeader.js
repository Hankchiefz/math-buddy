import { Link, useNavigate } from 'react-router-dom';
import './StudentHeader.css';
import { useState, useEffect } from 'react';

export default function StudentHeader() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Get user role from localStorage
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setUserType(storedRole);
        }
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        
        if (confirmLogout) {
            // Clear localStorage
            document.cookie = "access_token=; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";
            localStorage.removeItem('access_token');
            localStorage.removeItem('full_name');
            localStorage.removeItem('role');
            
            // Redirect to login page
            navigate('/login');
        }
    };

    // Determine the profile and manual links based on user type
    let profileLink = '/studentprofile';
    let manualLink = '/manual';

    if (userType === 'parent') {
        profileLink = '/parentprofile';
        manualLink = '/helpparent'; // Adjust if you have a specific manual for parents
    } else if (userType === 'teacher') {
        profileLink = '/tprofile'; // Adjust to your teacher profile route
        manualLink = '/helpteacher'; // Adjust if there's a specific manual for teachers
    } else if (userType === 'student') {
        profileLink = '/studentprofile';
        manualLink = '/helpstudent';
    } else {
        // Handle unknown or missing user type
        profileLink = '/login';
        manualLink = '/manual';
    }

    return (
        <nav className="nav">
            <div className="nav-left">
                <a href="/" onClick={handleLogoClick}>
                    <img src={`${process.env.PUBLIC_URL}/images/home/Mathbuddylogo.png`} alt="Math Buddy Logo" className="site-logo" />
                </a>
                <span className="desc">Wollongong, School of Math</span>
            </div>
            <div className="nav-right">
                <div className="nav-item">
                    <Link to={manualLink}>
                        <img src={`${process.env.PUBLIC_URL}/images/home/manual-icon.png`} alt="Manual Icon" className="icontest" />
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to={profileLink}>
                        <img src={`${process.env.PUBLIC_URL}/images/home/profile-icon.png`} alt="Profile Icon" className="icontest" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
