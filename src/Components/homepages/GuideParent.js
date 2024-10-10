// src/components/pages/ParentGuide.js
import React from 'react';
import '../homepagestyle/GuideParent.css';

const GuideParent = () => {
  return (
    <div className="parent-guide">
      <div className="parent-guide-header">
        <h1 className="parent-guide-title">Parents, Welcome to MathBuddy!</h1>
      </div>
      <div className="parent-guide-content">
        <p className="parent-guide-text">
          We at MathBuddy are excited to support you and your child on their math learning journey. With MathBuddy, you can stay informed about your child’s progress, assignments, and strengths, making it easier to offer guidance and encouragement.
        </p>

        <h2 className="parent-guide-subtitle">Exploring Your Parent Dashboard:</h2>
        <p className="parent-guide-text">
          The dashboard gives you all the tools you need to monitor and support your child’s progress in math. From viewing assigned quizzes to tracking feedback, it's all here.
        </p>

        <h3 className="parent-guide-section">1. Account Creation:</h3>
        <p className="parent-guide-text">
          When your child creates their student account, a parent account is automatically generated for you. You’ll receive an email with your login credentials, so no extra steps are required to get started.
        </p>

        <h3 className="parent-guide-section">2. Pending Tasks:</h3>
        <ul className="parent-guide-list">
          <li>
            <strong>Viewing pending tasks:</strong> In the "Tasks" section, you can see all quizzes that have been assigned to your child by their teacher but are still pending. This is a great way to keep track of their upcoming responsibilities.
          </li>
        </ul>

        <h3 className="parent-guide-section">3. Monthly Lessons:</h3>
        <p className="parent-guide-text">
          MathBuddy offers pre-generated monthly lessons that are designed to help reinforce key math concepts. These lessons are available under the "Lessons" tab and provide an additional learning resource for your child, based on the curriculum.
        </p>

        <h3 className="parent-guide-section">4. Child's Feedback and Marks:</h3>
        <ul className="parent-guide-list">
          <li>
            <strong>Viewing feedback:</strong> In the "Feedback" section, you can view all of your child’s completed quizzes and their marks. This section also provides detailed AI-generated feedback and suggestions for improvement.
          </li>
        </ul>

        <h3 className="parent-guide-section">5. Progress Report:</h3>
        <p className="parent-guide-text">
          The "Progress" section helps you monitor your child’s performance over time. You’ll see their marks on quizzes, a visual representation of their progress, and insights into what they excel at, allowing you to better support their learning needs.
        </p>

        <p className="parent-guide-conclusion">
          Thank you for being a part of the MathBuddy family! We are committed to helping your child succeed in math. For further questions, feel free to contact the MathBuddy parent support team at <a href="mailto:parents@mathbuddy.com">parents@mathbuddy.com</a>.
        </p>
      </div>
    </div>
  );
};

export default GuideParent;
