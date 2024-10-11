import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $AddCourseHome, $AddInstructorHome, $HomeCourses, $HomeInstructors, $HomeReviews, $ReviewForm } from "../Store/Store";
import Swal from 'sweetalert2';
import { FormattedMessage, useIntl } from "react-intl";
export default function HomePageDash() {
    const [courses, setCourses] = useRecoilState($HomeCourses);
    const [reviews, setReviews] = useRecoilState($HomeReviews);
    const [instructors, setInstructors] = useRecoilState($HomeInstructors);
    const [, setAddCourseHome] = useRecoilState($AddCourseHome)
    const [, setReviewForm] = useRecoilState($ReviewForm);
    const [, setInstructorForm] = useRecoilState($AddInstructorHome);
    let intl = useIntl()
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeInstructors")
            .then((response) => {
                setInstructors(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    const handleDelete = (url, deletedItem, item) => {
        Swal.fire({
            title: intl.formatMessage({ id: 'areYouSure' }),
            text: intl.formatMessage({ id: 'revert' }),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'confirm' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'deleted' }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'error' }),
                            text: intl.formatMessage({ id: 'problem' }),
                            icon: "error"
                        });
                    });
                if (item == 1) {
                    const updatedArray = courses.filter(item => item.id !== deletedItem.id);
                    setCourses(updatedArray)
                } else if (item == 2) {
                    const updatedArray = reviews.filter(item => item.id !== deletedItem.id);
                    setReviews(updatedArray)
                } else if (item == 3) {
                    const updatedArray = instructors.filter(item => item.id !== deletedItem.id);
                    setInstructors(updatedArray)
                }
            }
        });
    };
    return (
        <div id="DashHome" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div>
                <div className="d-flex justify-content-between">
                    <h2>                                    <FormattedMessage id="homeCourses" />                    </h2>
                    <button className="btn btn-outline-primary" onClick={() => setAddCourseHome(true)}>   <FormattedMessage id="addCourse" />                    </button>
                </div>
                <div className="mt-4">
                    <table className="table  col-12">
                        <thead>
                            <tr>
                                <td>
                                    <FormattedMessage id="courseName" />
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
                                            <td className="text-center" onClick={() => { handleDelete(`http://localhost:3000/HomeCourses/${course.id}`, course, 1) }}>
                                                <button className="btn btn-danger"><FormattedMessage id="delete" /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <h2>
                        <FormattedMessage id="homeReviews" />
                    </h2>
                    <button className="btn btn-outline-primary" onClick={() => setReviewForm(true)}>
                        <FormattedMessage id="addReview" /></button>
                </div>
                <div className="mt-4">
                    <table className="table table-danger col-12">
                        <thead>
                            <tr>

                                <td className="pe-2">
                                    <FormattedMessage id="review" />

                                </td>
                                <td className="text-center pe-2">
                                    <FormattedMessage id="delete" />

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews?.map((review) => {
                                    return (
                                        <tr key={review.id}>
                                            <td className="pe-5">
                                                {review.comment}
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-danger" onClick={() => handleDelete(`http://localhost:3000/HomeReviews/${review.id}`, review, 2)}><FormattedMessage id="delete" /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-between">
                    <h2>
                        <FormattedMessage id="homeInstructors" />
                    </h2>
                    <button className="btn btn-outline-primary" onClick={() => setInstructorForm(true)}> <FormattedMessage id="addInstructor" /></button>
                </div>
                <div className="mt-4">
                    <table className="table table-danger col-12">
                        <thead>
                            <tr>

                                <td className=" ps-5">
                                    <FormattedMessage id="instImg" />
                                </td>
                                <td className=" pe-2">
                                    <FormattedMessage id="instName" />

                                </td>
                                <td className="text-center pe-2">
                                    <FormattedMessage id="delete" />

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                instructors?.map((instructor) => {
                                    return (
                                        <tr key={instructor.id}>

                                            <td className=" ps-5" >
                                                <img src={`../${instructor.img}`} alt="instructor image" width={80} height={80} className=" object-fit-cover" />
                                            </td>
                                            <td className="" style={{ verticalAlign: "middle" }}>
                                                {instructor.name}
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                <button className="btn btn-danger" onClick={() => handleDelete(`http://localhost:3000/HomeInstructors/${instructor.id}`, instructor, 3)}><FormattedMessage id="delete" /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
