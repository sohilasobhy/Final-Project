import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Spinner, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import right from "../../assets/images/check-mark(1).png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import reviewer1 from "../../assets/images/user.png"
import { IoIosPaper } from "react-icons/io";
import SingleCourseComponent from '../../Components/SingleCourseComponent';
import { RateStarsClick } from '../../Components/RateStarsClick/RateStarsClick';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { RateStars } from '../RateStars/RateStars';
import CommercialVid from './CommercialVid';
import CourseDetails from './CourseDetails';
import { useRecoilState } from 'recoil';
import { $UserInfo } from '../../Store/Store';
import { ReviewScheme } from '../../schemas/ReviweScheme';
import { toast } from 'react-toastify';
const CourseOverview = () => {
    let url = "http://localhost:3000/Reviews"
    const [key, setKey] = useState('home');
    let { id } = useParams();
    const [courses, setCourses] = useState();
    const [instractour, setInstructor] = useState();
    const [Reviews, setReviews] = useState();
    const [Cateories, setCategories] = useState();
    const [reviewers, setreviewers] = useState();
    const [reviewsShow, setReviewsShow] = useState(3)
    const [isloading, setIsloading] = useState(false);
    const [userInfo] = useRecoilState($UserInfo)
    console.log(userInfo)
    const [valid, setValid] = useState(false)
    let handleSubmit = (values, { resetForm }) => {
        console.log(values);
        axios.post(url, values)
            .then(response => {
                console.log(response);
                toast.success("Your review has been added");
                setReviews([...Reviews, values]);
                resetForm(); // Ensure resetForm is called after successful submission
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        setIsloading(true)
        axios
            .get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            }).finally(() => {
                setIsloading(false);
            });
    }, [id]);

    useEffect(() => {
        if (courses) {
            axios
                .get(`http://localhost:3000/Instructors?id=${courses?.instructorId}`)
                .then((response) => {
                    setInstructor(response.data[0]);
                    console.log(courses)
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [courses])

    useEffect(() => {
        if (courses) {
            axios
                .get(`http://localhost:3000/Courses?category=${courses.category}`)
                .then((response) => {
                    setCategories(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [courses])

    useEffect(() => {
        if (courses) {
            axios
                .get(`http://localhost:3000/Users`)
                .then((response) => {
                    setreviewers(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [courses])
    useEffect(() => {
        if (courses) {
            axios
                .get(`http://localhost:3000/Reviews?courseID=${courses?.id}`)
                .then((response) => {
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [courses])
    console.log(courses)
    useEffect(() => {
        // if (userInfo != null && userInfo?.favouriteCoursesId.includes(Number(courses?.id))) {
        // setValid(true)
        // }
    }, [userInfo])
    console.log(valid)
    let relatedCourses = Cateories?.filter((course) => {
        return course?.id != courses?.id;
    });
    // const [relatedCourses] = Cateories?.filter((course) => { return console.log(course) })
    function getReviewerImage(userId) {
        let x = reviewers?.find((ele) => ele.id == userId);
        console.log(x);
        return x;
    }


    let content;

    if (isloading) {
        content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
    } else if (!courses) {
        content = <h2>No Course Data</h2>
    } else {
        content =
            <div id='main'>
                <Tabs
                    id="controlled-tab-example CourseOverview"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 col-12 col-lg-6 ms-0 ms-lg-5"
                >
                    <Tab eventKey="home" title="Overview" className='col-12 col-lg-6 p-2 p-lg-5 Overview'>
                        <div className='p-5'>
                            <h3 className=' align-self-start'>Course Overview</h3>
                            <p className='mt-4'>
                                {courses.desc}
                            </p>
                            <h3 className='mt-5 align-self-start'>What You’ll Learn? </h3>
                            <div className='mt-3'>
                                {courses.obj.map((objective, index) => {
                                    return (
                                        <div className='d-flex gap-2 mt-3' key={index}>
                                            <img src={right} alt="check-mark" className='object-fit-contain' />
                                            <p>{objective}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Curriculum" className='col-12 col-lg-6 p-2 p-lg-5 Curriculum'>
                        <div>
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                {
                                    courses?.courseContent?.map((course, index) => {
                                        return (
                                            <Accordion.Item eventKey={`${index}`} className='mt-3' key={index}>
                                                <Accordion.Header>{course.category}</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        course.lessons.map((lesson, index) => {
                                                            console.log(lesson)
                                                            return (
                                                                <Link to={`${valid ? `/lessons/${id}` : ""}`} key={index} className='lessonName d-flex gap-2 align-items-center'> <IoIosPaper /> <p>{lesson.LessonName}</p></Link>
                                                            )
                                                        })
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })
                                }

                            </Accordion>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Instructor" className='col-12 col-lg-8 p-1 '>
                        <div className='p-5 contant d-flex flex-column flex-md-row gap-4 instructorInfo align-items-center align-items-lg-start'>
                            <img src={`/${instractour?.img}`} alt="instructor-img" />
                            <div className='col-12 col-md-7 col-lg-6 d-flex flex-column gap-4'>
                                <div>
                                    <h4>{instractour?.name}</h4>
                                    <p className='job'>{instractour?.job}</p>
                                </div>
                                <p className='col-12 col-lg-10 about'>{instractour?.About}</p>
                                <div className='d-flex gap-3 col-6'>
                                    <div className='d-flex justify-content-center align-items-center  socialMediaIcons' onClick={() => {
                                        window.open(`${instractour?.Contact?.facebook}`, '_blank')
                                    }}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center socialMediaIcons' onClick={() => {
                                        window.open(`${instractour?.Contact?.twitter}`, '_blank')
                                    }}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </div>
                                    <a className='d-flex justify-content-center align-items-center   socialMediaIcons' onClick={() => {
                                        window.open(`${instractour?.Contact?.linkedIn}`, '_blank')
                                    }}
                                    >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>

                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="new-tab" title="Reviews">
                        <div className='px-2 py-5 p-md-5 contant col-12 col-lg-6'>
                            <div className="top  d-flex flex-column flex-md-row align-items-center gap-5 col-12">
                                <div className='rating d-flex flex-column align-items-center justify-content-center gap-3'>
                                    <p>{courses.rating}</p>
                                    <RateStars rate={courses.rating} />
                                </div>
                                {/* <div className='d-flex flex-column col-8 gap-2 align-items-center'>
                                    <div className='d-flex align-items-center col-12 gap-1 ratingBar  m-auto'>
                                        <p>5</p>
                                        <FaStar />
                                        <div className='rateBar col-12'></div>
                                        <p>2</p>
                                    </div>
                                    <div className='d-flex align-items-center col-12 gap-1 ratingBar '>
                                        <p>4</p>
                                        <FaStar />
                                        <div className='rateBar notRated col-12'></div>
                                        <p>0</p>
                                    </div>
                                    <div className='d-flex align-items-center col-12 gap-1 ratingBar '>
                                        <p>3</p>
                                        <FaStar />
                                        <div className='rateBar notRated col-12'></div>
                                        <p>0</p>
                                    </div>
                                    <div className='d-flex align-items-center col-12 gap-1 ratingBar '>
                                        <p>2</p>
                                        <FaStar />
                                        <div className='rateBar notRated col-12'></div>
                                        <p>0</p>
                                    </div>
                                    <div className='d-flex align-items-center col-12 gap-1 ratingBar '>
                                        <p>1</p>
                                        <FaStar />
                                        <div className='rateBar notRated col-12'></div>
                                        <p>0</p>
                                    </div>
                                </div> */}
                            </div>
                            {userInfo &&
                                <div className="leaveReview mt-5">
                                    <Formik
                                        initialValues={{
                                            comment: "",
                                            rating: 0,
                                            courseID: courses.id,
                                            userId: userInfo?.id,
                                        }}
                                        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
                                        validationSchema={ReviewScheme}
                                    >
                                        {({ setFieldValue }) => (
                                            <Form className='col-12'>
                                                <h4>Leave a review:</h4>
                                                <div className='d-flex flex-column align-items-center gap-2 p-3 ms-3'>
                                                    <RateStarsClick setFieldValue={setFieldValue} />
                                                    <h4>Add Your Review</h4>
                                                    <Field name="comment" type="text" placeholder='Write your review' className='col-8  comment' />
                                                    <span className='text-danger fw-bold'>
                                                        <ErrorMessage name='comment' />
                                                    </span>
                                                    <button type='submit' className='col-8 btn btn-success'>
                                                        submit
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>}
                            <div className="Reviews mt-5 ">
                                <h4>Reviews:</h4>
                                {Reviews?.length > 0 ?
                                    Reviews.slice(0, reviewsShow).map((item, index) => {
                                        return (
                                            <div key={item.id} className='d-flex flex-column flex-md-row  p-3 gap-3'>
                                                <img
                                                    src={`../../${getReviewerImage(item.userId)?.img ? getReviewerImage(item.userId)?.img : reviewer1}`}
                                                    alt="reviewer image"
                                                    className='reviewerImg' />
                                                <div>
                                                    <RateStars rate={item.rating} />
                                                    <p className='reviewerName'>{item.name}</p>
                                                    <p className='ReviewComment'>{item.comment}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <h5 className='text-muted py-3'>No Reviews To Show</h5>}
                                <div className="d-flex align-items-center gap-3 buttons">
                                    {reviewsShow < Reviews?.length &&
                                        <Button onClick={() => setReviewsShow(reviewsShow + 3)} className='btn1'>Show More</Button>
                                    }
                                    {reviewsShow >= 6 &&
                                        <Button variant='danger' onClick={() => setReviewsShow(reviewsShow - 3)}>Show Less</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <CourseDetails />
                <div className='p-5'>
                    {
                        Cateories?.length > 1 ?
                            <div>
                                <h3>Courses You May Like</h3>
                                <div className='row align-items-stretch mt-3 g-5 g-lg-3 justify-content-center'>
                                    {relatedCourses?.slice(0, 3).map((course) => {
                                        return (
                                            <div
                                                className="col-12 col-md-6 col-lg-4 position-relative"
                                                key={course.id}>
                                                <SingleCourseComponent
                                                    color={"#f0f4f5"}
                                                    course={course}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            : ""
                    }
                </div>
                <CommercialVid />
            </div >
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default CourseOverview;
