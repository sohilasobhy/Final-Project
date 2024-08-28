import { ErrorMessage } from "formik";

export default function ErrorValidation({ name }) {
    return (
        <div className="text-danger ">
            <ErrorMessage name={name} />
        </div>
    )
}
