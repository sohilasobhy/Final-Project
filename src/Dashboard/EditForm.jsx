import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AllCourses, $EditForm, $EditFormCourse } from "../Store/Store";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useEffect } from "react";
import axios from "axios";
import { EditCourseScheme } from "../schemas/EditCourseScheme";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";
export default function EditForm() {
    const [openModal, setOpen] = useRecoilState($EditForm);
    const [allCourses, setAllCourses] = useRecoilState($AllCourses)
    const [courseId] = useRecoilState($EditFormCourse);
    let intl = useIntl()
    const course = allCourses.find((e) => {
        return (
            e.id === courseId
        )
    })
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Courses`)
            .then((res) => {
                setAllCourses(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [courseId]);
    const initialValues = {
        id: course?.id,
        name: course?.name,
        level: course?.level,
        rating: course?.rating,
        price: course?.price,
        category: course?.category,
        CtegoryId: course?.CtegoryId,
        lessons: course?.lessons,
        Duration: course?.Duration,
        Instructor: course?.Instructor,
        Language: course?.Language,
        Certification: course?.Certification,
        courseContent: course?.courseContent,
        students: course?.students,
        img: course?.img,
        comVideo: course?.comVideo,
        instructorId: course?.instructorId,
        totalRating: course?.totalRating,
        rates: course?.rates,
        obj: course?.obj,
        desc: course?.desc
    };

    const handleSubmit = (values) => {
        console.log(values);

        Swal.fire({
            title: intl.formatMessage({ id: "areYouSure" }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" })
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`http://localhost:3000/Courses/${Number(courseId)}`, values)
                    .then((res) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "courseDone" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setOpen(false)
                        const editedCourses = [...allCourses]
                        editedCourses.splice(
                            editedCourses.findIndex((e) => e.id == res.data.id),
                            1,
                            {
                                id: res.data?.id,
                                name: res.data?.name,
                                level: res.data?.level,
                                rating: res.data?.rating,
                                price: res.data?.price,
                                category: res.data?.category,
                                CtegoryId: res.data?.CtegoryId,
                                lessons: res.data?.lessons,
                                Duration: res.data?.Duration,
                                Instructor: res.data?.Instructor,
                                Language: res.data?.Language,
                                Certification: res.data?.Certification,
                                courseContent: res.data?.courseContent,
                                students: res.data?.students,
                                img: res.data?.img,
                                comVideo: res.data?.comVideo,
                                instructorId: res.data?.instructorId,
                                totalRating: res.data?.totalRating,
                                rates: res.data?.rates,
                                obj: res.data?.obj,
                                desc: res.data?.desc
                            }
                        )
                        setAllCourses(editedCourses)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
                axios
                    .put(`http://localhost:3000/HomeCourses/${Number(courseId)}`, values)
            }
        });
    };

    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title={<FormattedMessage id="editCourse" />}>
            {course ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={EditCourseScheme}
                    onSubmit={(values) => handleSubmit(values)}
                    enableReinitialize
                >
                    {({ values, errors, touched }) => (
                        <div className="FormContainer">
                            <Form className="d-flex flex-column gap-3 editForm">
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="name"><FormattedMessage id="courseName" />:</h5>
                                    <Field id="name" name="name" placeholder="Course Name" />
                                    <span className="error">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="level"><FormattedMessage id="courseLevel" />:</h5>
                                    <Field as="select" name="level">
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediat">Intermediat</option>
                                        <option value="Hard">Hard</option>
                                    </Field>
                                    <span className="error">
                                        <ErrorMessage name="level" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="price"><FormattedMessage id="coursePrice" />:</h5>
                                    <Field id="price" name="price" placeholder="course price" />
                                    <span className="error">
                                        <ErrorMessage name="price" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="lessons"><FormattedMessage id="lessons" /></h5>
                                    <Field id="lessons" name="lessons" type="number" placeholder="course lessons" />
                                    {errors.lessons && touched.lessons ? <div>{errors.lessons}</div> : null}
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="Duration"><FormattedMessage id="duration" /></h5>
                                    <Field id="duration" name="Duration" placeholder="course duration" />
                                    {errors.Duration && touched.Duration ? <div>{errors.Duration}</div> : null}
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="instructor"><FormattedMessage id="instructor" /></h5>
                                    <Field id="instructor" name="Instructor" placeholder="course instructor" />
                                    {errors.Instructor && touched.Instructor ? <div>{errors.Instructor}</div> : null}
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="language"><FormattedMessage id="language" /></h5>
                                    <Field id="language" name="Language" placeholder="course language" />
                                    {errors.Language && touched.Language ? <div>{errors.Language}</div> : null}
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="certification"><FormattedMessage id="Certification" /></h5>
                                    <Field id="certification" name="Certification" placeholder="certification" />
                                    {errors.Certification && touched.Certification ? <div>{errors.Certification}</div> : null}
                                </div>
                                <FieldArray name="courseContent">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.courseContent.length > 0 &&
                                                values.courseContent.map((content, index) => (
                                                    <div key={index}>
                                                        <h3 className="mt-2"><FormattedMessage id="Category" /> {index + 1}:</h3>
                                                        <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1 mt-4">
                                                            <h5 htmlFor={`courseContent.${index}.category`}><FormattedMessage id="Category" /></h5>
                                                            <Field
                                                                name={`courseContent.${index}.category`}
                                                                placeholder="Category Name"
                                                            />
                                                            {errors.courseContent?.[index]?.category &&
                                                                touched.courseContent?.[index]?.category ? (
                                                                <div>{errors.courseContent[index].category}</div>
                                                            ) : null}
                                                        </div>
                                                        <button
                                                            className="mt-3 btn btn-danger"
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <FormattedMessage id="removeCat" />                                                        </button>
                                                        <FieldArray name={`courseContent.${index}.lessons`}>
                                                            {({ insert, remove: removeLesson, push: pushLesson }) => (
                                                                <div className="d-flex flex-column gap-3">
                                                                    {content.lessons.length > 0 &&
                                                                        content.lessons.map((lesson, lessonIndex) => (
                                                                            <div key={lessonIndex} className="d-flex flex-column gap-3">
                                                                                <h3 className="mt-4"><FormattedMessage id="lesson" /> {lessonIndex + 1}:</h3>
                                                                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1 mt-2">
                                                                                    <h5 htmlFor={`courseContent.${index}.lessons.${lessonIndex}.LessonName`}>
                                                                                        <FormattedMessage id="lessonName" />                                                                                    </h5>
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
                                                                                    <h5 htmlFor={`courseContent.${index}.lessons.${lessonIndex}.desc`}>
                                                                                        <FormattedMessage id="descLesson" />
                                                                                    </h5>
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
                                                                                    <h5 htmlFor={`courseContent.${index}.lessons.${lessonIndex}.Link`}>
                                                                                        <FormattedMessage id="lessonLink" />:                                                                                    </h5>
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
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeLesson(lessonIndex)

                                                                                    }
                                                                                    className=" btn btn-danger"
                                                                                >
                                                                                    <FormattedMessage id="removLesson" />                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    <button
                                                                        className="btn btn-success"
                                                                        type="button"
                                                                        onClick={() => pushLesson({ LessonName: "", desc: "", Link: "" })}
                                                                    >
                                                                        <FormattedMessage id="addLesson" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </FieldArray>
                                                    </div>
                                                ))}
                                            <button
                                                className="btn btn-primary mt-3"
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        category: "",
                                                        lessons: [{ LessonName: "", desc: "", Link: "" }],
                                                    })
                                                }
                                            >
                                                <FormattedMessage id="addCat" />
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>

                                <button type="submit" className="btn btn-success"><FormattedMessage id="submit" /></button>
                            </Form>
                        </div>
                    )}
                </Formik>
            ) : (
                ""
            )}
        </CustomModal>
    );
}

