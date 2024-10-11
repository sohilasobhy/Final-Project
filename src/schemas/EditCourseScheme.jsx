import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

export const EditCourseScheme = Yup.object().shape({
    name: Yup.string().required(<FormattedMessage id="required" />),
    level: Yup.string().required(<FormattedMessage id="required" />),
    rating: Yup.number().min(0).max(5).required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
    price: Yup.string().required(<FormattedMessage id="required" />),
    lessons: Yup.number().required(<FormattedMessage id="required" />).typeError(<FormattedMessage id="typeNumber" />),
    Duration: Yup.string().required(<FormattedMessage id="required" />),
    Instructor: Yup.string().required(<FormattedMessage id="required" />),
    Language: Yup.string().required(<FormattedMessage id="required" />),
    Certification: Yup.string().required(<FormattedMessage id="required" />),
    courseContent: Yup.array().of(
        Yup.object().shape({
            category: Yup.string().required(<FormattedMessage id="required" />),
            lessons: Yup.array().of(
                Yup.object().shape({
                    LessonName: Yup.string().required(<FormattedMessage id="required" />),
                    desc: Yup.string().required(<FormattedMessage id="required" />),
                    Link: Yup.string().required(<FormattedMessage id="required" />),
                })
            ),
        })
    ),
})