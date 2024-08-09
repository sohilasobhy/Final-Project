import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $Search } from "../Store/Store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useRecoilState($Search);
  const [input, setInput] = useState(null);
  const [courses, setCourses] = useState()
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Courses?q=${input}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [input])

  if (search) {
    return (
      <div className="col-12 h-100 Search position-fixed animate__animated animate__fadeInDown">
        <div
          className="filter position-fixed h-100 col-12"
          onClick={() => {
            setSearch(false);
          }}>
          <div className=" searchCon col-11 col-md-10 col-lg-6 " onClick={(e) => { e.stopPropagation() }}>
            <input
              type="search"
              className="col-12 p-3 border-0 rounded-2 "
              placeholder="Search Here..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            {!courses.length >= 1 && input !== "" ? <span className="text-white">No data</span> : ""}
            <div className={`col-12 bg-white coursesBox mt-3 p-3 flex-column overflow-auto ${courses?.length >= 1 && input !== "" ? `d-flex` : `d-none`}`} >
              {
                courses?.map((course) => {
                  return (
                    <div key={course.id}>
                      <Link to={`/single-course/${course.id}`} onClick={() => setSearch(false)}>
                        {course.name}
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="rounded-5 close d-flex justify-content-center align-items-center align-self-start position-absolute">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              setSearch(false);
            }}
          />
        </div>
      </div>
    );
  }
}
