// src/components/pages/Help.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../homepagestyle/Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1 className="help-title">Hi, How can we HELP?</h1>
        <hr className="help-line" />
        <div className="help-content">
          <div className="help-button-container">
            {/* Add the new CSS class to the Link */}
            <Link to="/faq" className="help-button-link">
              <button className="help-button">Frequently asked questions</button>
            </Link>
            <Link to="/studentguide" className='help-button-link'>
              <button className="help-button">Student Guide</button>
            </Link>
            <Link to='/teacherguide' className='help-button-link'>
              <button className="help-button">Teacher Guide</button>
            </Link>
            <Link to='/parentguide' className='help-button-link'>
              <button className="help-button">Parent Guide</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
