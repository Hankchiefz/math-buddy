import React from "react";
import ChildProgressChart from "../objects/chart.js";
import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";
import "../parentstyle/ParentProgressReport.css";

const ParentProgress= () => {
  return (
    <div class_name="progress-container">
        <StudentHeader />
        <ParentSNav />
        <div className="chart-container">
            <ChildProgressChart />
        </div>
    </div>
    
  );
}

export default ParentProgress;
