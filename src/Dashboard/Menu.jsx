import { Link } from "react-router-dom";
import logo from "../assets/images/graduationWhite.png"
export default function Menu() {
    return (
        <div id="Menu" className="position-fixed h-100 col-12 col-md-5 col-lg-4 col-xl-3 d-none d-md-block">
            <div className="d-flex justify-content-between align-items-center topMenu">
                <Link to={"/"}
                    className="d-flex align-items-center gap-2 logo p-3">
                    <img src={logo} alt="" />
                    <p className=" mt-3 siteName">EduJourney</p>
                </Link>
            </div>
            <div className="p-3 d-flex flex-column gap-4 LINKS">
                <Link to={"/"} className="p-1">
                    Home Page
                </Link>
                <Link to={"/about"} className="p-1">
                    All Courses
                </Link>
                <Link to={"/courses"} className="p-1">
                    Categories
                </Link>
                <Link to={"/contact"} className="p-1">
                    Reviews
                </Link>
                <Link to={"/join"} className="p-1">
                    Instructors
                </Link>
                <Link to={"/join"} className="p-1">
                    Messages
                </Link>
                <Link to={"/join"} className="p-1">
                    Users
                </Link>
            </div>
        </div>
    )
}
