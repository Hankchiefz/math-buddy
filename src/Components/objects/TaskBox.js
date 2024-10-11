import React from 'react';
import './TaskBox.css';

const TaskBox = ({ title, task, dueDate }) => {
  return (
    <div className="task-box">
      <h3>{title}</h3>
      <p>{task}</p>
      <p>Due: {dueDate}</p>
    </div>
  );
};

export default TaskBox;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */