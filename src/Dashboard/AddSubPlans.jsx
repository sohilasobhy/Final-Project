import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $addSubPlan, $allPlans } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddPlanScheme } from "../schemas/AddPlanScheme";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddSubPlans() {
    const [Open, setOpen] = useRecoilState($addSubPlan)
    const [allPlans, setAllPlans] = useRecoilState($allPlans)
    const initialValues = {
        duration: "",
        charge: "",
        price: ""
    }
    let url = "http://localhost:3000/SubPlans"
    const handleSubmit = (values) => {
        Swal.fire({
            title: "Are you sure you want to add this plan?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then(() => {
                        Swal.fire({
                            title: "Added!",
                            text: "Your plan has been added.",
                            icon: "success"
                        });
                        setAllPlans([...allPlans, values])
                        setOpen(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding this plan.",
                            icon: "error"
                        });
                    });
            }
        });
    }
    return (
        <CustomModal show={Open} onHide={() => setOpen(false)} title="Add New Plan" >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={AddPlanScheme}>
                <div className="FormContainer">
                    <Form>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex flex-column gap-2">
                                <h5>Plan Duration</h5>
                                <Field type="text" name="duration" placeholder="Enter Plan Duration" />
                                <span className="error">
                                    <ErrorMessage name="duration" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5>Plan price</h5>
                                <Field type="text" name="price" placeholder="Enter Plan price" />
                                <span className="error">
                                    <ErrorMessage name="price" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5>Plan Charge</h5>
                                <Field type="text" name="charge" placeholder="Enter Plan Charge" />
                                <span className="error">
                                    <ErrorMessage name="charge" />
                                </span>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </CustomModal>
    )
}
