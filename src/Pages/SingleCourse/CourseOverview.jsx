import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import right from "../../assets/images/check-mark(1).png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import stars from "../../assets/images/rating.png"
import { FaStar } from "react-icons/fa";
import reviewer1 from "../../assets/images/reviewer1.webp"
import { IoIosPaper } from "react-icons/io";
import SingleCourseComponent from '../../Components/SingleCourseComponent';
import { RateStarsClick } from '../../Components/RateStarsClick/RateStarsClick';
import { Field, Form, Formik } from 'formik';
const CourseOverview = () => {
    const [key, setKey] = useState('home');
    let { id } = useParams();
    console.log(id)
    const [array, setArray] = useState();
    const [instractour, setInstructor] = useState();
    const [Reviews, setReviews] = useState();
    const [Cateories, setCategories] = useState();
    const [courseReviews, setCourseReviews] = useState();
    const [isloading, setIsloading] = useState(false);
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
        if (array) {
            axios
                .get(`http://localhost:3000/Instructors?id=${array?.instructorId}`)
                .then((response) => {
                    setInstructor(response.data[0]);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [array])

    useEffect(() => {
        if (array) {
            axios
                .get(`http://localhost:3000/Reviews`)
                .then((response) => {
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [array])
    useEffect(() => {
        if (array) {
            axios
                .get(`http://localhost:3000/Courses?category=${array.category}`)
                .then((response) => {
                    setCategories(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [array])
    useEffect(() => {
        if (array) {
            axios
                .get(`http://localhost:3000/Courses?id=${Reviews?.courseID}`)
                .then((response) => {
                    setCourseReviews(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                }).finally(() => {
                    setIsloading(false);
                });
        }
    }, [array])
    console.log(array)
    console.log(instractour)
    console.log(Reviews)
    console.log(courseReviews)
    console.log(Cateories)
    let content;
    if (isloading) {
        content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
    } else if (!array) {
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
                    <Tab eventKey="home" title="Overview" className='col-12 col-lg-6 p-2 p-lg-5  '>
                        <div className='p-5'>
                            <h3 className=' align-self-start'>Course Overview</h3>
                            <p className='mt-4'>
                                {array.desc}
                            </p>
                            <h3 className='mt-5 align-self-start'>What You’ll Learn? </h3>
                            <div className='mt-3'>
                                {array.Objectives.map((objective, index) => {
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
                    <Tab eventKey="profile" title="Curriculum" className='col-12 col-lg-6 p-2 p-lg-5 '>
                        <div>
                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                {
                                    array?.courseContent?.map((course, index) => {
                                        return (
                                            <Accordion.Item eventKey={`${index}`} className='mt-3' key={index}>
                                                <Accordion.Header>{course.category}</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        course.lessons.map((lesson, index) => {
                                                            return (
                                                                <div key={index} className='lessonName d-flex gap-2 align-items-center' onClick={() => { window.location.href = `${lesson.Link}` }}> <IoIosPaper /> <p>{lesson.LessonName}</p></div>
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
                                        window.location.href = `${instractour?.Contact?.facebook}`
                                    }}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center socialMediaIcons' onClick={() => {
                                        window.location.href = `${instractour?.Contact?.twitter}`
                                    }}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </div>
                                    <a className='d-flex justify-content-center align-items-center   socialMediaIcons' onClick={() => { window.location.href = `${instractour?.Contact?.linkedIn}`; }}
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
                                    <p>{array.rating}</p>
                                    <img src={stars} alt="" />
                                </div>
                                <div className='d-flex flex-column col-8 gap-2 align-items-center'>
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
                                </div>
                            </div>
                            <div className="Reviews mt-5">
                                <h4>Reviews:</h4>
                                <div className='d-flex flex-column flex-md-row  p-3 gap-3'>
                                    <img src={reviewer1} alt="" className='reviewerImg' />
                                    <div>
                                        <img src={stars} alt="" />
                                        <p className='reviewerName'>Edward Norton</p>
                                        <p className='ReviewComment'>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="leaveReview mt-5">
                                <Formik
                                    initialValues={{
                                        comment: "",
                                        rating: null
                                    }}
                                    onSubmit={(values) => handleSubmit(values)}
                                >
                                    {({ setFieldValue }) => (
                                        <Form className='col-12'>
                                            <h4>Leave a review:</h4>
                                            {/* {console.log(error)} */}
                                            <div className='d-flex flex-column align-items-center gap-2 p-3 ms-3'>
                                                <RateStarsClick setFieldValue={setFieldValue} />
                                                <Field name="comment" type="text" placeholder='Write your review' className='col-8  comment' />
                                                <button type='submit' className='col-8 btn btn-success'>
                                                    submit
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>

                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <div className='p-5'>
                    <h3>Courses You May Like</h3>
                    <div className='row align-items-stretch mt-3 g-5 g-lg-3'>
                        {Cateories?.slice(0, 3).map((course, index) => {
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
            </div >
    }
    let handleSubmit = (values) => {
        console.log(values)

    }
    return (
        <div>
            {content}

        </div>
    );
}

export default CourseOverview;
