import * as yup from "yup";

export const UploadCourseScheme = yup.object().shape({
    obj: yup.string()
        .required('Course objectives is required')
        .matches(/^[^,]+(,[^,]+)*$/, 'Input must be comma-separated values'),
    name: yup.string()
        .required('Course name is required'),
    Levels: yup.string()
        .required('Course Levels is required'),
    category: yup.string()
        .required('Course Category is required'),
    lesson: yup.number()
        .required('Please enter course lessons number'),
    price: yup.number()
        .required('Please enter course Price '),
    duration: yup.number()
        .required('Please enter course duration'),
    Instructors: yup.string()
        .required('Choose instrucor name'),
    Language: yup.string()
        .required('Choose course language'),
    video: yup.string()
        .required('Course Promotional video is required'),
    img: yup.string()
        .required('Course Promotional image is requried '),
    description: yup.string()
        .required('Course description is required'),
    Certification: yup.string()
        .required('This is required'),
    courseContent: yup.string()
        .required('Upload Course Content')
})