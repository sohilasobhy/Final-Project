import "./SingleCourseComponent.scss";
import lessons from "../assets/images/book.png";
import { TbBooks } from "react-icons/tb";
import { IoTime } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $UserInfo, $whishlistItems } from "../Store/Store";
import { RateStars } from "../Pages/RateStars/RateStars";
import axios from "axios";
import React from 'react';
import { toast } from 'react-toastify';

export default function SingleCourseComponent({ course, color }) {
  const [found, setFound] = useState(false)
  const [user, setUser] = useRecoilState($UserInfo)

  const [validInstCourse, setValidInstCourse] = useState(false)
  console.log(user)
  const [validCourse, setValidCourse] = useState(false)
  useEffect(() => {
    if (user?.role == "instructor") {
      axios
        .get(`http://localhost:3000/Courses?Instructor=${user.name}`)
        .then((res) => {
          // setInstructorCourses(res.data)
          if (res.data?.some(instCourse => Number(instCourse.id) == Number(course.id))) {
            setValidInstCourse(true);
          }
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }, [user])
  useEffect(() => {
    if (user) {
      if (user?.favouriteCoursesId?.includes(Number(course?.id))) {
        setFound(true)
      }

    }
  }, [course, user?.favouriteCoursesId])

  function AddToWishlist() {
    if (user) {
      axios
        .get(`http://localhost:3000/Users/${user?.id}`)
        .then(response => {
          let res = response.data;
          if (!res.favouriteCoursesId?.includes(Number(course?.id))) {
            toast.success('course added to wishlist successfuly')
            res.favouriteCoursesId.push(Number(course?.id));
            res = res.favouriteCoursesId;
            setFound(true);
          } else {
            res = res.favouriteCoursesId.filter((item) => Number(item) != Number(course.id))
            toast.warning('course removed from wishlist')
            setFound(false);
          }
          console.log({ ...user, favouriteCoursesId: res })
          if (sessionStorage.getItem("user") != null) {
            sessionStorage.setItem("user", JSON.stringify({ ...user, favouriteCoursesId: res }))
          } else if (localStorage.getItem("user") != null) {
            localStorage.setItem("user", JSON.stringify({ ...user, favouriteCoursesId: res }))
          }
          setUser({ ...user, favouriteCoursesId: res })
          return axios.put(`http://localhost:3000/Users/${user?.id}`, { ...user, favouriteCoursesId: res });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      toast.error("Please login first !")
    }
  }
  useEffect(() => {
    if (user?.subscribed == 2 && user?.validCoursesId?.includes(Number(course.id))) {
      setValidCourse(true)
    }
  }, [course])


  return (
    <div className="h-100 col-12 overflow-hidden" id="SingleCourseComponent" style={{ backgroundColor: `${color}` }}>
      <div className="h-100 overflow-hidden">
        <div className="position-relative col-12 object-fit-cover overflow-hidden imgCon">
          <img
            src={`../${course.img}`}
            alt="Course-pic"
            className="col-12 h-100 mainImage object-fit-cover"
          />
          <div className={`position-absolute enrolled overflow-hidden ${user?.subscribed == 1 || validCourse ? `` : `d-none`}`}>
            <p>Enrolled</p>
          </div>
          <div className=" position-absolute hours d-flex gap-2 align-items-center py-1 px-2">
            <IoTime />
            <p>{course?.Duration}</p>
          </div>
        </div>
        <div
          className="py-5 px-4 d-flex flex-column  justify-content-between  contant "
        >
          <p className="py-1 px-2 level">{course?.level}</p>
          <p className="courseName">
            {course?.name.length > 44
              ? course?.name.slice(0, 44) + "..."
              : course?.name}
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <RateStars rate={course?.rating} />
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
        <div className="position-absolute  py-5 px-4 d-flex flex-column justify-content-center gap-3 courseDetails col-12 overflow-hidden">
          <FontAwesomeIcon
            icon={faHeart}
            className={`position-absolute wishHeart ${found ? "bg-danger" : ""}`}
            onClick={() => {
              AddToWishlist()
            }}
          />
          <p className="py-1 px-2 levelHov">{course?.level}</p>
          <p className="courseNameHov">
            {course?.name.length > 44
              ? course?.name.slice(0, 44) + "..."
              : course?.name}
          </p>
          <div className="d-flex align-items-center gap-3">
            <RateStars rate={course?.rating} />
            <p className="text-white">{course?.rating}</p>
          </div>
          <p className="priceHov">{course?.price}</p>
          <p className="courseDesc">
            {course?.desc?.length > 44
              ? course?.desc.slice(0, 140) + "..."
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
          <Link to={`/single-course/${course.id}`} className="btn px-3 py-2 mt-3 enrollBtn d-flex gap-3 align-items-center">
            {
              user?.subscribed == 1 || validCourse || validInstCourse ? `Watch Now` : `Enroll Now`} <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>

    </div>
  );
}
