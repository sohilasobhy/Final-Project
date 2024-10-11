import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const ContactScheme = yup.object().shape({
    name: yup.string()
        .required(<FormattedMessage id="required" />),
    email: yup.string().email(<FormattedMessage id="typeEmail" />)
        .required(<FormattedMessage id="required" />),
    subject: yup.string()
        .required(<FormattedMessage id="required" />),
    message: yup.string()
        .required(<FormattedMessage id="required" />),
});
