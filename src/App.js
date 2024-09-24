import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./Components/objects/Navbar";
import About from "./Components/homepages/About";
import Contact from "./Components/homepages/Contact";
import Home from "./Components/homepages/Home";
import Signup from "./Components/homepages/Signup";
import Tsign from "./Components/homepages/Tsignup";
import Login from "./Components/homepages/Login";
import StudentHome from "./Components/studentpages/StudentHome";
import StudentQuiz from "./Components/studentpages/StudentQuiz";
import TeacherLessons from "./Components/teacherpages/TeacherLessons";
import StudentLessons from "./Components/studentpages/StudentLessons";
import StudentProfile from "./Components/studentpages/StudentProfile";
import StudentQuizI from "./Components/studentinner/StudentQuizI";
import TActiveTasks from "./Components/teacherpages/TActiveTasks";
import TeacherHomepage from "./Components/teacherpages/TeacherHomepage";
import Tprofile from "./Components/teacherpages/Tprofile";
import TFeedback from "./Components/teacherpages/TFeedback";
import StudentFeedback from "./Components/studentpages/StudentFeedback";
import Tclasses from "./Components/teacherpages/Tclasses";
import Tclassview from "./Components/teacherpages/Tclassview.js";
import TNewClass from "./Components/teacherinner/TNewClass";
import StudentQuizComplete from "./Components/studentinner/StudentQuizComplete";
import TNewQuiz from "./Components/teacherinner/TNewQuiz";
import TClassFeedback from "./Components/teacherinner/TClassFeedback.js";
import HelpFAQ from "./Components/homepages/HelpFAQ.js";
import GuideTeacher from "./Components/homepages/GuideTeacher.js";
import Help from "./Components/homepages/Help.js";
import GuideStudent from "./Components/homepages/GuideStudent.js";
import ParentHome from "./Components/parentpages/ParentHome.js";
import ParentFeedback from "./Components/parentpages/ParentFeedback.js";
import ParentInfo from "./Components/parentpages/ParentInfo.js";
import ParentPending from "./Components/parentpages/ParentPendingTasks.js";
import ParentProgress from "./Components/parentpages/ParentProgressReport.js";
import ParentQuizComplete from "./Components/parentpages/parentinner/ParentQuizComplete.js";



function App() {
  const location = useLocation();

  // List of paths where NavBar from home should be hidden
  const hideNavBarPaths = [
    "/studenthome",
    "/studentquiz",
    "/teacherlessons",
    "/studentLessons",
    "/studentquizi",
    "/TActiveTasks",
    "/studentfeedback",
    "/teacherhomepage",
    "/Tclasses",
    "/tnewclass",
    "/StudentQuizComplete",
    "/tnewquiz",
    "/studentprofile",
    "/tprofile",
    "/tfeedback",
    "/TClassFeedback",
    "/parenthome",
    "/parentprofile",
    "/parentLessons",
    "/parentfeedback",
    "/tclassview"
  ];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      {/* Conditionally render NavBar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher-signup" element={<Tsign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/studentquiz" element={<StudentQuiz />} />
        <Route path="/teacherlessons" element={<TeacherLessons />} />
        <Route path="/studentLessons" element={<StudentLessons />} />
        <Route path="/studentfeedback" element={<StudentFeedback />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/studentquizi" element={<StudentQuizI />} />
        <Route path="/tactivetasks" element={<TActiveTasks />} />
        <Route path="/teacherhomepage" element={<TeacherHomepage />} />
        <Route path="/tclasses" element={<Tclasses />} />
        <Route path="/tnewclass" element={<TNewClass />} />
        <Route path="/studentquizcomplete" element={<StudentQuizComplete />} />
        <Route path="/tnewquiz" element={<TNewQuiz />} />
        <Route path="/tprofile" element={<Tprofile />} />
        <Route path="/tclassview" element={<Tclassview />} />
        <Route path="/tfeedback" element={<TFeedback />} />
        <Route path="/TClassFeedback" element={<TClassFeedback />} />
        <Route path="/faq" element={<HelpFAQ />} />
        <Route path="/teacherguide" element={<GuideTeacher />} />
        <Route path="/help" element={<Help />} />
        <Route path="/studentguide" element={<GuideStudent />} />
        <Route path="/parenthome" element={<ParentHome />} />
        <Route path="/parentLessons" element={<ParentPending />} />
        <Route path="/parenthome" element={<ParentHome />} />
        <Route path="/parentquiz" element={<ParentProgress />} />
        <Route path="/parentfeedback" element={<ParentFeedback />} />
        <Route path="/parentprofile" element={<ParentInfo />} />
        <Route path="/parentLessons" element={<ParentInfo />} />
        <Route path= "/tclassview" element={<Tclassview/>} />
        <Route path= "/parentquizcomplete" element={<ParentQuizComplete/>} />






      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
