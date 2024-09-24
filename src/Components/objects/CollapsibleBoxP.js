// src/Components/objects/CollapsibleBox.js
import React, { useState } from "react";
import "./CollapsibleBox.css";

const CollapsibleBoxP = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(true); // Set to true to have it open by default

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-box">
      <div className="collapsible-header" onClick={toggleBox}>
        <h2>{question}</h2>
        <span className="collapsible-icon">{isOpen ? "▼" : "►"}</span>
      </div>
      {isOpen && <div className="collapsible-content">{answer}</div>}
    </div>
  );
};

export default CollapsibleBoxP;
