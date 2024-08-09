import * as yup from "yup";

export const phoneSchema = yup.object().shape({
    phone: yup.number().typeError('Please enter your phone number').required(),
})