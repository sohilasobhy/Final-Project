import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddCourseHome, $HomeCourses } from "../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddCourseToHome() {
    const [AddCourseHome, setAddCourseHome] = useRecoilState($AddCourseHome)
    const [allCourses, setAllCourses] = useState([])
    const [homeCoursesIds, sethomeCoursesIds] = useState([])
    const [HomeCourses, setHomeCourses] = useRecoilState($HomeCourses)
    let url = "http://localhost:3000/HomeCourses"
    function addToHome(Courseid) {
        console.log(allCourses)
        console.log(Courseid)
        let course = allCourses.find((element) => Number(element.id) == Courseid)
        Swal.fire({
            title: "Are you sure you want to add this course?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, course)
                    .then(() => {
                        Swal.fire({
                            title: "Added!",
                            text: "Your course has been added.",
                            icon: "success"
                        });
                        setHomeCourses([...HomeCourses, course])
                        setAddCourseHome(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding the course.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/Courses")
            .then((res) => {
                setAllCourses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeCourses")
            .then((res) => {
                setHomeCourses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        sethomeCoursesIds(HomeCourses.map(course => Number(course.id)));
    }, [HomeCourses])
    console.log(homeCoursesIds)
    let filteredCourses = allCourses.filter(course => !homeCoursesIds.includes(Number(course.id)));
    console.log(filteredCourses)
    if (AddCourseHome) {
        return (
            <div id="AddCourseToHome">
                <CustomModal onHide={() => setAddCourseHome(false)} title={"Add Course Form"} show={AddCourseHome}>
                    <div className="allCoursesCon">
                        <table className="table table-active">
                            <thead>
                                <tr>
                                    <td>Course Id</td>
                                    <td>Course Name</td>
                                    <td>Add</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCourses.map((course) => {
                                        return (
                                            <tr>
                                                <td>{course.id}</td>
                                                <td>{course.name}</td>
                                                <td onClick={() => addToHome(course.id)} className="add">
                                                    <button className="btn btn-primary">Add</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </CustomModal>
            </div>
        )
    }
}
