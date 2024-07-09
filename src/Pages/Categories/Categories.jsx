import { Link } from "react-router-dom"
import "./Categories.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
export default function Categories() {

    return (
        <div id="mainCategories">
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
