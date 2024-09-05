import * as yup from "yup";

export const AddCategoryScheme = yup.object().shape({
    categoryName: yup.string()
        .required("category name is required"),
    categoryImg: yup.string()
        .required("Image is required"),
    categoryImg2: yup.string()
        .required("Image is required"),

});
