import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const AddCategoryScheme = yup.object().shape({
    categoryName: yup.string()
        .required(<FormattedMessage id="required" />),
    categoryImg: yup.string()
        .required(<FormattedMessage id="required" />),
    categoryImg2: yup.string()
        .required(<FormattedMessage id="required" />),

});
