import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/graduationWhite.png"
import AddCourseForm from "./AddCourseForm";
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
                <NavLink to={"/dashboard/Home-page"} className="p-1">
                    Home Page
                </NavLink>
                <Link to={"/dashboard/All-courses"} className="p-1">
                    All Courses
                </Link>
                <NavLink to={"/dashboard/Categories"} className="p-1">
                    Categories
                </NavLink>
                <NavLink to={"/dashboard/Reviews"} className="p-1">
                    Reviews
                </NavLink>
                <NavLink to={"/dashboard/instructors"} className="p-1">
                    Instructors
                </NavLink>
                <NavLink to={"/dashboard/messages"} className="p-1">
                    Messages
                </NavLink>
                <NavLink to={"/dashboard/users"} className="p-1">
                    Users
                </NavLink>
            </div>
        </div>
    )
}
