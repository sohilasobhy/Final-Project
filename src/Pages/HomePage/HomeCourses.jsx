import axios from "axios";
import SingleCourseComponent from "../../Components/SingleCourseComponent";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function HomeCourses() {
  let navigate = useNavigate()
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/HomeCourses")
      .then((response) => {
        setArray(response.data);
        console.log(array);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div
      className="col-12 pt-3 pe-3 ps-3 d-flex flex-column justify-content-center align-items-center"
      id="HomeCourses">
      <div className="p-5 d-flex flex-column align-items-center header gap-2">
        <p className="text-center"><FormattedMessage id="POPULARCOURSES" /></p>
        <h2 className="text-center"><FormattedMessage id="startCourse" /></h2>
        <div className="col-4">
          <svg
            style={{
              fill: "none",
              stroke: "#00C8D5",
              strokeWidth: "5",
              enableBackground: "new 0 0 1 1",
            }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Laag_1"
            x="0px"
            y="0px"
            viewBox="0 0 119 15"
            xmlSpace="preserve">
            <path className="st0" d="M1,13.5C21,4.2,72-3,118,6" />
          </svg>
        </div>
      </div>
      <div className="row g-4 justify-content-center">
        {array?.splice(0, 4).map((course, index) => {
          return (
            <div
              className="col-sm-9 col-md-6 col-lg-5 col-xl-4 col-xxl-3 position-relative"
              key={course.id}>
              <SingleCourseComponent
                color={"white"}
                course={course}
                img={course.img}
              />
            </div>
          );
        })}
      </div>
      <div className="position-relative Browse  mt-5" onClick={() => {
        navigate("/courses")
      }}>
        <button className="d-flex align-items-center gap-3 btn">
          <p className="d-flex align-items-center gap-3">
            <FormattedMessage id="BrowseMore" />
            <FontAwesomeIcon icon={faArrowRight} />
          </p>
        </button>
        <div className="position-absolute BTNFilter"></div>
      </div>
    </div>
  );
}
