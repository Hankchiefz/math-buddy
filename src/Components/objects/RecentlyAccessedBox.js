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
