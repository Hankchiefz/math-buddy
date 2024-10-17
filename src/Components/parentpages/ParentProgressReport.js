import React, { useState, useEffect } from "react";
import ChildProgressChart from "../objects/chart.js";
import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";
import "../parentstyle/ParentProgressReport.css";

const ParentProgress = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="parent-progress-report-container">
            <StudentHeader />
            <div className="parent-content-area">
                <div className="parent-nav">
                    <ParentSNav /> 
                </div>
                <div className="parent-main-content">
                    <h1 className="progress-title">Progress Report</h1>
                    {loading ? (
                        // Show loading spinner while data is being loaded
                        <div className="loading-overlay">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        // Display chart once loading is complete
                        <div className="chart-wrapper">
                            <div className="chart">
                                <ChildProgressChart />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentProgress;
/*Rhianan Williams, MD Zuhayer Aousaf & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */