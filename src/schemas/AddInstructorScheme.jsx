import * as yup from "yup";

export const AddInstructorScheme = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    job: yup.string()
        .required("Job is required"),
    img: yup.string()
        .required("Image is required"),
    About: yup.string()
        .required("About is required"),
    Contact: yup.object().shape({
        address: yup.string()
            .required("Address is required"),
        Email: yup.string().email("Invalid email format")
            .required("Email is required"),
        phone: yup.string()
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .required("Phone is required"),
        facebook: yup.string()
            .url("Enter a valid Facebook URL")
            .required("Facebook is required"),
        twitter: yup.string()
            .url("Enter a valid Twitter URL")
            .required("Twitter is required"),
        linkedIn: yup.string()
            .url("Enter a valid LinkedIn URL")
            .required("LinkedIn is required")
    })
});
