import { ErrorMessage, Field, Form, Formik } from "formik";
import "./Checkout.scss";
import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { $UserInfo, $checkoutPay } from "../../Store/Store";
import { showSuccessAlert } from "../../Components/ShowSuccessAlert";
import { paymenScheme } from "../../schemas/PaymentScheme";
import { useNavigate } from "react-router-dom";
import ErrorValidation from "../../Components/ErrorValidation/ErrorValidation";
import axios from "axios";

export default function Checkout() {
    const [checkoutPay] = useRecoilState($checkoutPay);
    const [userInfo, setUserInfo] = useRecoilState($UserInfo);
    const navigate = useNavigate();

    console.log(userInfo);

    const handlePaymentSuccess = (values) => {
        showSuccessAlert();

        // Deep clone the userInfo object to ensure all nested properties are mutable
        const updatedUser = { ...userInfo };

        // Ensure validCoursesId is an array
        if (!updatedUser.validCoursesId) {
            console.log("first")
            updatedUser.validCoursesId = [];
        }

        updatedUser.validCoursesId = [...updatedUser.validCoursesId, Number(checkoutPay.id)];
        console.log(updatedUser.validCoursesId)

        updatedUser.subscribed = 2;
        console.log(updatedUser)
        // Update the user information on the server
        axios.put(`http://localhost:3000/Users/${userInfo.id}`, updatedUser)
            .then(response => {
                console.log(response)
                setUserInfo(response.data);
                sessionStorage.setItem("user", JSON.stringify(response.data))
                setTimeout(() => {
                    navigate(checkoutPay?.id ? `/single-course/${checkoutPay?.id}` : `/courses`);
                }, 1500);
            })
            .catch(error => {
                console.error("Error updating user info:", error);
            });
    };

    return (
        <div id="Checkout" className="d-flex flex-column align-items-center justify-content-center gap-5">
            <h2>Payment Information</h2>
            <Formik
                initialValues={{ cardNumber: "", HolderName: "", date: "", cvv: "" }}
                onSubmit={handlePaymentSuccess}
                validationSchema={paymenScheme}>
                <Form className="d-flex flex-column col-12 col-md-8 col-lg-5 gap-3 align-items-center">
                    <Field type="number" required="required" name="cardNumber" placeholder="Card Number" className="col-11" />
                    <ErrorValidation name={"cardNumber"} />
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
                    <Button type="submit">PAY {checkoutPay?.price} EGP</Button>
                </Form>
            </Formik>
        </div>
    );
}
