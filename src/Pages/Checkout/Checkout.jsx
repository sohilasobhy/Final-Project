import { ErrorMessage, Field, Form, Formik } from "formik";
import "./Checkout.scss";
import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { $UserInfo, $checkoutPay } from "../../Store/Store";
import { showSuccessAlert } from "../../Components/ShowSuccessAlert";
import { paymenScheme } from "../../schemas/PaymentScheme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import payment from "../../assets/images/63Z_2112.w012.n001.19C.p6.19.jpg"
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Checkout() {
    const [checkoutPay] = useRecoilState($checkoutPay);
    console.log(checkoutPay)
    const [userInfo, setUserInfo] = useRecoilState($UserInfo);
    const navigate = useNavigate();
    console.log(userInfo);

    const handlePaymentSuccess = (values) => {
        showSuccessAlert();
        const updatedUser = { ...userInfo };
        if (!updatedUser.validCoursesId) {
            updatedUser.validCoursesId = [];
        }
        updatedUser.validCoursesId = [...updatedUser.validCoursesId, Number(checkoutPay.id)];
        console.log(updatedUser.validCoursesId)
        updatedUser.subscribed = 2;
        console.log(updatedUser)
        axios.put(`http://localhost:3000/Users/${userInfo.id}`, updatedUser)
            .then(response => {
                console.log(response)
                setUserInfo(response.data);
                if (JSON.parse(localStorage.getItem("user")) != null) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                } else if (JSON.parse(sessionStorage.getItem("user")) != null) {
                    sessionStorage.setItem("user", JSON.stringify(response.data))
                }
                setTimeout(() => {
                    navigate(checkoutPay?.id ? `/single-course/${checkoutPay?.id}` : `/courses`);
                }, 1500);
                let newStudents = Number(checkoutPay?.students) + 1
                axios.put(`http://localhost:3000/Courses/${checkoutPay?.id}`, { ...checkoutPay, students: newStudents })
            })
            .catch(error => {
                console.error("Error updating user info:", error);
            });
    };
    if (userInfo) {
        return (
            <div id="Checkout" className="p-2 p-md-5 d-flex justify-content-center align-items-center">
                <div className="d-flex col-md-10 m-auto formCon">
                    <div className="bg-white col-12 col-md-6 p-3 d-flex flex-column align-items-center justify-content-center gap-1 courseInfo h-100">
                        <h4 className="text-center">Course Information</h4>
                        <p className=" text-center">Course Name: <br /> <span>{checkoutPay.name}</span> </p>
                        <p className="   text-center ">Course Price: <br /> <span>{checkoutPay.price}</span> </p>
                        <Formik
                            initialValues={{ cardNumber: "", HolderName: "", date: "", cvv: "" }}
                            onSubmit={handlePaymentSuccess}
                            validationSchema={paymenScheme}>
                            <Form className="d-flex flex-column align-items-start col-12 gap-3">
                                <div className={`${checkoutPay?.price == "Free" ? "d-none" : "d-flex"} flex-column align-items-center col-12 gap-1`}>
                                    <h4>Payment Information</h4>
                                    <div className="d-flex flex-column gap-2 col-12">
                                        <p className=" align-self-start">Enter card number:</p>
                                        <Field type="number" required="required" name="cardNumber" placeholder="Card Number" className="col-12" />
                                        <span className="error">
                                            <ErrorMessage name={"cardNumber"} />
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column gap-2 col-12">
                                        <p className=" align-self-start">Enter card holder name:</p>
                                        <Field type="text" required="required" name="HolderName" placeholder="Card Holder Name" className="col-12" />
                                        <span className="error">
                                            <ErrorMessage name="HolderName" />
                                        </span>
                                    </div>
                                    <div className="row g-2 col-12 justify-content-start col-11">
                                        <div className="col-6">
                                            <div>
                                                <p>Expiration date</p>
                                                <Field type="number" required="required" name="date" placeholder="MM/YY" className="col-12 " />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div>
                                                <p>Enter cvv</p>
                                                <Field type="number" required="required" name="cvv" placeholder="CVV" className="col-12" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="error">
                                        <ErrorMessage name="date" />
                                    </span>
                                    <span className="error">
                                        <ErrorMessage name="cvv" />
                                    </span>
                                    <Button type="submit" className="col-10">{`PAY ${checkoutPay?.price} EGP`} </Button>
                                </div>
                                <Button className={`${checkoutPay?.price == "Free" ? "d-block" : "d-none"} col-10`} onClick={() => handlePaymentSuccess()}>Enroll now for Free</Button>

                            </Form>
                        </Formik>
                        {/* </div> */}
                    </div>
                    <div className="bg-white d-none d-md-block imgCon">
                        <img src={payment} className="w-100 h-100 object-fit-cover " />
                    </div>
                </div>
            </div >
        );
    }
    else {
        toast.error("please login first")
        useEffect(() => {
            navigate("/")
        })
    }
}
