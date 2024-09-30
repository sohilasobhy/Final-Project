import * as Yup from "yup";

export const EditCategoryScheme = Yup.object().shape({
    categoryName: Yup.string().required("category name is required"),
    categoryImg: Yup.string().required("category image 1 is required"),
    categoryImg2: Yup.string().required("category image 2 is required"),
})