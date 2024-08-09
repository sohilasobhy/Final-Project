import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})