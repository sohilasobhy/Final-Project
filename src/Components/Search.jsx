import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $Search, $SearchResult } from "../Store/Store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useRecoilState($Search);
  const [input, setInput] = useRecoilState($SearchResult);
  const [box, setBox] = useState(false)
  const [courses, setCourses] = useState()
  useEffect(() => {
    axios
      .get("http://localhost:3000/Courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [])
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
                console.log(input)
              }}
            />
            <div className="col-12 bg-white coursesBox mt-3 p-3 d-flex flex-column  overflow-auto" >
              <p>
                {
                  courses?.filter((item) => {
                    return (
                      input.toLowerCase() === '' ? '' : item.name.toLowerCase().includes(input)
                    )
                  }).map((course) => {
                    {
                      if (input != '') {
                        return (
                          <div>
                            <Link to={`/single-course/${course.id}`} onClick={() => setSearch(false)}>
                              {course.name}
                            </Link>
                          </div>
                        )
                      } else {
                        return (
                          <h3>We couldn't find any search results for{input}</h3>
                        )
                      }
                    }
                  })
                }
              </p>
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
