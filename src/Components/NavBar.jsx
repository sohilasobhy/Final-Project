import "./NavBar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/graduation.png";
import search from "../assets/images/search.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { $Search, $UserInfo, $menu, $profile } from "../Store/Store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../assets/images/user.png"
export default function NavBar() {
  const [profile, setProfile] = useRecoilState($profile)
  const navigate = useNavigate()
  const [, setSearch] = useRecoilState($Search);
  const [, setMenuIndex] = useRecoilState($menu);
  const [user] = useRecoilState($UserInfo)
  return (
    <div className="col-12 d-flex justify-content-between gap-lg-3 align-items-center NavBar px-lg-2 py-1 position-sticky">
      <div className="d-flex align-items-center justify-content-between gap-5 navLeft">
        <Link to={"/"}
          className="d-flex align-items-center gap-2 logo col-3">
          <img src={logo} alt="" />
          <p className="siteName">EduJourney</p>
        </Link>
      </div>
      <div className="d-flex gap-0 align-items-center">
        <div className="d-none d-lg-flex gap-4 navLinks justify-content-center pe-3 py-2">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/courses"}>Courses</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
          <NavLink to={"/Instructors"}>Instructors</NavLink>
          <NavLink to={"/purchase"}>Subscribe</NavLink>
        </div>
        <div className="d-flex justify-content-center align-items-center p-2 rounded-2 searchIcon">
          <img
            src={search}
            alt=""
            onClick={() => {
              setSearch(true);
            }}
          />
        </div>
        {
          user == null ?
            <div className="d-none d-sm-flex justify-content-center align-items-center py-2 px-3 rounded-2 bg-white menuIcon" onClick={() => navigate("/login")} >
              <FontAwesomeIcon icon={faUser} />
            </div>
            :
            <div className="d-none d-sm-flex justify-content-center align-items-center py-2 px-3 rounded-2 bg-white menuIcon" onClick={() => setProfile(!profile)} >
              <img src={user?.img == "" ? defaultImage : user?.img} alt="user Image" width={40} height={40} className="object-fit-cover rounded-5" />
            </div>
        }
        <div
          className="d-flex d-lg-none justify-content-center align-items-center py-2 px-3 rounded-2 bg-white menuIcon"
          onClick={() => {
            setMenuIndex(true);
          }}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
}
