import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email: yup.string().required(<FormattedMessage id="required" />).email().typeError(<FormattedMessage id="typeEmail" />),
    password: yup.string().required(<FormattedMessage id="required" />)
})