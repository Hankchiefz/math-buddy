import React, { useEffect } from 'react';
import StudentHeader from '../objects/StudentHeader';
import TeacherSNav from '../objects/TeacherSNav';
import '../teacherstyle/TeacherLessons.css';

const TeacherLessons = () => {

  // Save the "Lessons" page to recently accessed
  useEffect(() => {
    const newItem = { page: "/teacherlessons", label: "Lessons" };

    try {
      const storedRecentlyAccessed = JSON.parse(
        localStorage.getItem("recentlyAccessed") || "[]"
      );

      const updatedItems = [
        newItem,
        ...storedRecentlyAccessed.filter(
          (item) => item.page !== newItem.page || item.label !== newItem.label
        ),
      ].slice(0, 5); // Limit stored items to the latest 5

      localStorage.setItem("recentlyAccessed", JSON.stringify(updatedItems));
      console.log("Saved recently accessed items:", updatedItems);
    } catch (error) {
      console.error("Error saving recently accessed items:", error);
    }
  }, []); // Run once when component mounts

  return (
    <div className='teacher-lessons-container'>
      <StudentHeader/>
      <div className='TLcontent-wrapper'>
        <TeacherSNav/>
        <div className='TLmain-content'>
          <h1 className='teacher-lessons-title'>Lessons</h1>
          <p className='teacher-lessons-description'>Each year has their very own pre-generated lessons created for their age group!</p>
          <p className='teacher-lessons-description'>Click on your chosen year group below to be taken to their pre-generated lessons.</p>
        
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
