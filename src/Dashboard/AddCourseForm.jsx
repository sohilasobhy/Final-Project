import axios from "axios";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $AllCourses, $CourseForm } from "../Store/Store";
import { UploadCourseScheme } from "../schemas/UploadCourseScheme";
import CustomModal from "../Components/Modal/Modal";
import Swal from "sweetalert2";
export default function AddCourseForm() {
    const [CourseForm, setCourseForm] = useRecoilState($CourseForm)
    const [Categories, setCategories] = useState([]);
    const [Instructors, setInstructors] = useState([]);
    const [Courses, setCourses] = useRecoilState($AllCourses);
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
    const url = "http://localhost:3000/Courses"
    const handleSubmit = (values) => {
        console.log(values)
        const objArray = values?.obj.split(',');
        values.obj = objArray
        let image = values.img.split("\\")[2]
        values.img = `src/assets/images/${image}`
        let video = values.comVideo.split("\\")[2]
        values.comVideo = `src/assets/images/${video}`
        let lessonLink = values.courseContent[0].lessons[0].Link.split("\\")[2]
        values.courseContent[0].lessons[0].Link = `src/assets/images/${lessonLink}`
        values.Duration = `${values.Duration} weeks`
        if (values.price == 0) {
            values.price = "free"
        } else {
            values.price = `$${values.price}`
        }
        let CatId = Categories.find((element) => element.categoryName == values.category)
        values.CtegoryId = CatId.id
        console.log(Instructors)
        let InstId = Instructors.find((element) => element.name == values.Instructor)
        console.log(Instructors)
        values.instructorId = InstId.id
        Swal.fire({
            title: "Are you sure you want to add this course?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then((res) => {
                        console.log(Instructors)
                        let instractor = Instructors.find((item) => String(item.name) === String(res.data.Instructor))
                        console.log(instractor)
                        let NewCourses = [...instractor.coursesID, res.data.id]
                        console.log(res.data)
                        console.log(NewCourses)
                        axios.put(`http://localhost:3000/Instructors/${instractor?.id}`, { ...instractor, coursesID: NewCourses })
                        Swal.fire({
                            title: "Added!",
                            text: "the course has been added.",
                            icon: "success"
                        });
                        setCourses([...Courses, res.data])
                        setCourseForm(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding this course.",
                            icon: "error"
                        });
                    });
            }
        });
    }
    const initialValues = {
        name: "",
        level: "Beginner",
        category: "Business Management",
        CtegoryId: "",
        price: "",
        lessons: "",
        Duration: "",
        Instructor: "Jane Seymour",
        Language: "English",
        comVideo: "",
        instructorId: "",
        img: "",
        obj: "",
        desc: "",
        Certification: "Yes",
        rating: "",
        totalRating: "",
        rates: "",
        students: "0",
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
                console.log(res.data)
                console.log(Instructors)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    if (CourseForm) {
        return (
            <CustomModal onHide={() => setCourseForm(false)} title={"Add Course Form"} show={CourseForm}>
                <div className=" col-10 col-md-8 col-lg-6 FormContainer">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={UploadCourseScheme}>
                        {({ values, errors }) => (
                            <Form className="p-3 d-flex flex-column gap-3" >
                                <div className="d-flex flex-column gap-1">
                                    <p>Enter Course Name</p>
                                    <Field type="text" name="name" />
                                    <span className="error">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <p>Course Level:</p>
                                    <Field as="select" name="level">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediat">Intermediat</option>
                                        <option value="Hard">Hard</option>
                                    </Field>
                                    <span className="error">
                                        <ErrorMessage name="level" />
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
                                    <Field type="number" min="10" max="70" name="lessons" />
                                    <span className="error">
                                        <ErrorMessage name="lessons" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <p>Enter Course Duration</p>
                                    <Field type="number" min="4" max="12" name="Duration" />
                                    <span className="error">
                                        <ErrorMessage name="Duration" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <p>Enter Course Instructor</p>
                                    <Field as="select" name="Instructor">
                                        {
                                            Instructors?.map((Instructor) => {
                                                return (
                                                    <option value={Instructor.name}>{Instructor.name}</option>
                                                )
                                            })
                                        }
                                    </Field>
                                    <span className="error">
                                        <ErrorMessage name="Instructor" />
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
                                    <Field type="file" name="comVideo" />
                                    <span className="error">
                                        <ErrorMessage name="comVideo" />
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
                                    <Field as="textarea" name="desc" />
                                    <span className="error">
                                        <ErrorMessage name="desc" />
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
                                                        className="mt-2"
                                                    />
                                                    <ErrorMessage
                                                        name={`courseContent[${index}].category`}
                                                        component="div"
                                                        className="error"
                                                    />

                                                    <FieldArray name={`courseContent[${index}].lessons`}>
                                                        {({ remove: removeLesson, push: pushLesson }) => (
                                                            <>
                                                                {category.lessons.map((lesson, lessonIndex) => (
                                                                    <div key={lessonIndex}>
                                                                        <h4 className="mt-2">Lesson {lessonIndex + 1}</h4>
                                                                        <Field
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].LessonName`}
                                                                            placeholder="Lesson Name"
                                                                            as="textarea"
                                                                        />
                                                                        <br />
                                                                        <ErrorMessage
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].LessonName`}
                                                                            component="div"
                                                                            className="error"
                                                                        />
                                                                        <Field
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].desc`}
                                                                            placeholder="Lesson Description"
                                                                            as="textarea"
                                                                            className="mt-2"
                                                                        />
                                                                        <br />
                                                                        <ErrorMessage
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].desc`}
                                                                            component="div"
                                                                            className="error"
                                                                        />
                                                                        <h4>Lesson video</h4>
                                                                        <Field
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].Link`}
                                                                            type="file"
                                                                        />
                                                                        <br />
                                                                        <ErrorMessage
                                                                            name={`courseContent[${index}].lessons[${lessonIndex}].Link`}
                                                                            component="div"
                                                                            className="error"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeLesson(lessonIndex)}
                                                                            className="mt-2 btn btn-danger"
                                                                        >
                                                                            Remove Lesson
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    className="mt-2 btn btn-primary"
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
                                                    {
                                                        console.log(errors)
                                                    }
                                                    <button type="button" className="mt-2 ms-2 btn btn-danger" onClick={() => remove(index)}>
                                                        Remove Category
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="btn btn-primary"
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
                                <button type="submit" className="btn btn-success">Upload the course</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </CustomModal>
        )
    }
}
