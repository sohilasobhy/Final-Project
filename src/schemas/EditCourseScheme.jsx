import * as Yup from "yup";

export const EditCourseScheme = Yup.object().shape({
    name: Yup.string().required("Course name is required"),
    level: Yup.string().required("Level is required"),
    rating: Yup.number().min(0).max(5).required("Rating is required"),
    price: Yup.string().required("Price is required"),
    lessons: Yup.number().required("Lessons are required"),
    Duration: Yup.string().required("Duration is required"),
    Instructor: Yup.string().required("Instructor is required"),
    Language: Yup.string().required("Language is required"),
    Certification: Yup.string().required("Certification info is required"),
    courseContent: Yup.array().of(
        Yup.object().shape({
            category: Yup.string().required("Category is required"),
            lessons: Yup.array().of(
                Yup.object().shape({
                    LessonName: Yup.string().required("Lesson name is required"),
                    desc: Yup.string().required("Lesson description is required"),
                    Link: Yup.string().required("Video link is required"),
                })
            ),
        })
    ),
})