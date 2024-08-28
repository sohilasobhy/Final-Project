import * as yup from "yup";

export const ReviewScheme = yup.object().shape({
    comment: yup.string()
        .required("Please add Your review"),
});
