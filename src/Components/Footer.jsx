import { Link } from "react-router-dom";
import logo from "../assets/images/graduation.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import twitter from "../assets/images/twitter(2).png";
import facebook from "../assets/images/facebook.png";
import youtube from "../assets/images/youtube.png";
import linkedin from "../assets/images/linkedin(2).png";
import instagram from "../assets/images/instagram.png";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="col-12 px-5" id="Footer">
      <div className="footer d-flex flex-wrap gap-5">
        <div className="d-flex flex-column col-12 col-md-6 col-lg-3 gap-3">
          <Link to={"/"}
            className="d-flex align-items-center gap-2 logo col-3">
            <img src={logo} alt="logo" />
            <p className="mt-3 siteName">EduJourney</p>
          </Link>
          <p className="platformDesc">
            EduJourney is a comprehensive online learning platform offering a
            wide range of courses to help you achieve your educational goals.
          </p>
          <p className="contact">
            <span>Add:</span> 70-80 Upper St Norwich NR2
          </p>
          <p className="contact">
            <span>Call: </span> +01 123 5641 231
          </p>
          <p className="contact">
            <span> Email: </span> info@EduJourney.co
          </p>
        </div>
        <div className="d-flex flex-column col-12 col-md-6 col-lg-2 gap-3 links">
          <p className="top">LINKS</p>
          <Link to={"/"} className="mt-3">
            Home
          </Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/Courses"}>Courses</Link>
          <Link to={"/Instractours"}>Instractours</Link>
          <Link to={"/Purchase"}>Subscribe</Link>
        </div>
        <div className="d-flex flex-column col-12 col-md-6 col-lg-4 gap-3 contact px-5">
          <p className="top">Contacts</p>
          <p>
            Enter your email address to register to our newsletter subscription
          </p>
          <div className="d-flex gap-2 align-items-center flex-column flex-lg-row col-12">
            <input
              type="email"
              className="col-12 col-lg-7 px-2 py-3"
              placeholder="Enter your Email"
            />
            <div className="position-relative Browse d-flex justify-content-center col-12 col-lg-5 mt-3">
              <button className="d-flex align-items-center gap-2 btn">
                <p>
                  Subscribe <FontAwesomeIcon icon={faArrowRight} />
                </p>
              </button>
              <div className="position-absolute BTNFilter"></div>
            </div>
          </div>
          <div className="d-flex justify-content-between col-12 col-md-8 col-lg-5 mt-2">
            <img src={facebook} alt="" />
            <img src={linkedin} alt="" />
            <img src={instagram} alt="" />
            <img src={twitter} alt="" />
            <img src={youtube} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
