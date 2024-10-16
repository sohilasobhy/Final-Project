import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.scss"
import loginphoto from "../../assets/images/3094352.jpg"
import { Field, Formik, Form, ErrorMessage } from "formik"
import { LoginSchema } from "../../schemas/LoginScheme"
import axios from "axios"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { $Language, $UserInfo, $loginCourseID } from "../../Store/Store"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import NavBarLogin from "../../Components/NavBarLogin"
import { toast } from "react-toastify"
import { FormattedMessage } from "react-intl"
export default function LoginPage() {
    const [lang] = useRecoilState($Language)
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()
    const [, setUserInfo] = useRecoilState($UserInfo)
    const [show, setShow] = useState(false)
    const [courseId] = useRecoilState($loginCourseID)
    console.log(courseId)
    return (
        <>
            <NavBarLogin />
            <div className="col-12 d-flex flex-column" id="LoginPage">
                <div className="d-flex justify-content-center align-items-center formContainer">
                    <Formik
                        initialValues={{ email: "", password: "", remember: "" }}
                        onSubmit={(values) => {
                            axios
                                .get(`http://localhost:3000/Users?email=${values.email}&password=${values.password}`)
                                .then((response) => {
                                    console.log(response.data)
                                    if (response.data?.length == 0) {
                                        setMessage(true)
                                    } else {
                                        setMessage(false)
                                        if (values.remember) {
                                            localStorage.setItem(`user`, JSON.stringify(response.data[0]))
                                            setUserInfo(response.data[0])
                                        } else {
                                            sessionStorage.setItem(`user`, JSON.stringify(response.data[0]))
                                            setUserInfo(response.data[0])
                                        }
                                        toast.success(<FormattedMessage id="loggedIn" />)
                                    }
                                })
                                .catch((err) => { console.log(err) })
                        }}
                        validationSchema={LoginSchema}>
                        <Form action="post">
                            <h2><FormattedMessage id="signIN" /></h2>
                            <div className="inputBox">
                                <Field type="text" required="required" name="email" className="mt-1" />
                                <span><FormattedMessage id="Email" /></span>
                                <i></i>
                            </div>
                            <span className="error">
                                <ErrorMessage name="email" />
                            </span>
                            <div className="inputBox">
                                <Field type={show ? `text` : `password`} required="required" name="password" className="mt-1" />
                                <span><FormattedMessage id="password" /></span>
                                <i></i>
                                <IoMdEyeOff className={`position-absolute show ${show ? "d-none" : ""}`} onClick={() => setShow(true)} />
                                <IoMdEye className={`position-absolute show ${show == false ? "d-none" : ""}`} onClick={() => setShow(false)} />
                            </div>
                            <span className={`error  ${message ? `d-block` : `d-none`}`}>
                                {lang == "EN" ? "Wrong email or password" : "خطأ في البريد الاكتروني او كلمة السر"}
                            </span>
                            <span className="error">
                                <ErrorMessage name="password" />
                            </span>
                            <div className="mt-4 wrongPass d-flex gap-1">
                                <Field type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember"><FormattedMessage id="rememberMe" /></label>
                            </div>
                            <div className="links">
                                <Link to={"/signup"} className="signup"><FormattedMessage id="Signup" /></Link>
                            </div>
                            <button type="submit" className="submitBTN"><FormattedMessage id="submit" /> </button>
                        </Form>
                    </Formik>
                    <div className="imgCon">
                        <img src={loginphoto} />
                    </div>
                </div>
            </div>
        </>
    )
}
