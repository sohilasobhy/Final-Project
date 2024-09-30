import * as yup from "yup";

export const AddPlanScheme = yup.object().shape({
    duration: yup.string()
        .required("duration is required"),
    price: yup.number().typeError("enter valid price")
        .required("price is required"),
    charge: yup.string()
        .required("chrge is required"),
});
