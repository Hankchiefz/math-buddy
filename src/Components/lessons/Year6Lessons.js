// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year6Lessons = () => {
    return (
        <div className="student-lessons-container">
            <StudentHeader/>
            <div className="SLcontent-wrapper">
                <StudentSNav/>
                <div className="SLmain-content">
                <h1 className="lessons-title">Lessons</h1>
                <h2 className="lessons-sub-title">Monthly pre generated lessons for you to use however you want!</h2>
                
                
                <LessonCollapsibleBox 
                title="Addition"
                introduction="In Year 6, addition skills are put to the test with even bigger numbers and more complex problems. You'll become confident in adding large numbers and decimals, using efficient methods like column addition and mental strategies. We will also explore how addition connects with other operations, like subtraction and multiplication, and use it to solve real-world problems, including algebraic expressions and data interpretation. Mastering addition will build a strong foundation for all the math skills you'll need in secondary school!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/CoCmsyFQ_Xc?si=EfdPPPK6ACkFE9hE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.coolmathgames.com/0-7-segments-journey"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="In Year 6, subtraction is used in more advanced ways, involving large numbers, decimals, and even fractions! You’ll master subtraction in a variety of contexts, such as algebra, data handling, and real-life scenarios. We will practice finding the most efficient methods to subtract and understand how subtraction links to other operations like addition and multiplication. Subtraction will help you solve challenging problems and prepare for the more complex math you’ll encounter in secondary school!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/jgGAJOe-Bgg?si=TjW_Pa3R8pXNxcxp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.coolmathgames.com/0-solve-and-sail"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="In Year 6, multiplication becomes a powerful tool for solving complex problems. You’ll become an expert at multiplying larger numbers and decimals quickly and accurately. We’ll apply multiplication to solve a range of real-life problems, like working with fractions, percentages, and algebra. You’ll also learn to estimate and check your work for accuracy. Mastering multiplication will help you understand how numbers interact and prepare you for the challenges of secondary school math!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/vn7AC43cmZ0?si=XIsN1aUZxIUsv1Rx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.multiplication.com/games/play/pirates-ii-division"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="In Year 6, division skills become even more important. You’ll master dividing large numbers and decimals with confidence and speed. We’ll apply division in a variety of contexts, like solving algebraic expressions, working with fractions and percentages, and interpreting data. You’ll learn how to estimate answers and check your work for accuracy. Mastering division will help you tackle challenging math problems and prepare for secondary school!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/vytfcHk5ouA?si=jIizYlULx1T49RP5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
                gameLink="https://www.mathplayground.com/mathman_multiplication.html"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year6Lessons;