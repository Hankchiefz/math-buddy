import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../homepagestyle/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" }); // State to manage the email and password input fields
    const [error, setError] = useState(""); // State to handle error messages
    const [loading, setLoading] = useState(false); // State to show a loading spinner during login process
    const [showPopup, setShowPopup] = useState(false); // State to show the "Thank you for registering" popup

    useEffect(() => {
        // Check if a "showRegisterPopup" flag is set in localStorage to display the registration popup
        if (localStorage.getItem("showRegisterPopup") === "true") {
            setShowPopup(true);
            localStorage.removeItem("showRegisterPopup"); // Clear the flag after showing the popup
        }
    }, []);

    // Function to handle input change in the form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle login
    const handleLogin = () => {
        setLoading(true); // Show loading spinner
        const url = "https://mathbuddyapi.com/login";
        const data = {
            email: formData.email,
            password: formData.password,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                setLoading(false); // Hide loading spinner
                if (!response.ok) {
                    throw new Error("Network response was not ok"); // Handle network errors
                }
                return response.json();
            })
            .then((data) => {
                console.log("Backend response:", data); // Log response for debugging

                if (data.access_token) {
                    // Save the access token and user details (full_name, role) to localStorage
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("full_name", data.personObj.full_name);
                    localStorage.setItem("role", data.personObj.role);

                    // Redirect based on the user's role
                    if (data.personObj.role === "student") {
                        navigate("/studenthome");
                    } else if (data.personObj.role === "teacher") {
                        navigate("/teacherhomepage");
                    } else if (data.personObj.role === "parent") {
                        navigate("/parenthome");
                    } else {
                        setError("Unknown role"); // Handle unknown roles
                    }
                } else {
                    setError(data.message || "Invalid email or password"); // Display error if login fails
                }
            })
            .catch((error) => {
                setLoading(false); // Hide loading spinner
                console.error("There was an error!", error);
                setError("There was an error during login"); // Set  error message
            });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        handleLogin(); // Trigger the login process
    };

    return (
        <div className="login-page">
            {/* Display loading spinner when the login process is ongoing */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <h1>Welcome Back</h1>
            <h2>Sign In!</h2>
            {/* Login form */}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Options to remember user and reset password */}
                <div className="options">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#forgot-password">Forgot Password?</a>
                </div>
                {/* Display error message if there's an error */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Login button */}
                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Sign In"}
                </button>
            </form>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Thank you for registering! :)</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="popup-close-button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
/*Rhianan Williams, Nathan Suryadi & Lachlan Angelis, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */ 