import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/graduationWhite.png"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { useRecoilState } from "recoil";
import { $Language } from "../Store/Store";
import { FormattedMessage } from "react-intl";
export default function Menu() {
    const [language] = useRecoilState($Language)
    console.log(language)
    const lang = localStorage.getItem("lang") || "ltr";
    const handleLang = () => {
        const newLang = lang === "ltr" ? "rtl" : "ltr";
        localStorage.setItem("lang", newLang);
        window.location.reload();
    };
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
                        <p className="siteName">EduJourney</p>
                    </Link>
                    <div onClick={handleLang} className={`language mx-2`}>
                        <MdLanguage size={30} />
                    </div>
                </div>
                <div className="p-3 d-flex flex-column gap-4 LINKS">
                    <NavLink to={"/dashboard/Home-page"} className="p-1"
                        onClick={() => setOpen(false)}
                    >
                        <FormattedMessage id="home" />
                    </NavLink>
                    <NavLink to={"/dashboard/All-courses"} className="p-1"
                        onClick={() => setOpen(false)}
                    >
                        <FormattedMessage id="course" />
                    </NavLink>
                    <NavLink to={"/dashboard/Categories"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="categories" />

                    </NavLink>
                    <NavLink to={"/dashboard/Reviews"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="review" />

                    </NavLink>
                    <NavLink to={"/dashboard/instructors"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="instructors" />
                    </NavLink>
                    <NavLink to={"/dashboard/messages"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="messages" />
                    </NavLink>
                    <NavLink to={"/dashboard/users"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="users" />
                    </NavLink>
                    <NavLink to={"/dashboard/subPlans"} className="p-1"
                        onClick={() => setOpen(false)}                    >
                        <FormattedMessage id="subPlans" />
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
