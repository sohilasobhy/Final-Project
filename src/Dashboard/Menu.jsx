import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/graduationWhite.png"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useState } from "react";
export default function Menu() {
    const [openMenue, setOpen] = useState(false)
    console.log(openMenue)
    return (
        <div id="Menu" className="d-flex position-fixed h-100 col-10 col-md-5 col-lg-4 col-xl-3" style={{ left: `${openMenue ? '0' : ''}` }}>
            <div className={`position-fixed h-100 col-10 col-md-5 col-lg-4 col-xl-3`}>
                <div className="d-flex justify-content-between align-items-center topMenu">
                    <Link to={"/"}
                        className="d-flex align-items-center gap-2 logo p-3"
                    >
                        <img src={logo} alt="" />
                        <p className=" mt-3 siteName">EduJourney</p>
                    </Link>
                </div>
                <div className="p-3 d-flex flex-column gap-4 LINKS">
                    <NavLink to={"/dashboard/Home-page"} className="p-1"
                        onClick={() => setOpen(false)}
                    >
                        Home Page
                    </NavLink>
                    <NavLink to={"/dashboard/All-courses"} className="p-1"
                        onClick={() => setOpen(false)}
                    >
                        All Courses
                    </NavLink>
                    <NavLink to={"/dashboard/Categories"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        Categories
                    </NavLink>
                    <NavLink to={"/dashboard/Reviews"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        Reviews
                    </NavLink>
                    <NavLink to={"/dashboard/instructors"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        Instructors
                    </NavLink>
                    <NavLink to={"/dashboard/messages"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        Messages
                    </NavLink>
                    <NavLink to={"/dashboard/users"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        Users
                    </NavLink>
                    <NavLink to={"/dashboard/subPlans"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        subscription plans
                    </NavLink>
                </div>
            </div>
            <div className={`sideMenu d-md-none  justify-content-center ${openMenue == false ? `d-none` : ` d-flex`}`} onClick={() => { setOpen(!openMenue) }}>
                <FaAngleLeft />
            </div>
            <div className={`sideMenu d-md-none justify-content-center ${openMenue ? `d-none` : ` d-flex`}`} onClick={() => { setOpen(!openMenue) }}>
                <FaAngleRight />
            </div>
        </div>
    )
}
