import "./SideMenu.scss";
import logo from "../assets/images/graduation.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $UserInfo, $menu } from "../Store/Store";
import { FormattedMessage } from "react-intl";
export default function SideMenu() {
  const [menuIndex, setMenuIndex] = useRecoilState($menu);
  const [user] = useRecoilState($UserInfo)
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
            <Link to={"/"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="home" />
            </Link>
            <Link to={"/about"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="about" />

            </Link>
            <Link to={"/courses"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="courses" />

            </Link>
            <Link to={"/contact"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="contact" />

            </Link>
            <Link to={"/Instructors"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="instructors" />

            </Link>
            <Link to={"/purchase"} className="p-1"
              onClick={() => setMenuIndex(false)}
            >
              <FormattedMessage id="subscribe" />

            </Link>
            {
              !user ? <Link to={"/login"} className="p-1"
                onClick={() => setMenuIndex(false)}
              >
                <FormattedMessage id="login" />
              </Link> : ""
            }

          </div>
        </div>
      </div>
    );
  }
}
