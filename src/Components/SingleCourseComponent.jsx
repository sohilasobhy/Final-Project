import "./SingleCourseComponent.scss";
import lessons from "../assets/images/book.png";
import { TbBooks } from "react-icons/tb";
import { IoTime } from "react-icons/io5";
import course1 from "../assets/images/course1.jpg";
import stars from "../assets/images/rating.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function SingleCourseComponent(props) {
  const [isReadMore] = useState(true);
  const maxTextLength = 140;
  const maxNameLength = 44;
  return (
    <div
      className="col-sm-9 col-md-6 col-lg-5 col-xl-4 col-xxl-3 position-relative"
      id="SingleCourseComponent">
      <div className="position-relative col-12 h-50 h-lg-30 object-fit-cover overflow-hidden imgCon">
        <img src={course1} alt="" className="col-12 h-100 mainImage" />
        <div className=" position-absolute hours d-flex gap-2 align-items-center py-1 px-2">
          <IoTime />
          <p>{props.hours}</p>
        </div>
      </div>
      <div className="py-5 px-4 d-flex flex-column  gap-3 bg-white contant">
        <p className="py-1 px-2 level">{props.level}</p>
        <p className="courseName">
          {isReadMore ? props.name.slice(0, maxNameLength) + "..." : props.name}
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <img src={stars} alt="" />
          <p>{props.rating}</p>
        </div>
        <p className="price">{props.price}</p>
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center gap-1 lessons">
            <TbBooks />
            {props.lessons}
          </div>
          <div className="line"></div>
          <div className="d-flex align-items-center gap-1 students">
            <FontAwesomeIcon icon={faUser} />
            {props.students}
          </div>
        </div>
      </div>
      <div className="position-absolute h-100 py-5 px-4 d-flex flex-column justify-content-center gap-3 courseDetails col-12">
        <FontAwesomeIcon
          icon={faHeart}
          className="position-absolute wishHeart"
        />
        <p className="py-1 px-2 levelHov">{props.level}</p>
        <p className="courseNameHov">
          {isReadMore ? props.name.slice(0, maxNameLength) + "..." : props.name}
        </p>
        <div className="d-flex align-items-center gap-3">
          <img src={stars} alt="" />
          <p className="text-white">{props.rating}</p>
        </div>
        <p className="priceHov">{props.price}</p>
        <p className="courseDesc">
          {isReadMore ? props.desc.slice(0, maxTextLength) + "..." : props.desc}
        </p>
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center gap-1 lessonsHov">
            <img src={lessons} alt="" />
            <p className="text-white">{props.lessons}</p>
          </div>
          <div className="lineHov"></div>
          <div className="d-flex align-items-center gap-1 studentsHov">
            <FontAwesomeIcon icon={faUser} />
            <p className="text-white">{props.students}</p>
          </div>
        </div>
        <button className="btn px-3 py-2 mt-3 enrollBtn d-flex gap-3 align-items-center">
          Enroll Now <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
