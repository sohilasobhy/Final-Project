import { Link, useParams } from "react-router-dom";
import "./Courses.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PaginatedCourses from "./CoursePagination";
import { useRecoilState } from "recoil";
import { $Language, $SearchResult } from "../../Store/Store";
import { FormattedMessage } from "react-intl";
export default function Courses() {
  const [value, setValue] = useRecoilState($SearchResult)
  const [courses, setCourses] = useState([]);
  const [lang] = useRecoilState($Language)
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
      <div className="header col-12">
        <p>
          <Link to={"/"} className="home"><FormattedMessage id="home" /></Link>&nbsp;
          {lang == "EN" ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />}
          &nbsp; <Link to={"/courses"}><FormattedMessage id="courses" /></Link>
        </p>
      </div>
      <div className="col-12 d-flex justify-content-end pt-5 px-5 container position-relative">
        <input
          type="Search"
          placeholder={lang == "EN" ? `Search Courses...` : `ابحث عن الدورات...`}
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
