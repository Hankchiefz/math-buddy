import React from 'react';
import '../homepagestyle/HelpFAQ.css';
import CollapsibleBox from '../objects/CollapsibleBox';

const HelpFAQ = () => {
  return (
    <div className="help-faq-page">
      <div className="help-faq-header">
          <h1 className='faq-title'>Frequently Asked Questions</h1>
          <hr className='faq-line'></hr>
          <div className='help-faq-content'>
            <h2 className ='faq-sub-title'>Teachers</h2>
            <CollapsibleBox 
            question="How does MathBuddy generate quizzes?" 
            answer="MathBuddy Generates quizzes through our custom made RAG systems with the use of metas oLLama. We have taught oLLama the correct format for questions and answers for our quizzes as well as the mathematics behind the questions." 
            />
            <CollapsibleBox
            question="Can I customise the quizzes for my class’s specific needs?"
            answer="Absolutely, When creating a quiz for your class you will be able to select the topic, difficulty and amount of questions. From there MathBuddys AI will create a brand new quiz for your students to complete."
            />
            <CollapsibleBox
            question="How accurate is the AI in marking student quizzes?"
            answer="MathBuddys marking is 99.99% accurate, during the quiz generation the MathBuddy AI generates its questions and answers at the same time, it then double checks the answer to the question before sending out the new quiz."
            />
            <CollapsibleBox
            question="Can the AI feedback be reviewed before it is sent to students?"
            answer="To make the classroom smoother for teachers MathBuddy will automatically send out specific feedback to students upon completing a quiz. Teachers will have the option to edit the feedback if they wish to and a notification will be emailed to the student informing them that their feedback has been edited."
            />
            <CollapsibleBox
            question="How does MathBuddy recommend learning resources for students?"
            answer="MathBuddy recommends learning resources to students based on how the individual student went during a quiz. For example if a student is doing a quiz focused on addition and subtraction and they struggle with the subtraction questions, MathBuddy will suggest subtraction focused learning resources for the student to complete."
            />
              <h2 className ='faq-sub-title'>Students</h2>
            <CollapsibleBox
            question="How do I start using MathBuddy?"
            answer="To start using MathBuddy create an account with your school email. From there you will have to wait until your teacher adds you to your class! If you want to get familiar with MathBuddy before hand head over to the student user manual to get a feel for MathBuddy!"
            />
            <CollapsibleBox
            question="What should I do if I don't understand a question on the quiz?"
            answer="If you don’t understand a question that is a-okay! MathBuddy is here to help you learn and understand mathematics. Answer the quiz questions the best you can then once submitted you'll be recommended learning resources for the questions you wouldn't understand. Your parents and teachers will also be able to see what you missed and will be able to help you learn!"
            />
             <h2 className ='faq-sub-title'>Parents</h2>
            <CollapsibleBox
            question="How does MathBuddy help my child improve their maths skills?"
            answer="MathBuddy is able to understand the level your child is at on certain topics. Whilst completing quizzes set by teachers MathBuddy will keep track of the overall mark as well as the average mark on different topics. From here you will be able to use MathBuddys pre generated lessons on the topics your child may struggle on to help them improve their maths skills!"
            />
            <CollapsibleBox
            question="Can I see the quizzes and feedback my child receives?"
            answer="Absolutely yes! Not only can you see when your child has an active quiz that they need to complete, you can also see the quizzes they have completed as well as the grade, time completed, feedback and recommended learning resources!"
            />
            <CollapsibleBox
            question="Will MathBuddy work on different devices at home?"
            answer="Unfortunately MathBuddy is not currently Mobile & Tablet friendly; but MathBuddy can be used on any desktop device at school or at home!"
            />
            <CollapsibleBox
            question="Can I get reports on my child’s progress?"
            answer="Yes you can! You will be able to see what topics your child thrives in and what topics they may need a little bit more practice on. You will also be able to see the timeline of your childs marks on quizzes that they have completed so you can see how they have improved since using MathBuddy!"
            />
            <CollapsibleBox
            question="What kind of learning resources does MathBuddy recommend?"
            answer="MathBuddy recommends specific learning resources based on each individuals results. Learning resources will come as videos, articles, practice questions and sometimes even links to educational games on coolmathgames.com"
            />
            <h2 className ='faq-sub-title'>Schools</h2>
            <CollapsibleBox
            question="What are the key features of MathBuddy for schools?"
            answer="When a school starts using MathBuddy it takes the pressure off of teachers shoulders by using AI to create, mark, provide feedback and learning resources for student quizzes. This saves teachers time which they can then spend focusing on students in class instead of grading quizzes."
            />
            <CollapsibleBox
            question="Can MathBuddy be integrated with our school’s existing systems?"
            answer="Currently MathBuddy is a stand alone application, in the future we hope to be able to provide integration for schools. "
            />
            <CollapsibleBox
            question="What kind of training is provided for teachers using MathBuddy?"
            answer="MathBuddy has been created with a simple user-friendly design. It is easy to pick up and use especially after a quick read of the User Guide! If teachers have any further questions or need further help please contact our teacher team at teachers@mathbuddy.com"
            />
  
        </div>     
      </div>
    </div>
  );
};

export default HelpFAQ;
