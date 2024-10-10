import React, { useState, useEffect } from "react";
import ChildProgressChart from "../objects/chart.js";
import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";
import "../parentstyle/ParentProgressReport.css";

const ParentProgress = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading or fetch data if needed, then set loading to false
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust time or replace with actual data fetching logic

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
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
                        <div className="loading-overlay">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
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
