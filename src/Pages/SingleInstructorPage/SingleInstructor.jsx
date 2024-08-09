import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./SingleInstructor.scss"
export default function SingleInstructor() {
    return (
        <div id="SingleInstructorPage">
            <div className="header">
                
                <p>
                    <Link to={"/"}>Home</Link>&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                    &nbsp; <Link to={"/courses"}>Courses</Link>
                </p>
            </div>
        </div>
    )
}
