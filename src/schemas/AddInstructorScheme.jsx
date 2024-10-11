import { FormattedMessage } from "react-intl";
import * as yup from "yup";
export const AddInstructorScheme = () => {
    return yup.object().shape({
        name: yup.string()
            .required(<FormattedMessage id="required" />),
        job: yup.string()
            .required(<FormattedMessage id="required" />),
        img: yup.string()
            .required(<FormattedMessage id="required" />),
        About: yup.string()
            .required(<FormattedMessage id="required" />),
        Contact: yup.object().shape({
            address: yup.string()
                .required(<FormattedMessage id="required" />),
            Email: yup.string().email(<FormattedMessage id="typeEmail" />)
                .required(<FormattedMessage id="required" />),
            phone: yup.string()
                .matches(/^[0-9]+$/, "Invalid phone number")
                .required(<FormattedMessage id="required" />),
            facebook: yup.string()
                .url(<FormattedMessage id="typeUrl" />)
                .required(<FormattedMessage id="required" />),
            twitter: yup.string()
                .url(<FormattedMessage id="typeUrl" />)
                .required(<FormattedMessage id="required" />),
            linkedIn: yup.string()
                .url(<FormattedMessage id="typeUrl" />)
                .required(<FormattedMessage id="required" />)
        })
    });
};