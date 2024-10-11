import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $addSubPlan, $allPlans } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddPlanScheme } from "../schemas/AddPlanScheme";
import Swal from "sweetalert2";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";

export default function AddSubPlans() {
    const [Open, setOpen] = useRecoilState($addSubPlan)
    const [allPlans, setAllPlans] = useRecoilState($allPlans)
    let intl = useIntl()
    const initialValues = {
        duration: "",
        charge: "",
        price: ""
    }
    let url = "http://localhost:3000/SubPlans"
    const handleSubmit = (values) => {
        Swal.fire({
            title: intl.formatMessage({ id: 'courseAdding' }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'yesAdd' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then((res) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'confirm' }),
                            text: intl.formatMessage({ id: 'courseDone' }),
                            confirmButtonText: intl.formatMessage({ id: 'confirm' }),
                            icon: "success"
                        });
                        setAllPlans([...allPlans, res.data])
                        setOpen(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'error' }),
                            text: intl.formatMessage({ id: 'proplem' }),
                            icon: "error"
                        });
                    });
            }
        });
    }
    return (
        <CustomModal show={Open} onHide={() => setOpen(false)} title={<FormattedMessage id="addSubPlan" />} >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={AddPlanScheme}>
                <div className="FormContainer">
                    <Form>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planDuration" />:</h5>
                                <Field type="text" name="duration" />
                                <span className="error">
                                    <ErrorMessage name="duration" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planPrice" />:</h5>
                                <Field type="text" name="price" />
                                <span className="error">
                                    <ErrorMessage name="price" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planCharge" />:</h5>
                                <Field type="text" name="charge" />
                                <span className="error">
                                    <ErrorMessage name="charge" />
                                </span>
                            </div>
                            <button type="submit" className="btn btn-success"><FormattedMessage id="submit" /></button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </CustomModal>
    )
}
