import axios from "axios";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { $AllCourses, $AllInstructors, $CourseForm, $EditForm, $EditFormCourse, $HomeCourses } from "../Store/Store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

export default function AllCourses() {
    const [courses, setCourses] = useRecoilState($AllCourses)
    const [Instructor, setInstructor] = useRecoilState($AllInstructors)
    const [homeCourses, sethomeCourses] = useRecoilState($HomeCourses)
    const [, setCourseId] = useRecoilState($EditFormCourse)
    const [, setEdit] = useRecoilState($EditForm)
    const [, setCourseForm] = useRecoilState($CourseForm)
    let intl = useIntl()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Courses")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
        axios
            .get("http://localhost:3000/Instructors")
            .then((response) => {
                setInstructor(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            title: intl.formatMessage({ id: "areYouSure" }),
            text: intl.formatMessage({ id: "revert" }),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" }),
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
                            title: intl.formatMessage({ id: "deleted" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
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
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
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
            <div className="d-flex justify-content-between">
                <h2><FormattedMessage id="courses" /></h2>
                <button className="btn btn-outline-primary" onClick={() => setCourseForm(true)}><FormattedMessage id="addCourse" /></button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td>
                            <FormattedMessage id="courseName" />
                        </td>
                        <td className="text-center">
                            <FormattedMessage id="edit" />

                        </td>
                        <td className="text-center">
                            <FormattedMessage id="delete" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses?.map((course) => {
                            return (
                                <tr key={course.id}>

                                    <td>
                                        <Link to={`/single-course/${course.id}`}>
                                            {course.name}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-primary" onClick={() => {
                                            setEdit(true)
                                            setCourseId(course.id)
                                        }}>                            <FormattedMessage id="edit" />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>                            <FormattedMessage id="delete" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
