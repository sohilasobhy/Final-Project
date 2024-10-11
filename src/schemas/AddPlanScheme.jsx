import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const AddPlanScheme = yup.object().shape({
    duration: yup.string()
        .required(<FormattedMessage id="required" />),
    price: yup.number().typeError(<FormattedMessage id="typeNumber" />)
        .required(<FormattedMessage id="required" />),
    charge: yup.string()
        .required(<FormattedMessage id="required" />),
});
