  // src/components/homepages/GuideTeacher.js
  import React from "react";
  import "../homepagestyle/GuideTeacher.css";

  const GuideTeacher = () => {
      return ( /*test*/
        <div className="teacher-guide">
        <div className="teacher-guide-header">
          <h1 className="teacher-guide-title">Welcome Teachers to the world of MathBuddy</h1>
        </div>
        <div className="teacher-guide-content">
          <p className="teacher-guide-text">
            We are extremely excited to have you on board. One of our core goals of MathBuddy is to help YOU by making teaching math easier! We want to make it enjoyable, simple, and lessen the stress you may have as a teacher by automating feedback, marking, and learning resources for your students.
          </p>
          <h2 className="teacher-guide-subtitle">Getting Started:</h2>
          <ol className="teacher-guide-list">
            <li>
              <strong>Sign up:</strong> First things first is creating your account! Head over to the sign-up page and fill in the required information.
              <ul>
                <li>
                  <strong>School pin:</strong> Your school should have provided you with a unique pin to create your account. Enter this pin when signing up to connect your MathBuddy account to your school's database. After doing all this, you will have your very own teacher MathBuddy account!
                </li>
              </ul>
            </li>
          </ol>
  
          <h2 className="teacher-guide-subtitle">Exploring YOUR Dashboard:</h2>
          <p className="teacher-guide-text">
            The dashboard was created with efficiency and simplicity in mind to take any stress off your shoulders. It is your home of MathBuddy; from here, you will be able to manage everything from students in your classes to quizzes.
          </p>
          <h3 className="teacher-guide-section">1. Classes:</h3>
          <ul className="teacher-guide-list">
            <li><strong>View Classes:</strong> See all your active classes with the click of a button.</li>
            <li><strong>Create new Class:</strong> Easily create new classes, whether it’s the start of the year, you’ve picked up a new class, or for any other reason! In this area, you will be able to add students in your school's database who have a MathBuddy account.</li>
            <li><strong>Managing classes:</strong> If you click on a class, you will be able to view each student in that active class, as well as their progress, active tasks, and much more!</li>
          </ul>
          
          <h3 className="teacher-guide-section">2. Quizzes:</h3>
          <ul className="teacher-guide-list">
            <li><strong>View active quizzes:</strong> Keep track of all your active quizzes. Click on the quizzes button to view current and past quizzes, along with their completion rate, average mark, due date, and more!</li>
            <li><strong>Create new quizzes:</strong> Click on the ‘create new quiz’ button. Specify which class the quiz is for, number of questions, topic, and the weight of the quiz!</li>
          </ul>
  
          <h3 className="teacher-guide-section">3. Feedback:</h3>
          <ul className="teacher-guide-list">
            <li><strong>View feedback:</strong> Click on the feedback area, then select the specific quiz you’d like to see feedback for. View AI-generated feedback and marks. You can edit individual feedback if needed!</li>
          </ul>
  
          <h3 className="teacher-guide-section">4. Lessons:</h3>
          <p className="teacher-guide-text">
            Lessons are pre-generated quizzes and learning resources to help you understand how MathBuddy's AI works! You can use these lessons as you like, and they are updated monthly.
          </p>
  
          <h3 className="teacher-guide-section">5. Active tasks:</h3>
          <p className="teacher-guide-text">
            Quickly see what tasks are active for your students. Displayed on the right of your dashboard, it shows the Class, Subject, and Due Date/Time of tasks.
          </p>
  
          <h3 className="teacher-guide-section">6. Recently Accessed:</h3>
          <p className="teacher-guide-text">
            Get back to where you were last time through the recently accessed area on your dashboard.
          </p>
  
          <h3 className="teacher-guide-section">7. Profile:</h3>
          <p className="teacher-guide-text">
            MathBuddy is designed to be simple for YOU. Your profile has the necessary information to help MathBuddy run efficiently. Edit your profile as needed!
          </p>
  
          <p className="teacher-guide-conclusion">
            Congratulations, you’re now ready to use MathBuddy to its fullest potential! Have fun and happy teaching! For further questions or concerns, please email our MathBuddy Teacher team at <a href="mailto:teachers@mathbuddy.com">teachers@mathbuddy.com</a>.
          </p>
        </div>
      </div>
      );
  };

  export default GuideTeacher;
