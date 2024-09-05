import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema with Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    rating: Yup.number().min(0).max(5).required("Rating is required"),
    price: Yup.string().required("Price is required"),
    lessons: Yup.number().required("Number of lessons is required"),
    students: Yup.number().required("Number of students is required"),
    Duration: Yup.string().required("Duration is required"),
    Instructor: Yup.string().required("Instructor name is required"),
    Language: Yup.string().required("Language is required"),
    Certification: Yup.string().required("Certification info is required"),
    courseContent: Yup.array().of(
        Yup.object().shape({
            category: Yup.string().required("Category is required"),
            lessons: Yup.array().of(
                Yup.object().shape({
                    LessonName: Yup.string().required("Lesson name is required"),
                    desc: Yup.string().required("Lesson description is required"),
                    Link: Yup.string().url("Must be a valid URL").required("Link is required"),
                })
            )
        })
    )
});

const CourseForm = ({ initialValues, onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <div>
                        <label>Course Name</label>
                        <Field name="name" />
                        <ErrorMessage name="name" />
                    </div>

                    <div>
                        <label>Rating</label>
                        <Field name="rating" type="number" />
                        <ErrorMessage name="rating" />
                    </div>

                    <div>
                        <label>Price</label>
                        <Field name="price" />
                        <ErrorMessage name="price" />
                    </div>

                    <div>
                        <label>Lessons</label>
                        <Field name="lessons" type="number" />
                        <ErrorMessage name="lessons" />
                    </div>

                    <div>
                        <label>Students</label>
                        <Field name="students" type="number" />
                        <ErrorMessage name="students" />
                    </div>

                    <div>
                        <label>Duration</label>
                        <Field name="Duration" />
                        <ErrorMessage name="Duration" />
                    </div>

                    <div>
                        <label>Instructor</label>
                        <Field name="Instructor" />
                        <ErrorMessage name="Instructor" />
                    </div>

                    <div>
                        <label>Language</label>
                        <Field name="Language" />
                        <ErrorMessage name="Language" />
                    </div>

                    <div>
                        <label>Certification</label>
                        <Field name="Certification" />
                        <ErrorMessage name="Certification" />
                    </div>

                    {/* Handling Nested Structures like Course Content */}
                    <FieldArray name="courseContent">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.courseContent.map((content, index) => (
                                    <div key={index}>
                                        <label>Category</label>
                                        <Field name={`courseContent.${index}.category`} />
                                        <ErrorMessage name={`courseContent.${index}.category`} />

                                        <FieldArray name={`courseContent.${index}.lessons`}>
                                            {({ insert, remove, push }) => (
                                                <div>
                                                    {content.lessons.map((lesson, lessonIndex) => (
                                                        <div key={lessonIndex}>
                                                            <label>Lesson Name</label>
                                                            <Field
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.LessonName`}
                                                            />
                                                            <ErrorMessage
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.LessonName`}
                                                            />

                                                            <label>Description</label>
                                                            <Field
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.desc`}
                                                            />
                                                            <ErrorMessage
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.desc`}
                                                            />

                                                            <label>Link</label>
                                                            <Field
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.Link`}
                                                            />
                                                            <ErrorMessage
                                                                name={`courseContent.${index}.lessons.${lessonIndex}.Link`}
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() => remove(lessonIndex)}
                                                            >
                                                                Remove Lesson
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            push({
                                                                LessonName: "",
                                                                desc: "",
                                                                Link: ""
                                                            })
                                                        }
                                                    >
                                                        Add Lesson
                                                    </button>
                                                </div>
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
                                            category: "",
                                            lessons: [{ LessonName: "", desc: "", Link: "" }]
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
    );
};

// Example usage with initial values
const initialValues = {
    name: "Starting SEO as your Home Based Business",
    rating: 4,
    price: "$30",
    lessons: 11,
    students: 227,
    Duration: "15 Weeks",
    Instructor: "Jane Seymour",
    Language: "English",
    Certification: "Yes",
    courseContent: [
        {
            category: "On-Page SEO",
            lessons: [
                {
                    LessonName: "Lesson 1: On-Page SEO Basics",
                    desc: "In this lesson, you'll learn the fundamental elements of on-page SEO...",
                    Link: "src/assets/images/BMS College of Engineering _ Ad Film.mp4"
                }
            ]
        }
    ]
};

// Function to handle form submission
const handleSubmit = (values) => {
    console.log("Submitted data:", values);
};

const EditCourseForm = () => {
    return <CourseForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default EditCourseForm;
