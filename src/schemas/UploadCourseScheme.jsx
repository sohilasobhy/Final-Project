import { FormattedMessage } from "react-intl";
import * as yup from "yup";

export const UploadCourseScheme = yup.object().shape({
    obj: yup.string()
        .required(<FormattedMessage id="required" />)
        .matches(/^[^,]+(,[^,]+)*$/, 'Input must be comma-separated values'),
    name: yup.string()
        .required(<FormattedMessage id="required" />),
    level: yup.string()
        .required(<FormattedMessage id="required" />),
    category: yup.string()
        .required(<FormattedMessage id="required" />),
    lessons: yup.number()
        .required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
    price: yup.number()
        .required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
    Duration: yup.number()
        .required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
    Instructor: yup.string()
        .required(<FormattedMessage id="required" />),
    Language: yup.string()
        .required(<FormattedMessage id="required" />),
    comVideo: yup.string()
        .required(<FormattedMessage id="required" />),
    img: yup.string()
        .required(<FormattedMessage id="required" />),
    desc: yup.string()
        .required(<FormattedMessage id="required" />),
    Certification: yup.string()
        .required(<FormattedMessage id="required" />),
    courseContent: yup.array().of(
        yup.object().shape({
            category: yup.string().required(<FormattedMessage id="required" />),
            lessons: yup.array().of(
                yup.object().shape({
                    LessonName: yup.string().required(<FormattedMessage id="required" />),
                    desc: yup.string().required(<FormattedMessage id="required" />),
                    Link: yup.string().required(<FormattedMessage id="required" />),
                })
            ),
        })
    ),
});
