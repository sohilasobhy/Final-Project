import { Link, useParams } from "react-router-dom";
import "./Courses.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SingleCourseComponent from "../../Components/SingleCourseComponent";
import NavBar from "../../Components/NavBar";
import PaginatedCourses from "./CoursePagination";
export default function Courses() {
  const { page } = useParams();
  console.log(page)
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Courses")
      .then((response) => {
        setArray(response.data);
        console.log(array);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div className="col-12" id="Courses">
      <div className="header">
        <p>
          <Link to={"/"}>Home</Link>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp; <Link to={"/courses"}>Courses</Link>
        </p>
      </div>
      <div className="col-12 d-flex justify-content-end pt-5 px-5 container position-relative">
        <input
          type="Search"
          placeholder="Search Courses..."
          className="py-3 px-4 col-md-6 col-lg-3"
        />
        <FontAwesomeIcon icon={faSearch} className="position-absolute search" />
      </div>
      <div className="container p-5">
        <div className="row g-4 justify-content-center">
          <PaginatedCourses />
        </div>
      </div>
    </div>
  );
}