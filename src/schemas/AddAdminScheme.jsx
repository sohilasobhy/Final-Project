import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const AddAdminScheme = yup.object().shape({
    name: yup.string().required(<FormattedMessage id="required" />),
    email: yup.string().required(<FormattedMessage id="required" />).email().typeError(<FormattedMessage id="typeEmail" />),
    password: yup.string().required(<FormattedMessage id="required" />),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], <FormattedMessage id="passwordMatch" />)
        .required(<FormattedMessage id="required" />),
}) 