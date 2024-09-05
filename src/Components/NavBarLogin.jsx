import "./NavBar.scss";
import { Link } from "react-router-dom";
import logo from "../assets/images/graduation.png";
export default function NavBarLogin() {

  return (
    <div className="col-12 d-flex justify-content-between gap-lg-3 align-items-center NavBar px-lg-2 py-1 position-sticky">
      <div className="d-flex align-items-center justify-content-between gap-5 navLeft">
        <Link to={"/"}
          className="d-flex align-items-center gap-2 logo col-3">
          <img src={logo} alt="" />
          <p className="siteName">EduJourney</p>
        </Link>
      </div>
      <div>
        {/* <button onClick={()=>{}}>Dark</button> */}
      </div>
    </div>
  );
}
