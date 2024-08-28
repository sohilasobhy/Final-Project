import * as yup from "yup";

export const ContactScheme = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string().email("Invalid email format")
        .required("Email is required"),
    subject: yup.string()
        .required("Subject is required"),
    message: yup.string()
        .required("Message is required"),
});
