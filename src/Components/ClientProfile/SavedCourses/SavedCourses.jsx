import "./SavedCourses.scss"
import saved from "../../../assets/images/empty-wishlist-light.png"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { $UserInfo } from "../../../Store/Store"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import SingleCourseComponent from "../../SingleCourseComponent"
import { FormattedMessage } from "react-intl"
export default function SavedCourses() {
    const [userInfo] = useRecoilState($UserInfo)
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
    }, [])
    const userFavoriteCourses = courses?.filter(course =>
        userInfo?.favouriteCoursesId?.includes(Number(course.id))
    );
    console.log(userFavoriteCourses)
    console.log(userInfo)
    return (
        <div id="SavedCourses" className="p-5 d-flex flex-column">
            <h4><FormattedMessage id="savedCourses" /></h4>
            <div className={`${userInfo?.favouriteCoursesId?.length == 0 ? `d-flex` : `d-none`} flex-column align-items-center mt-3 col-12 gap-2 noCourses`}>
                <div className="d-flex flex-column align-items-center mt-3 col-12 gap-2 noCourses">
                    <img src={saved} alt="empty-wishlist" />
                    <p className="text-center col-12 empty">Your wishlist is empty</p>
                    <p className="text-center col-12 col-md-6 col-lg-4 save">Tap the save icon on any course card or course page to wishlist it and get back to it later</p>
                </div>
                <Link className="align-self-center backBtn mt-4" to={"/courses"}>Go back</Link>
            </div>
            <div className={`${userInfo?.favouriteCoursesId?.length == 0 ? "d-none" : "d-flex"}`}>
                <div className="row p-5 col-12 g-4">
                    {
                        userFavoriteCourses?.map((course) => {
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
