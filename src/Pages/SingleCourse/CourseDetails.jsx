import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import pause from "../../assets/images/play-buttton.png"
import pauseHov from "../../assets/images/play-buttton (1).png"
import price from "../../assets/images/money.png"
import instractour from "../../assets/images/programmer (2).png"
import duration from "../../assets/images/time.png"
import lessons from "../../assets/images/lessons2.png"
import students from "../../assets/images/students2.png"
import language from "../../assets/images/internet.png"
import certificate from "../../assets/images/award2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $UserInfo, $checkoutPay, $commercialVid } from "../../Store/Store";
export default function CourseDetails() {
    let navigate = useNavigate()
    const [courseDetails, setCourseDetails] = useRecoilState($checkoutPay)
    const [userInfo] = useRecoilState($UserInfo)
    const [validCourse, setValidCourse] = useState(false)
    let { id } = useParams();
    const [course, setArray] = useState();
    const [isloading, setIsloading] = useState(false)
    const [, setCommercialVid] = useRecoilState($commercialVid)
    useEffect(() => {
        setIsloading(true)
        axios
            .get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                setArray(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            }).finally(() => {
                setIsloading(false);
            });
    }, [id]);
    useEffect(() => {
        if (userInfo?.subscribed == 2 && userInfo?.validCoursesId?.includes(Number(course?.id))) {
            setValidCourse(true)
        }
    }, [course])
    console.log(course)
    let content;
    if (isloading) {
        content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
    } else if (!course) {
        content = <h2>No Course Data</h2>
    } else {
        content = <div id="CourseDetails">
            <div className="position-relative">
                <img src={`../../../${course.img}`} className="col-12 courseImg" />
                <div className="d-flex justify-content-center align-items-center pause position-absolute" onClick={() => {
                    setCommercialVid(course)
                }}>
                    <img src={pause} alt="" className="pauseImg" />
                    <img src={pauseHov} alt="" className="pauseImgHov" />
                </div>
            </div>
            <div className="mt-3 ms-3 col-11 d-flex flex-column ">
                <h5 >Course Includes:</h5>
                <div className="d-flex justify-content-between py-3 item">
                    <p className="d-flex gap-3 align-items-center "><img src={price} alt="price" style={{ "width": "24px" }} /> price:</p>
                    <p className="price">{course.price}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={instractour} alt="Instructor" style={{ "width": "24px" }} /> Instructor:</p>
                    <p>{course.Instructor}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={duration} alt="duration" style={{ "width": "24px" }} /> Duration:</p>
                    <p>{course.Duration}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={lessons} alt="lessons" style={{ "width": "24px" }} /> Lessons:</p>
                    <p>{course.lessons}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={students} alt="students" style={{ "width": "24px" }} /> Students:</p>
                    <p>{course.students}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={language} alt="language" style={{ "width": "24px" }} /> Language:</p>
                    <p>{course.Language}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={certificate} alt="Certification" style={{ "width": "24px" }} /> Certification:</p>
                    <p>{course.Certification}</p>
                </div>
            </div>
            <div className="position-relative Browse mt-3 mx-auto col-8" onClick={() => {
                navigate("/checkout")
                setCourseDetails(course)
            }}>
                <button className="d-flex align-items-center gap-3 btn col-12 ">
                    <p className="col-12 text-center">
                        {
                            userInfo?.subscribed == 1 || validCourse || course?.price == "Free" ? `Watch Now` : `Enroll Now`
                        }
                        <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
                    </p>
                </button>
                <div className="position-absolute BTNFilter"></div>
            </div>
        </div >
        return (
            <div className="d-flex justify-content-center">
                {content}
            </div>
        )
    }
}
