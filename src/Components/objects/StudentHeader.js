import { Link, useNavigate } from 'react-router-dom';
import './StudentHeader.css';

export default function StudentHeader() {
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.preventDefault();
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        
        if (confirmLogout) {
            // Clear cookies or localStorage
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem('access_token');
            localStorage.removeItem('userInfo');
            
            // Redirect to login page
            navigate('/login');
        }
    };

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
                    <Link to="/manual">
                        <img src={`${process.env.PUBLIC_URL}/images/home/manual-icon.png`} alt="Manual Icon" className="icontest" />
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to="/studentprofile">
                        <img src={`${process.env.PUBLIC_URL}/images/home/profile-icon.png`} alt="Profile Icon" className="icontest" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
