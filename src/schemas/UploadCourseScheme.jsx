import * as yup from "yup";

export const UploadCourseScheme = yup.object().shape({
    obj: yup.string()
        .required('Course objectives is required')
        .matches(/^[^,]+(,[^,]+)*$/, 'Input must be comma-separated values'),
    name: yup.string()
        .required('Course name is required'),
    level: yup.string()
        .required('Course Levels is required'),
    category: yup.string()
        .required('Course Category is required'),
    lessons: yup.number()
        .required('Please enter course lessons number'),
    price: yup.number()
        .required('Please enter course Price '),
    Duration: yup.number()
        .required('Please enter course duration'),
    Instructor: yup.string()
        .required('Choose instrucor name'),
    Language: yup.string()
        .required('Choose course language'),
    comVideo: yup.string()
        .required('Course Promotional video is required'),
    img: yup.string()
        .required('Course Promotional image is requried '),
    desc: yup.string()
        .required('Course description is required'),
    Certification: yup.string()
        .required('This is required'),
    courseContent: yup.array().of(
        yup.object().shape({
            category: yup.string().required('Category name is required'),
            lessons: yup.array().of(
                yup.object().shape({
                    LessonName: yup.string().required('Lesson name is required'),
                    desc: yup.string().required('Lesson description is required'),
                    Link: yup.string().required('Lesson video is required'),
                })
            ),
        })
    ),
});
