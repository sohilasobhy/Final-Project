import "./SideMenu.scss";
import logo from "../assets/images/graduation.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $menu } from "../Store/Store";
export default function SideMenu() {
  const [menuIndex, setMenuIndex] = useRecoilState($menu);
  if (menuIndex) {
    return (
      <div className="col-12 position-fixed" id="SideMenu">
        <div
          className="col-12 filter position-fixed"
          onClick={(event) => {
            event.stopPropagation();
            setMenuIndex(false);
          }}></div>
        <div className=" bg-white position-absolute menuItems  animate__animated animate__fadeInLeft col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="d-flex justify-content-between align-items-center topMenu">
            <Link to={"/"}
              className="d-flex align-items-center gap-2 logo p-3">
              <img src={logo} alt="" />
              <p className=" mt-3 siteName">EduJourney</p>
            </Link>
            <div>
              <div
                className="rounded-5 close d-flex justify-content-center align-items-center align-self-start position-absolute"
                onClick={() => {
                  setMenuIndex(false);
                }}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          </div>
          <div className="p-3 d-flex flex-column gap-4 LINKS">
            <Link to={"/"} className="p-1">
              Home
            </Link>
            <Link to={"/about"} className="p-1">
              About
            </Link>
            <Link to={"/courses"} className="p-1">
              Courses
            </Link>
            <Link to={"/contact"} className="p-1">
              Contact Us
            </Link>
            <Link to={"/join"} className="p-1">
              Login / Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
