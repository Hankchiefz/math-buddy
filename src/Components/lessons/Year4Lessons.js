// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year4Lessons = () => {
    return (
        <div className="student-lessons-container">
            <div className="SLcontent-wrapper">
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
                title="Addition"
                introduction="By Year 4, addition takes us further into the world of big numbers! We’ll work on adding four-digit numbers and learn more about carrying numbers over to the next column. You’ll also start using addition in more complex problems, like solving word problems or adding measurements. We’ll explore different methods, like using a number line or partitioning, to help you find the most efficient way to add. Addition will help us understand patterns in numbers and develop our mental math skills."
                quizData={{
                    quizId: 1023,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/zmGb-njcLqY?si=YwmhXo7aduXijrhT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://au.mathgames.com/play/cat-wars.html"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="By Year 4, subtraction becomes even more interesting as we learn to subtract four-digit numbers. You’ll refine your column subtraction skills, especially when borrowing across multiple columns. We’ll explore subtraction in different contexts, such as solving word problems, comparing data, and understanding negative numbers. You'll also learn to subtract numbers quickly in your head using mental strategies. Subtraction helps us understand how numbers work and is key for solving many kinds of math problems."
                quizData={{
                    quizId: 1025,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/Oes_SA67mAk?si=7gyd943oWNckQOBv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/ASB_Sailboat_Subtraction.html"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="In Year 4, multiplication gets more exciting as we start multiplying larger numbers, such as two-digit and three-digit numbers. You will learn to multiply using the column method, where we set numbers up in columns and multiply step by step. We’ll also explore word problems that involve multiplication and learn how multiplication relates to division. Multiplication is useful for solving everyday problems, like working out costs or quantities, and for understanding bigger math concepts."
                quizData={{
                    quizId: 1027,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/6owKqFWej-w?si=w-vKy09QnHnG0JgL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/ASB_GrandPrixMultiplication.html"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="In Year 4, we deepen our understanding of division by learning to divide larger numbers, including three-digit numbers. You’ll practice using the short division method (often called the “bus stop” method) and work with remainders. We’ll solve word problems involving division and understand how it connects to multiplication and fractions. Division is essential for many real-world situations, like sharing costs or dividing objects into equal parts."
                quizData={{
                    quizId: 1029,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/2-sP854NMLw?si=Du9P3J0IDSVIcydK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.multiplication.com/games/play/ball-vs-blocks-division"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year4Lessons;