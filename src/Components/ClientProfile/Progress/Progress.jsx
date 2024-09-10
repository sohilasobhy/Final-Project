import "./Progress.scss"
import { TiMessages } from "react-icons/ti";
import { FaStopwatch } from "react-icons/fa6";
import { GiTimeTrap } from "react-icons/gi";
import { FaCertificate, FaBookmark } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import course from "../../../assets/images/noInprogress-light.png"
import certificate from "../../../assets/images/noCertificates-light.png"
import { useRecoilState } from "recoil";
import { $UserInfo } from "../../../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleCourseComponent from "../../SingleCourseComponent";
export default function Progress() {
    const [userInfo] = useRecoilState($UserInfo)
    const [yourCourses, setYourCourses] = useState()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Courses")
            .then((res) => {
                setYourCourses(res.data)
                console.log(yourCourses)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const userCoursesInProgress = yourCourses?.filter(course => userInfo?.validCoursesId?.includes(Number(course.id)));
    console.log(userInfo)
    return (
        <div id="Progress" className="p-2 p-lg-5 d-flex flex-column align-items-center">
            <div className="col-12 col-lg-10">
                <div className="d-flex justify-content-between">
                    <h2>My Progress</h2>
                    {/* <Link to={"/messages"} className="d-flex gap-2 py-1 px-2 messages align-items-center">
                        <TiMessages />
                        <p>Messages</p>
                    </Link> */}
                </div>
                <div className="col-12 px-2 px-lg-5 py-5 stat d-flex flex-column flex-lg-row justify-content-center mt-5">
                    {/* <div className="d-flex flex-column col-12 col-lg-4">
                        <h3>Progress</h3>
                        <div className="p-3 d-flex mt-4 justify-content-between hours h-100 align-items-end">
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-1">
                                    <FaStopwatch />
                                    <p className="num">00:00</p>
                                </div>
                                <p>Hours spent learning</p>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center gap-1">
                                    <FaStopwatch />
                                    <p className="num">0</p>
                                </div>
                                <p>Lessons finished</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="d-flex flex-column col-12 mt-3 mt-lg-0">
                        <h3>All courses stats</h3>
                        <div className="p-3 d-flex mt-4 justify-content-between hours">
                            <div className="d-flex flex-column col-2 align-items-center justify-content-between  gap-1">
                                <div className="d-flex align-items-center gap-1">
                                    <GiTimeTrap />
                                    <p className="num">{userInfo?.validCoursesId ? `${userInfo?.validCoursesId?.length}` : "0"} </p>
                                </div>
                                <p className="text-center">In progress courses</p>
                            </div>
                            <div className="d-flex flex-column col-2 align-items-center justify-content-between gap-1">
                                <div className="d-flex align-items-center gap-1">
                                    <IoCheckmarkDoneCircle />
                                    <p className="num">{userInfo?.completedCourses ? `${userInfo?.completedCourses?.length}` : "0"}</p>
                                </div>
                                <p className="text-center">Completed courses</p>
                            </div>
                            <div className="d-flex flex-column col-2 align-items-center justify-content-between gap-1">
                                <div className="d-flex align-items-center gap-1">
                                    <FaCertificate />
                                    <p className="num">0</p>
                                </div>
                                <p className="text-center">Earned certificates</p>
                            </div>
                            <div className="d-flex flex-column col-2 align-items-center justify-content-between gap-1">
                                <div className="d-flex align-items-center gap-1">
                                    <FaBookmark />
                                    <p className="num">{userInfo?.favouriteCoursesId ? `${userInfo?.favouriteCoursesId?.length}` : "0"}</p>
                                </div>
                                <p className="text-center">Saved courses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-10 mt-5">
                <div>
                    <h2>My Courses</h2>
                </div>
                <div className={`${userInfo.validCoursesId.length == 0 ? "d-flex" : "d-none"} col-12 p-5 courses flex-column align-items-center justify-content-center mt-5 gap-2`}>
                    <img src={course} alt="no courses" width={200} />
                    <p className="text-center">You do not have any courses</p>
                    <p className="text-center">Start a new course to be able to track it here.</p>
                </div>
                <div className={`${userInfo.validCoursesId.length == 0 ? "d-none" : "d-flex"}`}>
                    <div className="row p-5 col-12 g-4">
                        {
                            userCoursesInProgress?.map((course) => {
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
            <div className="col-10 mt-5">
                <h2>My Certificates</h2>
                <div className="col-12 p-5 courses d-flex flex-column align-items-center justify-content-center mt-5 gap-2">
                    <img src={certificate} alt="no courses" width={200} />
                    <p className="text-center">You haven’t generated any certificates yet.</p>
                    <p className="text-center">If you have completed courses you can generate a certificate from the course recap section.</p>
                </div>
            </div>
        </div>
    )
}
