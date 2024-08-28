import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import "./SingleInstructor.scss"
import InstructorInfo from "./InstructorInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import InstructorCourses from "./InstructorCourses";
export default function SingleInstructor() {
    let instructorId = useParams()
    console.log(instructorId)
    const [instructor, setinstructor] = useState()
    const [courses, setCourses] = useState()
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Instructors/${instructorId.instructorId}`)
            .then((res) => {
                setinstructor(res.data)
                console.log(instructor.coursesID)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get("http://localhost:3000/Courses")
            .then((res) => {
                setCourses(res.data)
                console.log(courses)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div id="SingleInstructorPage">
            <div className="header d-flex flex-column gap-4">
                <h1>Instructor Details</h1>
                <p>
                    <Link to={"/"}>Home</Link>&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                    &nbsp; <Link to={"/Instructors"}>Instructors</Link>
                </p>
            </div>
            <div className="p-5">
                <InstructorInfo Instructor={instructor} />
            </div>
            <div className="p-5 PopularCourses">
                <h2 className="text-center">My Popular Courses</h2>
                {console.log(instructor)}
                <InstructorCourses instructor={instructor} courses={courses} />
            </div>
        </div >
    )
}
