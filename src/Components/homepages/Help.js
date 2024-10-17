import React from 'react';
import { Link } from 'react-router-dom'; 
import '../homepagestyle/Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1 className="help-title">Hello, How can we Help?</h1>
        <div className="help-content">
          <div className="help-button-container">
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
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */