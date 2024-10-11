import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const EditCategoryScheme = Yup.object().shape({
    categoryName: Yup.string().required(<FormattedMessage id="required" />),
    categoryImg: Yup.string().required(<FormattedMessage id="required" />),
    categoryImg2: Yup.string().required(<FormattedMessage id="required" />),
})