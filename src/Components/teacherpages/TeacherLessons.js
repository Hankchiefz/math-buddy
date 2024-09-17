// src/Components/studentpages/StudentClasses.js
import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import ClassesBox from '../objects/ClassBox'; // Import the ClassesBox component
import '../teacherstyle/TeacherLessons.css';

const TeacherLessons = () => {
  return (
    <div className='teacher-lessons-container'>
      <StudentHeader/>
      <div className='TLcontent-wrapper'>
        <TeacherSNav/>
        <div className='TLmain-content'>
          <h1 className='teacher-lessons-title'>Lessons</h1>
          <p className='teacher-lessons-description'>Each year has their very own pre generated lessons created for their age group!</p>
          <p className='teacher-lessons-description'>Click on your chosen year group below to be taken to their pre generated lessons.</p>
        
        <div className="teacher-lessons-button-container">
          <button className="teacher-lessons-button">Year 1</button>
          <button className="teacher-lessons-button">Year 2</button>
          <button className="teacher-lessons-button">Year 3</button>
          <button className="teacher-lessons-button">Year 4</button>
          <button className="teacher-lessons-button">Year 5</button>
          <button className="teacher-lessons-button">Year 6</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLessons;