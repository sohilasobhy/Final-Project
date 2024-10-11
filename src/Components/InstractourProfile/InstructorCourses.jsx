import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"
import course from "../../assets/images/noInprogress-light.png"
import { useEffect, useState } from "react"
import axios from "axios"
import SingleCourseComponent from "../SingleCourseComponent"
import { FormattedMessage } from "react-intl"

export default function InstructorCourses() {
    const [userInfo] = useRecoilState($UserInfo)
    console.log(userInfo)
    const [instructor, setInstructor] = useState()
    const [courses, setCourses] = useState()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Courses")
            .then((res) => {
                setCourses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get("http://localhost:3000/Instructors")
            .then((res) => {
                const instructor = res.data.find(instructor =>
                    instructor.Contact.Email === userInfo.email
                );
                if (instructor) {
                    setInstructor(instructor);
                    console.log(instructor);
                } else {
                    console.log("No instructor found");
                }
            })
            .catch((err) => {
                console.error("Error fetching instructors:", err);
            })
    }, [])
    console.log(instructor?.coursesID)
    const instructorCourses = courses?.filter(course =>
        instructor?.coursesID?.includes(Number(course.id))
    );
    console.log(instructorCourses)
    return (
        <div id="InstructorCourses" className="p-5 d-flex flex-column align-items-center">
            <div className="col-10 d-flex flex-column align-items-center ">
                <h2 className=" align-self-start"><FormattedMessage id="myCourses" /></h2>
                <div className={`${instructorCourses?.length == 0 ? `d-flex` : `d-none`} col-12 p-5 courses flex-column align-items-center justify-content-center mt-5 gap-2`}>
                    <img src={course} alt="no courses" width={200} />
                    <p className="text-center"><FormattedMessage id="noCourses" /></p>
                </div>
                <div className={`${instructorCourses?.length == 0 ? "d-none" : ""} row p-5 col-12 g-4`}>
                    {
                        instructorCourses?.map((course) => {
                            return (
                                <div
                                    className="col-12 col-md-6 col-lg-4 position-relative" key={course.id}>
                                    <SingleCourseComponent course={course} color="#f5f9fa" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
