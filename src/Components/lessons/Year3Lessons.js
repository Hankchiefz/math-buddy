// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year3Lessons = () => {
    return (
        <div className="student-lessons-container">
            <div className="SLcontent-wrapper">
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
                title="Addition"
                introduction="In Year 3, addition becomes even more exciting! We'll learn to add larger numbers, like those in the hundreds. You’ll practice adding using column methods, where we line up numbers by their place value (hundreds, tens, and ones). We'll also learn mental strategies for adding numbers, like rounding and breaking numbers apart to make them easier to add. Addition helps us solve problems, whether it’s figuring out change when shopping or calculating the score in a game!"
                quizData={{
                    quizId: 1028,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/cMQbxqMQOLg?si=YT0QYaqL0qzef356" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://au.mathgames.com/play/cat-wars.html"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="In Year 3, subtraction involves even larger numbers, such as those in the hundreds. We will learn to use the column method for subtraction, where we line up numbers by their place values and sometimes borrow from the next column. This skill will help us solve problems, like finding differences in measurements or calculating change. We’ll also practice mental math strategies, like rounding and adjusting, to make subtraction quicker and easier. Subtraction will become a useful tool in solving everyday challenges!"
                quizData={{
                    quizId: 1030,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/qKxQ33KcRWQ?si=wMpTnTPURXYZ80nh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/ASB_Sailboat_Subtraction.html"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="By Year 3, you’ll become more confident with multiplication. You will learn all the multiplication facts up to 12 × 12 and use these facts to solve problems. We’ll explore different strategies, like using repeated addition, arrays, and the distributive property (breaking numbers apart to multiply). Multiplication will help you understand patterns in numbers and solve real-life problems, like finding the total number of items in several groups or calculating the area of a shape."
                quizData={{
                    quizId: 1032,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/LD4zp8ruvaI?si=KHdnCoDVQ35AU1G_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/math_monster_multiplication.html"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="By Year 3, you’ll practice division with larger numbers and learn division facts related to multiplication tables up to 12. We’ll use different strategies, like grouping, repeated subtraction, and using arrays, to understand how division works. You’ll also learn about remainders – when a number doesn’t divide evenly. Division will help you solve everyday problems, such as dividing items into groups or figuring out how many times one number fits into another."
                quizData={{
                    quizId: 1034,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/VCkvIAiwpxA?si=IOtdunJiVgT3wFoH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.multiplication.com/games/play/tricky-ball-division"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year3Lessons;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */