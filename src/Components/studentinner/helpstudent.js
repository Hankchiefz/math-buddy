import React from 'react';
import StudentHeader from '../objects/StudentHeader';
import '../studentstyle/helpstudent.css';

const HelpStudent = () => {
  return (
    <div className="student-help-container">
        <StudentHeader />
        <div className="student-help-content">
          <div className="student-help-header">
            <h1 className="student-help-title">Students, Welcome to MathBuddy!</h1>
          </div>
          <div className="student-help-body">
            <p className="student-help-text">
              We at MathBuddy, as well as your teachers, are so excited to have you using MathBuddy. One of MathBuddy's core goals is to make learning math and completing quizzes more fun for YOU! MathBuddy has been created in a way to be fun and simple so you can get to learning quickly.
            </p>

            <h2 className="student-help-subtitle">Exploring your Student Dashboard:</h2>
            <p className="student-help-text">
              The dashboard was created with efficiency and simplicity in mind to take any stress off your shoulders. It is your home of MathBuddy, where you can manage everything from quizzes to learning resources.
            </p>

            <h3 className="student-help-section">1. Quizzes:</h3>
            <ul className="student-help-list">
              <li>
                <strong>Viewing your quizzes:</strong> Click on the ‘quizzes’ button to view all of your active and past quizzes. You will be able to see the topic of the quiz, marks, time limit, and the due date/time.
              </li>
              <li>
                <strong>Quizzes:</strong> By clicking on one of the quizzes, you will either be able to complete the quiz if it has not been finished yet or review your past quizzes if they are already completed.
              </li>
              <li>
                <strong>Completing a quiz:</strong> When completing a quiz, you will be presented with questions to answer. On the right of the quiz page, you can view how many questions you have left and how much time remains. Once all questions are answered, click ‘submit quiz’ to finish and view your marks, feedback, and learning resources almost instantly.
              </li>
            </ul>

            <h3 className="student-help-section">2. Lessons:</h3>
            <p className="student-help-text">
              Lessons are pre-generated quizzes and learning resources. They provide an idea of how MathBuddy's AI generates information! Your teachers can see these too, so it's a good idea to check them often as they might be assigned as homework. Lessons are updated monthly to keep things fresh!
            </p>

            <h3 className="student-help-section">3. Feedback:</h3>
            <ul className="student-help-list">
              <li>
                Clicking the ‘feedback’ button will take you to the feedback main page. Here, you can view all assigned quizzes and their marks.
              </li>
              <li>
                By clicking the blue ‘feedback’ button for a specific quiz, you will see your mark, AI-generated feedback based on correct and incorrect answers, teacher feedback (if provided), and AI-recommended learning resources.
              </li>
            </ul>

            <h3 className="student-help-section">4. Learning Resources:</h3>
            <p className="student-help-text">
              Learning resources are available in the feedback area of a completed quiz. They are also displayed upon finishing a quiz. These resources are tailored to your performance on the quiz and may include videos, readings, practice sheets, or interactive games.
            </p>

            <h3 className="student-help-section">5. Active tasks:</h3>
            <p className="student-help-text">
              A quick way to see your active tasks is through the dashboard, displaying the Class, Subject, and Due Date/Time of each task.
            </p>

            <h3 className="student-help-section">6. Recently Accessed:</h3>
            <p className="student-help-text">
              The recently accessed area on your dashboard helps you easily return to where you left off, showing the areas you last accessed.
            </p>

            <h3 className="student-help-section">7. Profile:</h3>
            <p className="student-help-text">
              MathBuddy simplifies everything for YOU. Your profile contains only the necessary information for MathBuddy to function smoothly. Edit your profile or view details via the profile button.
            </p>

            <p className="student-help-conclusion">
              Congratulations, you’re now ready to use MathBuddy to its fullest potential! Have fun and happy learning! For further questions, feel free to contact the MathBuddy student team at <a href="mailto:students@mathbuddy.com">students@mathbuddy.com</a> or ask your teacher.
            </p>
          </div>
        </div>
      </div>
  );
};

export default HelpStudent;
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */