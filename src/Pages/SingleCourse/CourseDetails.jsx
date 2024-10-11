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
import { $UserInfo, $checkoutPay, $commercialVid, $loginCourseID } from "../../Store/Store";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
export default function CourseDetails() {
    let navigate = useNavigate()
    const [validInstCourse, setValidInstCourse] = useState(false)
    const [, setCourseDetails] = useRecoilState($checkoutPay)
    const [userInfo] = useRecoilState($UserInfo)
    const [validCourse, setValidCourse] = useState(false)
    let { id } = useParams();
    const [course, setArray] = useState();
    const [isloading, setIsloading] = useState(false)
    const [, setCommercialVid] = useRecoilState($commercialVid)
    const [, setCourseId] = useRecoilState($loginCourseID)

    if (course && userInfo && userInfo?.role == "instructor") {
        axios
            .get(`http://localhost:3000/Courses?Instructor=${userInfo?.name}`)
            .then((res) => {
                console.log(res.data)
                console.log(res.data?.some(instCourse => instCourse.id == course.id))
                if (res.data?.some(instCourse => instCourse.id == course.id)) {
                    setValidInstCourse(true);
                }
                console.log(res.data?.some(instCourse => Number(instCourse.id) == Number(course.id)))
            })
            .catch((err) => {
                console.log(err)
            })

    }

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
        content = <h2><FormattedMessage id="NoCourseData" /></h2>
    } else {
        content = <div id="CourseDetails">
            <div className="position-relative">
                <img src={`../../../${course.img}`} className="col-12 courseImg object-fit-cover" height={240} />
                <div className="d-flex justify-content-center align-items-center pause position-absolute" onClick={() => {
                    setCommercialVid(course)
                }}>
                    <img src={pause} alt="" className="pauseImg" />
                    <img src={pauseHov} alt="" className="pauseImgHov" />
                </div>
            </div>
            <div className="mt-3 ms-3 col-11 d-flex flex-column ">
                <h5 ><FormattedMessage id="CourseIncludes" /></h5>
                <div className="d-flex justify-content-between py-3 item">
                    <p className="d-flex gap-3 align-items-center "><img src={price} alt="price" style={{ "width": "24px" }} /> <FormattedMessage id="price" /></p>
                    <p className="price">{course.price}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={instractour} alt="Instructor" style={{ "width": "24px" }} /> <FormattedMessage id="instructor" /></p>
                    <p>{course.Instructor}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={duration} alt="duration" style={{ "width": "24px" }} /> <FormattedMessage id="duration" /></p>
                    <p>{course.Duration}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={lessons} alt="lessons" style={{ "width": "24px" }} /> <FormattedMessage id="lessons" /></p>
                    <p>{course.lessons}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={students} alt="students" style={{ "width": "24px" }} /> <FormattedMessage id="students" /></p>
                    <p>{course.students}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={language} alt="language" style={{ "width": "24px" }} /> <FormattedMessage id="language" /></p>
                    <p>{course.Language}</p>
                </div>
                <div className="d-flex justify-content-between py-4 item">
                    <p className="d-flex gap-3 align-items-center "><img src={certificate} alt="Certification" style={{ "width": "24px" }} /> <FormattedMessage id="Certification" /></p>
                    <p>{course.Certification}</p>
                </div>
            </div>
            <div className="position-relative Browse mt-3 mx-auto col-8" onClick={() => {
                if (userInfo) {
                    if (userInfo?.subscribed == 1 || validCourse || userInfo?.role == "admin" || validInstCourse) {
                        navigate(`/lessons/${course.id}`)
                    } else {
                        navigate("/checkout")
                        setCourseDetails(course)
                    }
                } else {
                    toast.warning(<FormattedMessage id="loginToast" />)
                    setCourseId(course.id)
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500)
                }
            }}>
                <button className="d-flex align-items-center gap-3 btn col-12 ">
                    <p className="col-12 text-center">
                        {
                            userInfo?.subscribed == 1 || validCourse || validInstCourse || userInfo?.role == "admin" ? <FormattedMessage id="WatchNow" /> : <FormattedMessage id="EnrollNow" />
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
