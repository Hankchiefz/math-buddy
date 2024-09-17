// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const StudentLessons = () => {
    return (
        <div className="student-lessons-container">
            <StudentHeader/>
            <div className="SLcontent-wrapper">
                <StudentSNav/>
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
        title="Understanding Fractions"
        introduction="Fractions represent parts of a whole. Learn the basics of fractions, how to use them in real life, and why they are important."
        article="Fractions are a fundamental concept in mathematics. They are used in many different contexts, such as sharing equally, dividing amounts, and measuring distances."
        quizData={{
          quizId: 1,
          status: 'incomplete',
          title: 'Fractions Quiz',
          dueDate: '2024-12-01',
          timeLimit: '30 mins',
          marks: '100',
          onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
        }}
        video={<iframe width="560" height="315" src="https://www.youtube.com/embed/videoid" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
        gameLink="https://mathbuddy.com/games/fractions"
      />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="Fractions represent parts of a whole. Learn the basics of fractions, how to use them in real life, and why they are important."
                article="Fractions are a fundamental concept in mathematics. They are used in many different contexts, such as sharing equally, dividing amounts, and measuring distances."
                buttonText="Start Learning"
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/videoid" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://mathbuddy.com/games/fractions"
                />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="Fractions represent parts of a whole. Learn the basics of fractions, how to use them in real life, and why they are important."
                article="Fractions are a fundamental concept in mathematics. They are used in many different contexts, such as sharing equally, dividing amounts, and measuring distances."
                buttonText="Start Learning"
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/videoid" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://mathbuddy.com/games/fractions"
                />

                <LessonCollapsibleBox 
                title="Fractions"
                introduction="Fractions represent parts of a whole. Learn the basics of fractions, how to use them in real life, and why they are important."
                article="Fractions are a fundamental concept in mathematics. They are used in many different contexts, such as sharing equally, dividing amounts, and measuring distances."
                buttonText="Start Learning"
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/videoid" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://mathbuddy.com/games/fractions"
                />
                </div>
            </div>
        </div>
    );
};


export default StudentLessons;