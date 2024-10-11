import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const ReviewScheme = yup.object().shape({
    comment: yup.string()
        .required(<FormattedMessage id="required" />),
});
