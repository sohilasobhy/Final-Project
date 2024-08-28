import axios from "axios";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $CourseForm } from "../Store/Store";
import { UploadCourseScheme } from "../schemas/UploadCourseScheme";
export default function AddCourseForm() {
    const [CourseForm, setCourseForm] = useRecoilState($CourseForm)
    const [Categories, setCategories] = useState()
    console.log(Categories)
    const [Instructors, setInstructors] = useState()
    const handleSubmit = (values) => {
        const objArray = values?.obj.split(',');
        values.obj = objArray
        let image = values.img.split("\\")[2]
        values.img = `src/assets/images/${image}`
        let video = values.video.split("\\")[2]
        values.video = `src/assets/images/${video}`
        values.duration = `${values.duration} weeks`
        if (values.price == 0) {
            values.price = "free"
        } else {
            values.price = `$${values.price}`
        }
        console.log(values)
    }
    const initialValues = {
        name: "",
        Levels: "Beginner",
        category: "Business Management",
        CtegoryId: "",
        price: "",
        lesson: "",
        duration: "",
        Instructors: "Jane Seymour",
        Language: "English",
        video: "",
        img: "",
        obj: "",
        description: "",
        Certification: "Yes",
        courseContent: [
            {
                category: '',
                lessons: [
                    {
                        LessonName: '',
                        desc: '',
                        Link: '',
                    },
                ],
            },
        ],
    }
    useEffect(() => {
        axios
            .get("http://localhost:3000/Categories")
            .then((res) => {
                setCategories(res.data)
                console.log(Categories)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get("http://localhost:3000/Instructors")
            .then((res) => {
                setInstructors(res.data)
                console.log(Instructors)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    if (CourseForm) {
        return (
            <div id="AddCourseForm">
                <div className="filter d-flex justify-content-center align-items-center" onClick={(event) => {
                    event.stopPropagation();
                    // setCourseForm(false);
                }}>
                    <div className=" col-10 col-md-8 col-lg-6 FormContainer">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={UploadCourseScheme}>
                            {({ values }) => (
                                <Form className="p-3 d-flex flex-column gap-3" >
                                    <h2 className="text-center mb-3">Upload New Course</h2>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Enter Course Name</p>
                                        <Field type="text" name="name" />
                                        <span className="error">
                                            <ErrorMessage name="name" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Course Level:</p>
                                        <Field as="select" name="Levels">
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediat">Intermediat</option>
                                            <option value="Hard">Hard</option>
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="Levels" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Course Category:</p>
                                        <Field as="select" name="category">
                                            {
                                                Categories?.map((Category) => {
                                                    return (
                                                        <option value={Category.categoryName}>{Category.categoryName}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="category" />
                                        </span>
                                        <Link to={"/dashboard/Categories"} onClick={() => setCourseForm(false)}>+ Add another category</Link>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Enter Course Lessons</p>
                                        <Field type="number" min="20" max="70" name="lesson" />
                                        <span className="error">
                                            <ErrorMessage name="lesson" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Enter Course Duration</p>
                                        <Field type="number" min="4" max="12" name="duration" />
                                        <span className="error">
                                            <ErrorMessage name="duration" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Enter Course Instructor</p>
                                        <Field as="select" name="Instructors">
                                            {
                                                Instructors?.map((Instructor) => {
                                                    return (
                                                        <option value={Instructor.name}>{Instructor.name}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="Instructors" />
                                        </span>
                                        <Link to={"/dashboard/Instructors"} onClick={() => setCourseForm(false)}>+ Add another Instructor</Link>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Course Language</p>
                                        <Field as="select" name="Language">
                                            <option value="English">English</option>
                                            <option value="Arabic">Arabic</option>
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="Language" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Commercial Video</p>
                                        <Field type="file" name="video" />
                                        <span className="error">
                                            <ErrorMessage name="video" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Commercial Image</p>
                                        <Field type="file" name="img" />
                                        <span className="error">
                                            <ErrorMessage name="img" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Course Objectives</p>
                                        <Field
                                            as="textarea"
                                            name="obj"
                                            placeholder="Enter values separated by commas"
                                        />
                                        <span className="error">
                                            <ErrorMessage name="obj" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Description</p>
                                        <Field as="textarea" name="description" />
                                        <span className="error">
                                            <ErrorMessage name="description" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Course price</p>
                                        <Field type="number" name="price" min="0" max="200" />
                                        <span className="error">
                                            <ErrorMessage name="price" />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-1">
                                        <p>Certification</p>
                                        <Field as="select" name="Certification">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="Certification" />
                                        </span>
                                    </div>
                                    <FieldArray name="courseContent">
                                        {({ remove, push }) => (
                                            <>
                                                {values.courseContent.map((category, index) => (
                                                    <div key={index}>
                                                        <h3>Category {index + 1}</h3>
                                                        <Field
                                                            name={`courseContent[${index}].category`}
                                                            placeholder="Category Name"
                                                        />
                                                        <FieldArray name={`courseContent[${index}].lessons`}>
                                                            {({ remove: removeLesson, push: pushLesson }) => (
                                                                <>
                                                                    {category.lessons.map((lesson, lessonIndex) => (
                                                                        <div key={lessonIndex}>
                                                                            <h4>Lesson {lessonIndex + 1}</h4>
                                                                            <Field
                                                                                name={`courseContent[${index}].lessons[${lessonIndex}].LessonName`}
                                                                                placeholder="Lesson Name"
                                                                            />
                                                                            <Field
                                                                                name={`courseContent[${index}].lessons[${lessonIndex}].desc`}
                                                                                placeholder="Lesson Description"
                                                                            />
                                                                            <Field
                                                                                name={`courseContent[${index}].lessons[${lessonIndex}].Link`}
                                                                                placeholder="Media Link"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeLesson(lessonIndex)}
                                                                            >
                                                                                Remove Lesson
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            pushLesson({
                                                                                LessonName: '',
                                                                                desc: '',
                                                                                Link: '',
                                                                            })
                                                                        }
                                                                    >
                                                                        Add Lesson
                                                                    </button>
                                                                </>
                                                            )}
                                                        </FieldArray>
                                                        <button type="button" onClick={() => remove(index)}>
                                                            Remove Category
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            category: '',
                                                            lessons: [
                                                                {
                                                                    LessonName: '',
                                                                    desc: '',
                                                                    Link: '',
                                                                },
                                                            ],
                                                        })
                                                    }
                                                >
                                                    Add Category
                                                </button>
                                            </>
                                        )}
                                    </FieldArray>
                                    <button type="submit" className="btn btn-success">Next</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        )
    }
}
