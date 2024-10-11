import "./NavBar.scss";
import { Link } from "react-router-dom";
import logo from "../assets/images/graduation.png";
import { MdLanguage } from "react-icons/md";


export default function NavBarLogin() {
  const lang = localStorage.getItem("lang") || "ltr";
  const handleLang = () => {
    const newLang = lang === "ltr" ? "rtl" : "ltr";
    localStorage.setItem("lang", newLang);
    window.location.reload();
  };
  return (
    <div className="col-12 d-flex justify-content-between gap-lg-3 align-items-center NavBar px-lg-2 py-1 position-sticky">
      <div className="d-flex align-items-center justify-content-between gap-5 navLeft">
        <Link to={"/"}
          className="d-flex align-items-center gap-2 logo col-3">
          <img src={logo} alt="" />
          <p className="siteName">EduJourney</p>
        </Link>
      </div>
      <div onClick={handleLang} className="language">
        <MdLanguage size={30} />
      </div>
    </div>
  );
}
