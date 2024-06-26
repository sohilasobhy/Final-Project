import React from "react";
import "./NavBar.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/graduation.png";
import search from "../assets/images/search.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { $Search, $menu } from "../Store/Store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function NavBar() {
  const [, setSearch] = useRecoilState($Search);
  const [menuIndex, setMenuIndex] = useRecoilState($menu);
  return (
    <div className="col-12 d-flex justify-content-between justify-content-lg-center gap-lg-3 align-items-center NavBar px-3 py-1 position-sticky">
      <div className="d-flex align-items-center justify-content-between col-lg-9 navLeft">
        <div
          className="d-flex align-items-center gap-2 logo col-3"
          onClick={() => {
            window.location.href = "/";
          }}>
          <img src={logo} alt="" />
          <p className=" mt-3 siteName">EduJourney</p>
        </div>
        <div className="d-none d-lg-flex gap-5 navLinks justify-content-center pe-3 py-2">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/courses"}>Courses</NavLink>
          <NavLink to={"/contact"}>Contact Us</NavLink>
        </div>
      </div>
      <div className="d-flex gap-3">
        <div className="d-flex justify-content-center align-items-center p-2 rounded-2 searchIcon">
          <img
            src={search}
            alt=""
            onClick={() => {
              setSearch(true);
            }}
          />
        </div>
        <div className=" d-none d-sm-flex justify-content-center align-items-center py-2 px-3 rounded-2 bg-white menuIcon">
          <FontAwesomeIcon icon={faUser} />
        </div>
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
