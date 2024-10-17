// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year5Lessons = () => {
    return (
        <div className="student-lessons-container">
            <div className="SLcontent-wrapper">
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
                title="Addition"
                introduction="In Year 5, addition becomes even more important as we tackle larger numbers, including those with decimals! You’ll learn how to add numbers with up to two decimal places, which is super useful for dealing with money, measurements, and fractions. We’ll also practice adding in columns and refining our mental math strategies to work quickly and accurately. Understanding addition will help us solve multi-step problems and prepare for even more advanced math concepts."
                quizData={{
                    quizId: 1031,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/nHQ7VZ2oT9w?si=KTpQVKwA_849I1_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.coolmathgames.com/0-math-duck"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="In Year 5, subtraction challenges us with larger numbers and decimals! You’ll learn to subtract numbers with up to two decimal places, which is great for dealing with money and measurements. We will also solve multi-step problems that combine subtraction with other operations. You’ll develop efficient strategies for both written and mental subtraction, helping you to think quickly and accurately. Subtraction is an essential tool for solving complex math problems and understanding how numbers relate to each other."
                quizData={{
                    quizId: 1033,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/kST6fs9nQmU?si=XGM2qpyHUVHdFQfN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.coolmathgames.com/0-ninenin"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="In Year 5, multiplication takes us even further! You’ll learn to multiply numbers with up to four digits, including those with decimals, and understand how to use these skills in real-world situations, like finding the area of rectangles or working out large totals. We’ll also explore more efficient methods, such as the grid method or long multiplication, to handle bigger calculations. Multiplication will help you solve multi-step problems and build a solid foundation for more advanced math."
                quizData={{
                    quizId: 1035,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/NaECBQhTaCU?si=1S2fFPvBiuj-dn6m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/puzzle_pics_multiplication.html"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="In Year 5, division becomes more complex as we learn to divide numbers with up to four digits and include decimals. You’ll practice long division, where we divide numbers step-by-step, and handle larger numbers or those that don’t divide evenly. We’ll also explore division in real-life contexts, such as dividing distances, money, or quantities. Understanding division helps us solve multi-step problems and prepare for more advanced math."
                quizData={{
                    quizId: 1036,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/NaECBQhTaCU?si=h0l_Ez-i0wHPtMeN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.multiplication.com/games/play/sketchs-world-division"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year5Lessons;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */