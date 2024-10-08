// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year2Lessons = () => {
    return (
        <div className="student-lessons-container">
            <div className="SLcontent-wrapper">
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
                title="Addition"
                introduction="Addition is all about putting numbers together to find out the total. It's like joining two groups of things to see how many there are altogether. You might already know how to add small numbers, like 4 + 3 = 7. Now, we will practice adding bigger numbers! In Year 2, you'll learn to add numbers up to 20, use number lines, and find different ways to add numbers quickly. We’ll also learn to add using tens and ones, like 23 + 15. This will help us solve real-life problems, like adding up the cost of items or counting things in groups. Let's have fun learning to add more!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/Q9sLfMrH8_w?si=H7ietE-tWt7vWA_o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://au.mathgames.com/play/cat-wars.html"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="In Year 2, we get better at subtraction by practicing with bigger numbers up to 20. You’ll learn to subtract using a number line and explore how subtraction relates to addition. We’ll also use different strategies, like breaking numbers into parts or counting backward. Subtraction helps us solve problems, like finding out how much more we need to reach a goal or how many items are left after some are taken away. Let's keep practicing and become subtraction experts!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/ySkjVZ0ym7k?si=362yJ4Ido8iDqxf9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/ASB_Sailboat_Subtraction.html"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="In Year 2, we dive deeper into multiplication. We learn to multiply numbers up to 10 using fun methods, like drawing pictures, using number lines, and creating arrays (rows and columns of objects). You’ll start to learn some basic multiplication facts, like the 2, 5, and 10 times tables. Multiplication helps us solve problems quickly, like figuring out how many legs are on several chairs or how many candies are in a few bags. Let's practice and make multiplication fun!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/ySWnCWlF5TA?si=ejjUNzooSnXEzcJ6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/multiplication_snake.html"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="In Year 2, we begin to explore division more. You’ll learn to divide numbers up to 20 and understand division as 'sharing equally' or 'grouping equally.' We will use objects, drawings, and number lines to help us visualize division. You’ll also see how division is the opposite of multiplication. For example, if 3 × 2 = 6, then 6 ÷ 2 = 3. Division helps us solve problems, like sharing toys or snacks. Let’s practice and become great at dividing!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/2muobEZUalE?si=YmbYI9bCruBIjpOX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.multiplication.com/games/play/division-4-row"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year2Lessons;
