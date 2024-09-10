import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $EditForm, $EditFormCourse } from "../Store/Store";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
export default function EditForm() {
    const [openModal, setOpen] = useRecoilState($EditForm)
    const [courseId] = useRecoilState($EditFormCourse)
    const [course, setCourse] = useState()
    console.log(courseId)
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Courses/${Number(courseId)}`)
            .then((res) => {
                setCourse(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [courseId])
    const courseValidationSchema = Yup.object().shape({
        name: Yup.string().required("Course name is required"),
        level: Yup.string().required("Level is required"),
        rating: Yup.number().min(0).max(5).required("Rating is required"),
        price: Yup.string().required("Price is required"),
        lessons: Yup.number().required("Lessons are required"),
        duration: Yup.string().required("Duration is required"),
        instructor: Yup.string().required("Instructor is required"),
        language: Yup.string().required("Language is required"),
        certification: Yup.string().required("Certification info is required"),
        courseContent: Yup.array().of(
            Yup.object().shape({
                category: Yup.string().required("Category is required"),
                lessons: Yup.array().of(
                    Yup.object().shape({
                        LessonName: Yup.string().required("Lesson name is required"),
                        desc: Yup.string().required("Lesson description is required"),
                        Link: Yup.string().url().required("Video link is required"),
                    })
                ),
            })
        ),
    });
    console.log(course)
    const initialValues = {
        name: `${course?.name}`,
        level: `${course?.name}`,
        rating: `${course?.rating}`,
        price: `${course?.price}`,
        lessons: `${course?.lessons}`,
        duration: `${course?.duration}`,
        instructor: "Jane Seymour",
        language: "English",
        certification: "Yes",
        courseContent: [
            {
                category: "Introduction to Web Development",
                lessons: [
                    {
                        LessonName: "Lesson 1: What is Web Development?",
                        desc: "In this lesson, you'll get an introduction to web development...",
                        Link: "src/assets/images/BMS College of Engineering _ Ad Film.mp4",
                    },
                    {
                        LessonName: "Lesson 2: Overview of Web Technologies",
                        desc: "This lesson provides a broad overview of the key technologies...",
                        Link: "src/assets/images/Digital Marketing Promotional Video - Marketing Agency Ad.mp4",
                    },
                ],
            },
            {
                category: "HTML Basics",
                lessons: [
                    {
                        LessonName: "Lesson 3: Getting Started with HTML",
                        desc: "In this lesson, you'll learn the fundamentals of HTML...",
                        Link: "src/assets/images/Coaching Institute Advertisement Video.mp4",
                    },
                    {
                        LessonName: "Lesson 4: Structuring a Web Page",
                        desc: "This lesson focuses on organizing and structuring a web page using HTML...",
                        Link: "src/assets/images/BMS College of Engineering _ Ad Film.mp4",
                    },
                ],
            },
        ],
    };

    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title="Edit course form">
            <Formik
                initialValues={initialValues}
                validationSchema={courseValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Course Name</label>
                            <Field id="name" name="name" placeholder="Course Name" />
                            {errors.name && touched.name ? <div>{errors.name}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="level">Level</label>
                            <Field id="level" name="level" placeholder="Beginner" />
                            {errors.level && touched.level ? <div>{errors.level}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="rating">Rating</label>
                            <Field id="rating" name="rating" type="number" placeholder="4.8" />
                            {errors.rating && touched.rating ? <div>{errors.rating}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <Field id="price" name="price" placeholder="$50" />
                            {errors.price && touched.price ? <div>{errors.price}</div> : null}
                        </div>

                        <div>
                            <label htmlFor="lessons">Lessons</label>
                            <Field id="lessons" name="lessons" type="number" placeholder="11" />
                            {errors.lessons && touched.lessons ? <div>{errors.lessons}</div> : null}
                        </div>

                        <div>
                            <label htmlFor="duration">Duration</label>
                            <Field id="duration" name="duration" placeholder="12 Weeks" />
                            {errors.duration && touched.duration ? <div>{errors.duration}</div> : null}
                        </div>

                        <div>
                            <label htmlFor="instructor">Instructor</label>
                            <Field id="instructor" name="instructor" placeholder="Jane Seymour" />
                            {errors.instructor && touched.instructor ? <div>{errors.instructor}</div> : null}
                        </div>

                        <div>
                            <label htmlFor="language">Language</label>
                            <Field id="language" name="language" placeholder="English" />
                            {errors.language && touched.language ? <div>{errors.language}</div> : null}
                        </div>

                        <div>
                            <label htmlFor="certification">Certification</label>
                            <Field id="certification" name="certification" placeholder="Yes" />
                            {errors.certification && touched.certification ? <div>{errors.certification}</div> : null}
                        </div>

                        {/* Course Content - FieldArray */}
                        <FieldArray name="courseContent">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.courseContent.length > 0 &&
                                        values.courseContent.map((content, index) => (
                                            <div key={index}>
                                                <h4>Category {index + 1}</h4>

                                                <div>
                                                    <label htmlFor={`courseContent.${index}.category`}>Category</label>
                                                    <Field
                                                        name={`courseContent.${index}.category`}
                                                        placeholder="Category Name"
                                                    />
                                                    {errors.courseContent?.[index]?.category &&
                                                        touched.courseContent?.[index]?.category ? (
                                                        <div>{errors.courseContent[index].category}</div>
                                                    ) : null}
                                                </div>

                                                <FieldArray name={`courseContent.${index}.lessons`}>
                                                    {({ insert, remove, push }) => (
                                                        <div>
                                                            {content.lessons.length > 0 &&
                                                                content.lessons.map((lesson, lessonIndex) => (
                                                                    <div key={lessonIndex}>
                                                                        <h5>Lesson {lessonIndex + 1}</h5>

                                                                        <div>
                                                                            <label htmlFor={`courseContent.${index}.lessons.${lessonIndex}.LessonName`}>
                                                                                Lesson Name
                                                                            </label>
                                                                            <Field
                                                                                name={`courseContent.${index}.lessons.${lessonIndex}.LessonName`}
                                                                                placeholder="Lesson Name"
                                                                            />
                                                                            {errors.courseContent?.[index]?.lessons?.[lessonIndex]
                                                                                ?.LessonName &&
                                                                                touched.courseContent?.[index]?.lessons?.[lessonIndex]
                                                                                    ?.LessonName ? (
                                                                                <div>
                                                                                    {errors.courseContent[index].lessons[lessonIndex]
                                                                                        .LessonName}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>

                                                                        <div>
                                                                            <label htmlFor={`courseContent.${index}.lessons.${lessonIndex}.desc`}>
                                                                                Description
                                                                            </label>
                                                                            <Field
                                                                                name={`courseContent.${index}.lessons.${lessonIndex}.desc`}
                                                                                placeholder="Lesson Description"
                                                                            />
                                                                            {errors.courseContent?.[index]?.lessons?.[lessonIndex]?.desc &&
                                                                                touched.courseContent?.[index]?.lessons?.[lessonIndex]?.desc ? (
                                                                                <div>
                                                                                    {errors.courseContent[index].lessons[lessonIndex].desc}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>

                                                                        <div>
                                                                            <label htmlFor={`courseContent.${index}.lessons.${lessonIndex}.Link`}>
                                                                                Video Link
                                                                            </label>
                                                                            <Field
                                                                                name={`courseContent.${index}.lessons.${lessonIndex}.Link`}
                                                                                placeholder="Lesson Video Link"
                                                                            />
                                                                            {errors.courseContent?.[index]?.lessons?.[lessonIndex]?.Link &&
                                                                                touched.courseContent?.[index]?.lessons?.[lessonIndex]?.Link ? (
                                                                                <div>
                                                                                    {errors.courseContent[index].lessons[lessonIndex].Link}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            <button
                                                                type="button"
                                                                onClick={() => push({ LessonName: "", desc: "", Link: "" })}
                                                            >
                                                                Add Lesson
                                                            </button>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                        ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            push({
                                                category: "",
                                                lessons: [{ LessonName: "", desc: "", Link: "" }],
                                            })
                                        }
                                    >
                                        Add Category
                                    </button>
                                </div>
                            )}
                        </FieldArray>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    )
}
