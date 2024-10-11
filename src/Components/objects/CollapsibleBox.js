import React, { useState } from 'react';
import './CollapsibleBox.css';

const CollapsibleBox = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-box" onClick={toggleBox}>
      <div className="collapsible-box-header">
        <h3>{question}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && <p>{answer}</p>}
    </div>
  );
};

export default CollapsibleBox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */