import * as yup from "yup";

export const paymenScheme = yup.object().shape({
    cardNumber: yup.number()
        .required()
        .typeError('Please enter card number'),
    HolderName: yup.string()
        .typeError('Please enter card holder name')
        .required(),
    cvv: yup.number()
        .required(),
    date: yup.number()
        .required(),
})