import React from 'react';
import './RecentlyAccessedBox.css';

const RecentlyAccessedBox = ({ iconColor, text, onClick }) => {
  return (
    <div className="recently-accessed-box" onClick={onClick}>
      <div className="icon" style={{ backgroundColor: iconColor }}></div>
      <span className="text">{text}</span>
    </div>
  );
};

export default RecentlyAccessedBox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */