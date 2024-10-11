import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
    name: yup.string().required(<FormattedMessage id="required" />),
    email: yup.string().required(<FormattedMessage id="required" />).email(<FormattedMessage id="typeEmail" />),
    password: yup.string().required(<FormattedMessage id="required" />),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(<FormattedMessage id="required" />),
})