import React, { useEffect } from 'react';
import StudentHeader from '../objects/StudentHeader';
import StudentSNav from '../objects/StudentSNav';
import ClassesBox from '../objects/ClassBox'; // Import the ClassesBox component
import '../studentstyle/StudentLessons.css';

const StudentLessons = () => {
  
  useEffect(() => {
    // Update recently accessed
    const newItem = { page: '/studentLessons', label: 'Lessons' };
    try {
      const storedRecentlyAccessed = JSON.parse(localStorage.getItem('recentlyAccessed') || '[]');
      const updatedItems = [newItem, ...storedRecentlyAccessed.filter(item =>
        item.page !== newItem.page || item.label !== newItem.label
      )].slice(0, 5);
      localStorage.setItem('recentlyAccessed', JSON.stringify(updatedItems));
      console.log('Saved recently accessed items:', updatedItems);
    } catch (error) {
      console.error('Error saving recently accessed items:', error);
    }
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="studentclasses-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="SCcontent-wrapper">
        <StudentSNav /> {/* Side navbar */}
        <div className="SCmain-content">
          <h1 className="classes-message">Lessons</h1>
          <div className="SCMain-Container">
            {/* Add ClassesBox components here */}
            <ClassesBox
              icon="%"
              title="Fractions and Decimals"
              time=""
              topics={10}
              tasks={5}
            />
            {/* You can add more ClassesBox components as needed */}
            <ClassesBox
              icon="∑"
              title="Algebra Basics"
              time=""
              topics={8}
              tasks={4}
            />
            <ClassesBox
              icon="△"
              title="Geometry Fundamentals"
              time=""
              topics={12}
              tasks={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLessons;
