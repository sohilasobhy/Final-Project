import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const paymenScheme = yup.object().shape({
    cardNumber: yup.number().test('len', 'please enter valid card number', val => val.toString().length === 16)
        .required(<FormattedMessage id="required" />)
        .typeError(<FormattedMessage id="typeNumber" />),
    HolderName: yup.string()
        .required(<FormattedMessage id="required" />),
    cvv: yup.number()
        .required(<FormattedMessage id="required" />)
        .test('len', 'please enter valid card cvv', val => val.toString().length === 3),
    date: yup.number().test('len', 'please enter valid card date', val => val.toString().length === 4)
        .required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
})