import StudentHeader from "../objects/StudentHeader";
import ParentSNav from "../objects/ParentSNav";

const ParentHome = () => {
<div className = "parenthome-container">
    <StudentHeader/>
    <div className ="PHcontent-wrapper">
        <ParentSNav />
        <div className = "PHmain-content">
            <div className = "PHwelcome-message">
                
            </div>
        </div>
    </div>
</div>

};

export default ParentHome;