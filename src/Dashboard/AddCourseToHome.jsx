import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddCourseHome, $HomeCourses } from "../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

export default function AddCourseToHome() {
    const [AddCourseHome, setAddCourseHome] = useRecoilState($AddCourseHome)
    const [allCourses, setAllCourses] = useState([])
    const [homeCoursesIds, sethomeCoursesIds] = useState([])
    const [HomeCourses, setHomeCourses] = useRecoilState($HomeCourses);
    let intl = useIntl();
    let url = "http://localhost:3000/HomeCourses"
    function addToHome(Courseid) {
        console.log(allCourses)
        console.log(Courseid)
        let course = allCourses.find((element) => Number(element.id) == Courseid)
        Swal.fire({
            title: intl.formatMessage({ id: 'courseAdding' }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'yesAdd' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, course)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'confirm' }),
                            text: intl.formatMessage({ id: 'courseDone' }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setHomeCourses([...HomeCourses, course])
                        setAddCourseHome(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'error' }),
                            text: intl.formatMessage({ id: 'proplem' }),
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
                <CustomModal onHide={() => setAddCourseHome(false)} title={<FormattedMessage id="addCourse" />} show={AddCourseHome}>
                    <div className="allCoursesCon">
                        <table className="table table-active">
                            <thead>
                                <tr>
                                    <td><FormattedMessage id="courseName" /></td>
                                    <td><FormattedMessage id="add" /></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCourses.map((course) => {
                                        return (
                                            <tr>
                                                <td>{course.name}</td>
                                                <td onClick={() => addToHome(course.id)} className="add">
                                                    <button className="btn btn-primary"><FormattedMessage id="add" /></button>
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
