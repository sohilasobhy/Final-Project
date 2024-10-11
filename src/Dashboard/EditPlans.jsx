import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $EditSubPlans, $EditedPlan, $allPlans } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { AddPlanScheme } from "../schemas/AddPlanScheme";
import { FormattedMessage, useIntl } from "react-intl";
export default function EditPlans() {
    const [Edit, setEdit] = useRecoilState($EditSubPlans)
    const [allPlans, setPlans] = useRecoilState($allPlans)
    const [PlanId] = useRecoilState($EditedPlan)
    let intl = useIntl()
    const plan = allPlans.find((e) => {
        return (
            e.id == PlanId
        )
    })
    const initialValues = {
        duration: plan?.duration,
        charge: plan?.charge,
        price: plan?.price
    }
    const handleSubmit = (values) => {
        Swal.fire({
            title: intl.formatMessage({ id: "areYouSure" }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`http://localhost:3000/SubPlans/${Number(PlanId)}`, values)
                    .then((res) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "courseDone" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        console.log(res.data)
                        setEdit(false)
                        const editedPlans = [...allPlans]
                        editedPlans.splice(
                            editedPlans.findIndex((e) => e.id == res.data.id),
                            1,
                            {
                                id: res.data.id,
                                duration: res.data.duration,
                                price: res.data.price,
                                charge: res.data.charge
                            }
                        )
                        setPlans(editedPlans)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
            }
        });
    }
    let url = "http://localhost:3000/SubPlans"
    return (
        <CustomModal show={Edit} onHide={() => setEdit(false)} title={<FormattedMessage id="editSubPlan" />}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={AddPlanScheme}
            >
                <div className="FormContainer">
                    <Form>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planDuration" /></h5>
                                <Field type="text" name="duration" placeholder="Enter Plan Duration" />
                                <span className="error">
                                    <ErrorMessage name="duration" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planPrice" /></h5>
                                <Field type="text" name="price" placeholder="Enter Plan price" />
                                <span className="error">
                                    <ErrorMessage name="price" />
                                </span>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                <h5><FormattedMessage id="planCharge" /></h5>
                                <Field type="text" name="charge" placeholder="Enter Plan Charge" />
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
