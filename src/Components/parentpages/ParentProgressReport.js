import React from "react";
import ChildProgressChart from "../objects/chart.js";

const ParentProgress= () => {
  return (
    <div className="App">
      <h1>Quiz Progress</h1>
      <ChildProgressChart />
      <h1>hi</h1>
    </div>
  );
}

export default ParentProgress;
