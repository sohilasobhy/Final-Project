import axios from "axios";
import SingleCourseComponent from "../../Components/SingleCourseComponent";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function HomeCourses() {
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
      className="col-12 pt-5 pe-5 ps-5 d-flex flex-column justify-content-center align-items-center"
      id="HomeCourses">
      <div className="p-5 d-flex flex-column align-items-center header gap-2">
        <p className="text-center">POPULAR COURSES</p>
        <h2 className="text-center">Pick A Course To Get Started</h2>
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
        {array.map((course, index) => {
          return (
            <SingleCourseComponent
              key={course.id}
              name={course.name}
              price={course.price}
              level={course.level}
              rating={course.rating}
              hours={course.Duration}
              desc={course.desc}
              lessons={course.lessons}
              students={course.students}
            />
          );
        })}
      </div>
      <div className="position-relative Browse  mt-5">
        <button className="d-flex align-items-center  gap-3   btn">
          <p>
            Browse More Courses <FontAwesomeIcon icon={faArrowRight} />
          </p>
        </button>
        <div className="position-absolute BTNFilter"></div>
      </div>
    </div>
  );
}
