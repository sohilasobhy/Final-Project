import * as yup from "yup";

export const paymenScheme = yup.object().shape({
    cardNumber: yup.number().test('len', 'please enter valid card number', val => val.toString().length === 16)
        .required()
        .typeError('Please enter card number'),
    HolderName: yup.string()
        .typeError('Please enter card holder name')
        .required(),
    cvv: yup.number()
        .required()
        .test('len', 'please enter valid card cvv', val => val.toString().length === 3),
    date: yup.number().test('len', 'please enter valid card date', val => val.toString().length === 4)
        .required(),
})