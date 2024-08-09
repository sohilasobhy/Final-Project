import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [courses, setCourses] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeCourses")
            .then((response) => {
                setCourses(response.data);
                console.log(courses);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeReviews")
            .then((response) => {
                setReviews(response.data);
                console.log(reviews);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeInstructors")
            .then((response) => {
                setInstructors(response.data);
                console.log(instructors);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    return (
        <div id="DashHome" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
            <div>
                <h2>Home Courses</h2>
                <div className="mt-4">
                    <table className="table  col-12">
                        <thead>
                            <tr>
                                <td>
                                    Course Name
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
                                        <tr key={course.id}>
                                            <td>
                                                <Link to={`/single-course/${course.id}`}>
                                                    {course.name}
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                -
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
                <h2>
                    Home Reviews
                </h2>
                <div className="mt-4">
                    <table className="table table-danger col-12">
                        <thead>
                            <tr>
                                <td className="text-center">
                                    Review ID
                                </td>
                                <td className="text-center pe-2">
                                    Review
                                </td>
                                <td className="text-center pe-2">
                                    Delete
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews?.map((review) => {
                                    return (
                                        <tr key={review.id}>
                                            <td className="text-center">

                                                {review.id}
                                            </td>
                                            <td className="pe-5">
                                                {review.comment}
                                            </td>
                                            <td className="text-center">
                                                -
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
                <h2>
                    Home Instructors
                </h2>
                <div className="mt-4">
                    <table className="table table-danger col-12">
                        <thead>
                            <tr>
                                <td className="text-center">
                                    Instructor ID
                                </td>
                                <td className="text-center pe-2">
                                    Instructor Image
                                </td>
                                <td className="text-center pe-2">
                                    Instructor Name
                                </td>
                                <td className="text-center pe-2">
                                    Delete
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                instructors?.map((instructor) => {
                                    return (
                                        <tr key={instructor.id}>
                                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                {instructor.id}
                                            </td>
                                            <td className="text-center" >
                                                <img src={instructor.img} alt="instructor image" width={100} />
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                {instructor.name}
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                -
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
