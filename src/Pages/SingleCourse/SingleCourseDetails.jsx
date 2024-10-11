import { Link, useParams } from "react-router-dom"
import instractuor from "../../assets/images/programmer.png"
import "./SingleCourse.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import CourseDetails from "./CourseDetails"
import CourseOverview from "./CourseOverview"
import { FormattedMessage } from "react-intl"
import { useRecoilState } from "recoil"
import { $Language } from "../../Store/Store"
export default function SingleCourse() {
    const [lang] = useRecoilState($Language)
    let { id } = useParams();
    const [array, setArray] = useState();
    const [isloading, setIsloading] = useState(false)
    const [category, setCategory] = useState([])
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
        axios
            .get(`http://localhost:3000/Categories?id=${array?.CtegoryId}`)
            .then((response) => {
                setCategory(response.data[0]);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            })
    }, [array]);
    console.log(category)
    let content;
    if (isloading) {
        content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
    } else if (!array) {
        content = <h2>No Course Data</h2>
    } else {
        content =
            <>
                <div className="col-12 px-5 py-2 position-relative" id="SingleCourseContant">
                    <div className="col-12 col-lg-7">
                        <div className="header col-12">
                            <div className=" col-12 d-flex flex-column align-items-start p-4 gap-4 gap-md-3  course-info">
                                <p className="navigate align-self-start"><Link to={"/"}><FormattedMessage id="home" /></Link> {lang == "EN" ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />} <Link to={"/courses"}><FormattedMessage id="courses" /></Link> {lang == "EN" ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />} {array.name}  </p>
                                <h1 className="mt-3">{array.name}</h1>
                                <div className="info d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 gap-md-0">
                                    <div className="d-flex gap-2 align-items-center instractuorName">
                                        <img src={instractuor} alt="" />
                                        <p><FormattedMessage id="by" />  {array.Instructor}</p>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center category">
                                        <img src={`../${category?.categoryImg}`} alt="category image" width={24} />
                                        <p>{array?.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CourseOverview />
            </>

    }
    console.log(id);
    return (
        <div id="SingleCourse">
            {content}
        </div>
    )
}
