import axios from "axios";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { $AllCourses, $AllInstructors, $CourseForm, $EditForm, $EditFormCourse, $HomeCourses } from "../Store/Store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllCourses() {
    const [courses, setCourses] = useRecoilState($AllCourses)
    const [Instructor, setInstructor] = useRecoilState($AllInstructors)
    const [homeCourses, sethomeCourses] = useRecoilState($HomeCourses)
    const [, setCourseId] = useRecoilState($EditFormCourse)
    const [, setEdit] = useRecoilState($EditForm)
    const [, setCourseForm] = useRecoilState($CourseForm)
    useEffect(() => {
        axios
            .get("http://localhost:3000/Courses")
            .then((response) => {
                setCourses(response.data);
                console.log(courses);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
        axios
            .get("http://localhost:3000/Instructors")
            .then((response) => {
                setInstructor(response.data);
                console.log(Instructor);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/HomeCourses/${id}`)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                axios.delete(`http://localhost:3000/Courses/${id}`)
                    .then((res) => {
                        console.log(res)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your course has been deleted.",
                            icon: "success"
                        });
                        let course = courses.find((item) => item.id == id)
                        console.log(course)
                        let instractor = Instructor.find((item) => item.name === course.Instructor)
                        console.log(instractor)
                        console.log(instractor.coursesID)
                        console.log(course.id)
                        let NewCourses = instractor.coursesID.filter((item) => {
                            return (
                                item != course.id
                            )
                        })
                        console.log(NewCourses)
                        axios.put(`http://localhost:3000/Instructors/${instractor?.id}`, { ...instractor, coursesID: NewCourses })
                            .then((res) => {
                                console.log("Instructor updated", res.data);
                            })
                            .catch((error) => {
                                console.log("Error updating instructor", error);
                            });
                        // setCourses([...courses, res.data])
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the course.",
                            icon: "error"
                        });
                    });
                const updatedArray = courses.filter(item => item.id !== id);
                const updateHome = homeCourses.filter(item => item.id !== id);
                sethomeCourses(updateHome)
                setCourses(updatedArray)
                console.log(updatedArray)
            }
        });
    };
    return (
        <div id="AllCourses" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <h2>All Courses</h2>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            Course Id
                        </td>
                        <td>
                            Course Name
                        </td>
                        <td className="text-center">
                            Edit
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses?.map((course) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        {course.id}
                                    </td>
                                    <td>
                                        <Link to={`/single-course/${course.id}`}>
                                            {course.name}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-primary" onClick={() => {
                                            setEdit(true)
                                            setCourseId(course.id)
                                        }}>Edit</button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={4} className=" text-primary fw-medium fs-5 add" onClick={() => setCourseForm(true)}>
                            + Add New Course
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
