import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddAdmin, $allUsers } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddAdminScheme } from "../schemas/AddAdminScheme";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Swal from "sweetalert2";

export default function AddAdmin() {
    const [openModal, setOpen] = useRecoilState($AddAdmin)
    const [allUsers, setAllUsers] = useRecoilState($allUsers)
    const [message, setMessage] = useState(false)
    let intl = useIntl()
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
                axios
                    .get(`http://localhost:3000/Users?email=${values.email}`)
                    .then((response) => {
                        if (response.data?.length == 0) {
                            axios.post(url, values)
                                .then((response) => {
                                    Swal.fire({
                                        title: intl.formatMessage({ id: 'confirm' }),
                                        text: intl.formatMessage({ id: 'courseDone' }),
                                        confirmButtonText: intl.formatMessage({ id: 'confirm' }),
                                        icon: "success"
                                    });
                                    let updatedUsesr = [...allUsers, response.data]
                                    setAllUsers(updatedUsesr)
                                    setOpen(false)
                                })
                                .catch(error => {
                                    Swal.fire({
                                        title: intl.formatMessage({ id: 'error' }),
                                        text: intl.formatMessage({ id: 'proplem' }),
                                        icon: "error"
                                    });
                                });
                        } else {
                            setMessage(true)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        });

    }
    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title={<FormattedMessage id="addAdmin" />}>
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
                                    <p><FormattedMessage id="adminName" />:</p>
                                    <Field name="name" />
                                    <span className="error">
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p><FormattedMessage id="adminEmail" />:</p>
                                    <Field name="email" />
                                    <span className="error">
                                        <ErrorMessage name="email" />
                                    </span>
                                    <span className={`error ${message ? `d-block` : `d-none`}`}>
                                        <FormattedMessage id="emailExists" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p><FormattedMessage id="adminImg" />:</p>
                                    <input type="file" name="img" onChange={(e) => setFieldValue("img", e.target.files[0].name)} />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p><FormattedMessage id="password" /></p>
                                    <Field name="password" />
                                    <span className="error">
                                        <ErrorMessage name="password" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <p><FormattedMessage id="conPass" />:</p>
                                    <Field name="confirmPassword" />
                                    <span className="error">
                                        <ErrorMessage name="confirmPassword" />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-success" ><FormattedMessage id="submit" /></button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </CustomModal>
    )
}
