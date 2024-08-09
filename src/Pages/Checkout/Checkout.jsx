import { ErrorMessage, Field, Form, Formik } from "formik";
import "./Checkout.scss"
import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { $subPlans } from "../../Store/Store";
import { showSuccessAlert } from "../../Components/ShowSuccessAlert";
import { paymenScheme } from "../../schemas/PaymentScheme";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
    const [subPlan] = useRecoilState($subPlans);
    const navigate = useNavigate()
    return (
        <div id="Checkout" className="d-flex flex-column align-items-center justify-content-center gap-5">
            <h2>Payment Information</h2>
            <Formik
                initialValues={{ cardNumber: "", HolderName: "", date: "", cvv: "" }}
                onSubmit={(values) => {
                    showSuccessAlert()
                    console.log(values)
                    setTimeout(() => { navigate("/courses") }, "1000")
                }}
                validationSchema={paymenScheme}>
                <Form className="d-flex flex-column col-12 col-md-8 col-lg-5 gap-3 align-items-center">
                    <Field type="" required="required" name="cardNumber" placeholder="Card Number" className="col-11" />
                    <span className="error">
                        <ErrorMessage name="cardNumber" />
                    </span>
                    <Field type="text" required="required" name="HolderName" placeholder="Card Holder Name" className="col-11" />
                    <span className="error">
                        <ErrorMessage name="HolderName" />
                    </span>
                    <div className="d-flex gap-2 col-12 justify-content-center">
                        <Field type="number" required="required" name="date" placeholder="MM/YY" className="col-5" />
                        <Field type="number" required="required" name="cvv" placeholder="CVV" className="col-5" />
                    </div>
                    <span className="error">
                        <ErrorMessage name="date" />
                    </span>
                    <span className="error">
                        <ErrorMessage name="cvv" />
                    </span>
                    <Button type="submit">PAY {subPlan?.price} EGP</Button>
                </Form>
            </Formik>
        </div>
    )
}
