import axios from "axios";
import { useEffect, useState } from "react"

export default function AllCourses() {
    const [courses, setCourses] = useState()
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
    }, []);
    return (
        <div id="AllCourses" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
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
                        <td>
                            Show
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
                                        {course.name}
                                    </td>
                                    <td>
                                        Show
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
    )
}
