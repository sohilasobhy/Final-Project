import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const phoneSchema = yup.object().shape({
    phone: yup.number().typeError(<FormattedMessage id="typeNumber" />).required(<FormattedMessage id="required" />),
})