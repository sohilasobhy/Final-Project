import React from 'react';
import { Formik, FieldArray, Form, Field } from 'formik';

const initialValues = {
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
};

const CourseContentForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ values }) => (
                <Form>
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
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default CourseContentForm;
