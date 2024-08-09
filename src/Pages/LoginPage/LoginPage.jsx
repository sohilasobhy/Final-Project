import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.scss"
import loginphoto from "../../assets/images/3094352.jpg"
import { Field, Formik, Form, ErrorMessage } from "formik"
import { LoginSchema } from "../../schemas/LoginScheme"
import axios from "axios"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"
export default function LoginPage() {
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useRecoilState($UserInfo)
    return (
        <div className="col-12" id="LoginPage">
            <div className="backgroundFilter"></div>
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
                                navigate("/")
                            }
                        })
                        .catch((err) => { console.log(err) })
                }}
                validationSchema={LoginSchema}>
                <Form action="post">
                    <h2>Sign in</h2>
                    <div className="inputBox">
                        <Field type="text" required="required" name="email" />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <span className="error">
                        <ErrorMessage name="email" />
                    </span>
                    <div className="inputBox">
                        <Field type="password" required="required" name="password" />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <span className={`error  ${message ? `d-block` : `d-none`}`}>
                        Wrong email or password
                    </span>
                    <span className="error">
                        <ErrorMessage name="password" />
                    </span>
                    <div className="mt-4 wrongPass d-flex gap-1">
                        <Field type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </div>
                    <div className="links">
                        <Link to={"/forget-password"}>Forget password</Link>
                        <Link to={"/signup"} className="signup">Signup</Link>
                    </div>
                    <input type="submit" className="submitBTN" />
                </Form>
            </Formik>
            <div className="imgCon">
                <img src={loginphoto} className="col-12" />
            </div>
        </div>
    )
}
