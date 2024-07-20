import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { IoIosPaper } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { $lessonData } from '../../Store/Store';
export default function LessonsList() {
    const [array, setArray] = useState();
    const { courseId } = useParams()
    const [lessonData, setLessonData] = useRecoilState($lessonData)
    console.log(courseId)
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
    console.log(array);

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
                                            course.lessons.map((lesson, index) => {
                                                return (
                                                    <div key={index} className='lessonName d-flex gap-2 align-items-center' onClick={() => { setLessonData(lesson) }}> <IoIosPaper /> <p className='lessonName'>{lesson.LessonName}</p></div>
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
