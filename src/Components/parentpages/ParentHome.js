import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";
import '../parentstyle/ParentHome.css';

const ParentHome = () => {
  return (
    <div className="parenthome-container">
      <StudentHeader />
      <div className="PHcontent-wrapper">
        <ParentSNav />
        <div className="PHmain-content">
            <div className="PHome-message">
                <div className="PHwelcome-message">Welcome</div>
            </div>
            <div className="childName">Child name</div>
            <div className="School">Wollongong School of Math - Class</div>

        </div>
      </div>
    </div>
  );
};

export default ParentHome;
