// src/Components/studentpages/StudentClasses.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import ClassesBox from '../objects/ClassBox'; // Import the ClassesBox component
import '../teacherstyle/TeacherLessons.css';

const TeacherLessons = () => {
  return (
    <div className="teacherclasses-container">
      <StudentHeader /> {/* Top navbar */}
      <div className="TCcontent-wrapper">
        <TeacherSNav /> {/* Side navbar */}
        <div className="TCmain-content">
          <h1 className="classes-message">Lessons</h1>
          <div className="TCMain-Container">
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

export default TeacherLessons;