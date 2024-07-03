import "./SingleCourseComponent.scss";
import lessons from "../assets/images/book.png";
import { TbBooks } from "react-icons/tb";
import { IoTime } from "react-icons/io5";
import stars from "../assets/images/rating.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function SingleCourseComponent({ course, color }) {
  const [isReadMore] = useState(true);
  const maxTextLength = 140;
  const maxNameLength = 44;
  console.log(course)
  return (
    <div className="col-12" id="SingleCourseComponent">
      <div className="position-relative col-12 h-lg-30 object-fit-cover overflow-hidden imgCon">
        <img
          src={course?.img}
          alt=""
          className="col-12 h-100 mainImage object-fit-cover"
        />
        <div className=" position-absolute hours d-flex gap-2 align-items-center py-1 px-2">
          <IoTime />
          <p>{course?.Duration}</p>
        </div>
      </div>
      <div
        className="py-5 px-4 d-flex flex-column h-100  gap-3 contant"
        style={{ backgroundColor: `${color}` }}>
        <p className="py-1 px-2 level">{course?.level}</p>
        <p className="courseName">
          {isReadMore
            ? course?.name.slice(0, maxNameLength) + "..."
            : course?.name}
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <img src={stars} alt="" />
          <p>{course?.rating}</p>
        </div>
        <p className="price">{course?.price}</p>
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center gap-1 lessons">
            <TbBooks />
            {course?.lessons}
          </div>
          <div className="line"></div>
          <div className="d-flex align-items-center gap-1 students">
            <FontAwesomeIcon icon={faUser} />
            {course?.students}
          </div>
        </div>
      </div>
      <div className="position-absolute  py-5 px-4 d-flex flex-column justify-content-center gap-3 courseDetails col-12">
        <FontAwesomeIcon
          icon={faHeart}
          className="position-absolute wishHeart"
        />
        <p className="py-1 px-2 levelHov">{course?.level}</p>
        <p className="courseNameHov">
          {isReadMore
            ? course?.name.slice(0, maxNameLength) + "..."
            : course?.name}
        </p>
        <div className="d-flex align-items-center gap-3">
          <img src={stars} alt="" />
          <p className="text-white">{course?.rating}</p>
        </div>
        <p className="priceHov">{course?.price}</p>
        <p className="courseDesc">
          {isReadMore
            ? course?.desc.slice(0, maxTextLength) + "..."
            : course?.desc}
        </p>
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center gap-1 lessonsHov">
            <img src={lessons} alt="" />
            <p className="text-white">{course?.lessons}</p>
          </div>
          <div className="lineHov"></div>
          <div className="d-flex align-items-center gap-1 studentsHov">
            <FontAwesomeIcon icon={faUser} />
            <p className="text-white">{course?.students}</p>
          </div>
        </div>
        <button className="btn px-3 py-2 mt-3 enrollBtn d-flex gap-3 align-items-center">
          Enroll Now <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
