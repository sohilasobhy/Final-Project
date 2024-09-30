import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddAdmin, $allUsers } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddAdminScheme } from "../schemas/AddAdminScheme";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function AddAdmin() {
    const [openModal, setOpen] = useRecoilState($AddAdmin)
    const [allUsers, setAllUsers] = useRecoilState($allUsers)
    const initialValues = {
        name: "",
        email: "",
        img: "",
        password: "",
        confirmPassword: "",
        role: "admin",
        subscribed: "no",
        favouriteCoursesId: [],
        validCoursesId: [],
        completedCourses: []
    }
    let url = "http://localhost:3000/Users"
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setAllUsers(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
        if (values.img) {
            values.img = `src/assets/images/${values.img}`
        }
        axios
            .get(`http://localhost:3000/Users?email=${values.email}`)
            .then((response) => {
                if (response.data?.length == 0) {
                    axios.post(url, values)
                        .then((response) => {
                            console.log(values)
                            console.log(allUsers)
                            let updatedUsesr = [...allUsers, values]
                            console.log(updatedUsesr)
                            setAllUsers(updatedUsesr)
                            toast.success("Admin added")
                            setOpen(false)
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } else {
                    toast.error("This email already exists")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title="Add Admin">
            <Formik
                initialValues={initialValues}
                validationSchema={AddAdminScheme}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => {
                    return (
                        <div className="FormContainer">
                            <Form className="p-3 d-flex flex-column gap-3" >
                                <div className="d-flex flex-column gap-2">
                                    <p>Admin Name:</p>
                                    <Field name="name" placeholder="Admin Name" />
                                    <span className="error">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p>Admin Email:</p>
                                    <Field name="email" placeholder="Admin Email" />
                                    <span className="error">
                                        <ErrorMessage name="email" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p>Admin Image:</p>
                                    <input type="file" name="img" onChange={(e) => setFieldValue("img", e.target.files[0].name)} />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p>Enter password:</p>
                                    <Field name="password" placeholder="Enter password" />
                                    <span className="error">
                                        <ErrorMessage name="password" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p>Confirm password:</p>
                                    <Field name="confirmPassword" placeholder="Confirm password" />
                                    <span className="error">
                                        <ErrorMessage name="confirmPassword" />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-success" >Add</button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </CustomModal>
    )
}
