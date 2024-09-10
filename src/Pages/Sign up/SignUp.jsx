import { Link, useNavigate } from "react-router-dom"
import "./SignUp.scss"
import signUp from "../../assets/images/Graduation-rafiki.png"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { SignUpSchema } from "../../schemas/SignUpSchema"
import axios from "axios"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react"
import NavBarLogin from "../../Components/NavBarLogin"
export default function SignUp() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [showCon, setShowCon] = useState(false)
    const initialValues = {
        name: "",
        email: "",
        img: "",
        password: "",
        subscribed: "no",
        favouriteCoursesId: [],
        validCoursesId: [],
        role: "user",
        completedCourses: [],
    }
    let url = "http://localhost:3000/Users"
    const handleSignUp = (values) => {
        console.log(values)
        if (values.img) {
            let image = values.img.split("\\")[2]
            values.img = `src/assets/images/${image}`
        }
        axios
            .get(`http://localhost:3000/Users?email=${values.email}`)
            .then((response) => {
                console.log(response.data)
                if (response.data?.length == 0) {
                    axios.post(url, values)
                        .then(response => {
                            console.log(response.data.email)
                            navigate("/login")
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } else {
                    console.log("This email already exists")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <NavBarLogin />
            <div>
                <div className="col-12" id="SignUp">
                    <div className="backgroundFilter"></div>
                    <div className="imgCon">
                        <img src={signUp} className="col-12" />
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSignUp}
                        validationSchema={SignUpSchema}
                    >
                        <Form>
                            <h2>Sign Up</h2>
                            <div className="d-flex flex-column mt-2 imageInput">
                                <span>Upload your image</span>
                                <Field name="img" type="file" className="mt-2" accept="image/*" />
                            </div>
                            <div className="inputBox userName mt-4">
                                <Field name="name" type="text" required="required" className="mt-1" />
                                <span>Username</span>
                                <i></i>
                            </div>
                            <span className="error">
                                <ErrorMessage name="name" />
                            </span>
                            <div className="inputBox">
                                <Field name="email" required="required" type="text" className="mt-1" />
                                <span>Email</span>
                                <i></i>
                            </div>
                            <span className="error">
                                <ErrorMessage name="email" />
                            </span>
                            <div className="inputBox">
                                <Field type={showCon ? `text` : `password`} required="required" name="password" className="mt-1" />
                                <IoMdEyeOff className={`position-absolute show ${showCon ? "d-none" : ""}`} onClick={() => setShowCon(true)} />
                                <IoMdEye className={`position-absolute show ${showCon == false ? "d-none" : ""}`} onClick={() => setShowCon(false)} />
                                <span>Password</span>
                                <i></i>
                            </div>
                            <span className="error">
                                <ErrorMessage name="password" />
                            </span>
                            <div className="inputBox">
                                <Field name="confirmPassword" type={show ? `text` : `password`} required="required" className="mt-1" />
                                <IoMdEyeOff className={`position-absolute show ${show ? "d-none" : ""}`} onClick={() => setShow(true)} />
                                <IoMdEye className={`position-absolute show ${show == false ? "d-none" : ""}`} onClick={() => setShow(false)} />
                                <span>Re-Enter password</span>
                                <i></i>
                            </div>
                            <span className="error">
                                <ErrorMessage name="confirmPassword" />
                            </span>
                            <div className="links">
                                <Link to={"/login"} className="signup">Login</Link>
                            </div>
                            <input type="submit" className="submitBTN" />
                        </Form>
                    </Formik>


                </div >
            </div >
        </>
    )
}
