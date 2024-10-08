// src/components/pages/Lessons.js
import React from "react";
import "../studentstyle/StudentLessons.css";
import LessonCollapsibleBox from "../objects/LessonCollapsibleBox";
import TaskBox from "../objects/TaskBox";
import StudentHeader from "../objects/StudentHeader";
import StudentSNav from "../objects/StudentSNav";

const Year1Lessons = () => {
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
                introduction="Addition is when we combine two or more numbers to find out how many there are in total. Think of it like putting toys together in a pile! If you have 2 toy cars and you add 3 more, you'll have 5 toy cars altogether. We use the plus sign (+) to show addition. For example, 2 + 3 equals 5. Addition helps us count and solve everyday problems, like sharing treats or figuring out how many pencils are in a box. Let's practice adding numbers to become great at it!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Addition Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/Hj_qbcti1z8" title="Addition: Counting On // Year 1 KS1 1st Grade Maths" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://mathplayground.com/ASB_JetSkiAddition.html"
                 />

                <LessonCollapsibleBox 
                title="Subtraction"
                introduction="Subtraction is when we take away some objects from a group to see how many are left. Imagine you have 5 apples, and you eat 2. How many apples are left? Subtraction helps us find out! We use the minus sign (−) to show subtraction. For example, 5 - 2 equals 3.Subtraction is important for everyday tasks, like sharing, counting down, or finding out how many things remain. Let's start learning how to subtract and have fun doing it!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Subtraction Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/RA78NFzFLnw?si=Hj5LQX-J83FaQGM8" title="Think Addition to Subtract" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://www.mathplayground.com/puzzle_pics_subtraction_facts_to_20.html"
                 />

                <LessonCollapsibleBox 
                title="Multiplication"
                introduction="Multiplication is a way of adding the same number several times. It’s like putting things in equal groups. For example, if you have 3 bags with 2 apples in each bag, you can add 2 + 2 + 2, or you can multiply 3 × 2 to find out there are 6 apples in total. We use the multiplication sign (×) to show multiplication. Learning multiplication helps us count faster and solve everyday problems, like finding out how many days are in a week or how many fingers are on your hands. Let’s start exploring multiplication together!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Multiplication Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/fZFwHpiAVE0?si=pi-VMj_OMK_YJNGg" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://www.mathplayground.com/ASB_PenguinJumpMultiplication.html"
                 />

                <LessonCollapsibleBox 
                title="Division"
                introduction="Division is when we split a group of things into equal parts or share them equally. Imagine you have 6 cookies and want to share them with 2 friends. Division helps you find out how many cookies each friend gets. We use the division sign (÷) to show division. For example, 6 ÷ 2 equals 3.Learning division helps us understand how to share, group, and solve everyday problems, like dividing treats among friends. Let’s start learning division and make sharing fun!"
                quizData={{
                    quizId: 1,
                    status: 'incomplete',
                    title: 'Fractions Quiz',
                    dueDate: '2024-12-01',
                    timeLimit: '30 mins',
                    marks: '100',
                    onOpenQuiz: (id) => alert(`Opening quiz with ID: ${id}`)
                }}
                video={<iframe width="560" height="315" src="https://www.youtube.com/embed/5VaqKu0ENlY?si=WbBZVdrfKpMUs_64" title="Understanding Fractions" frameBorder="0" allowFullScreen></iframe>}
                gameLink="https://www.fun4thebrain.com/g/division/nibbles/"
                 />
                </div>
            </div>
        </div>
    );
};


export default Year1Lessons;
