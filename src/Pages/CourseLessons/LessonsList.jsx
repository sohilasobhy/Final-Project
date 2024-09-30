import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { IoIosPaper } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { $UserInfo, $lessonData } from '../../Store/Store';
export default function LessonsList() {
    const [array, setArray] = useState();
    const { courseId } = useParams()
    const [userInfo, setUserInfo] = useRecoilState($UserInfo)
    const [lessonData, setLessonData] = useRecoilState($lessonData)
    const [lastLesson, setlastLesson] = useState(false)
    console.log(courseId)
    console.log(userInfo)
    console.log(userInfo?.completedCourses?.includes(Number(courseId)))
    useEffect(() => {
        if (lastLesson) {
            if (userInfo?.completedCourses?.includes(Number(courseId)) == false) {
                let ubdatedCoursesInProg = userInfo?.validCoursesId.filter((e) => {
                    return (
                        Number(e) != Number(courseId)
                    )
                })
                console.log(ubdatedCoursesInProg)
                console.log(userInfo?.completedCourses)
                let ubdatedCompletedCourses = [...userInfo?.completedCourses, Number(courseId)]
                console.log(ubdatedCompletedCourses)
                let ubdatedUserInfo = { ...userInfo, completedCourses: ubdatedCompletedCourses, validCoursesId: ubdatedCoursesInProg }
                console.log(ubdatedUserInfo)
                setUserInfo(ubdatedUserInfo)
                console.log(userInfo)
                if (sessionStorage.getItem("user") != null) {
                    sessionStorage.setItem("user", JSON.stringify(ubdatedUserInfo))
                } else if (localStorage.getItem("user") != null) {
                    localStorage.setItem("user", JSON.stringify(ubdatedUserInfo))
                }
                axios
                    .put(`http://localhost:3000/Users/${userInfo?.id}`, ubdatedUserInfo)
                    .then(response => {
                        console.log("User info updated on the server:", response.data);
                    })
                    .catch(error => {
                        console.error("Error updating user info on the server:", error);
                    });
            }
        }
    }, [lastLesson])
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Courses/${courseId}`)
            .then((response) => {
                setArray(response.data);
                setLessonData(response?.data?.courseContent[0]?.lessons[0])
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    return (
        <div className='col-12 col-lg-4 h-100' id='LessonsList'>
            <div>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {
                        array?.courseContent?.map((course, index) => {
                            return (
                                <Accordion.Item eventKey={`${index}`} className='mt-3' key={index}>
                                    <Accordion.Header>{course.category}</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            course.lessons.map((lesson, idx) => {
                                                console.log(lesson.LessonName == lessonData.LessonName)
                                                return (
                                                    <div key={index} className={`lessonName d-flex gap-2 align-items-center ${lesson.LessonName == lessonData.LessonName ? "active" : ""}`} onClick={() => { setLessonData(lesson), index == array.courseContent.length - 1 && idx == course.lessons.length - 1 ? setlastLesson(true) : "" }}> <IoIosPaper /> <p className='lessonName'>{lesson.LessonName}</p></div>
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
        </div>
    )
}
