import { Link, useParams } from "react-router-dom";
import "./Courses.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PaginatedCourses from "./CoursePagination";
import { useRecoilState } from "recoil";
import { $SearchResult } from "../../Store/Store";
export default function Courses() {
  const [value, setValue] = useRecoilState($SearchResult)
  const { page } = useParams();
  const [courses, setCourses] = useState([]);
  const [SearchData, setSearchData] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Courses?q=${value}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [value]);

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
          onChange={(e) => { setValue(e.target.value) }}
        />
      </div>
      <div className="container p-3">
        <div className="row g-4 justify-content-center">
          <PaginatedCourses courses={courses} />
        </div>
      </div>
    </div>
  );
}
