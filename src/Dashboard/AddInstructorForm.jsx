import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddInstructor, $AllInstructors } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddInstructorScheme } from "../schemas/AddInstructorScheme";
import Swal from "sweetalert2";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";

export default function wszAddInstructorForm() {
    const [addForm, setAddForm] = useRecoilState($AddInstructor);
    const [allInstructors, setAllInstructors] = useRecoilState($AllInstructors);
    let intl = useIntl();
    const url = "http://localhost:3000/Instructors"
    const handleSubmit = (values) => {
        let image = values.img.split("\\")[2]
        values.img = `src/assets/images/${image}`
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
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setAllInstructors([...allInstructors, res.data])
                        setAddForm(false)
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
    };

    const initialValues = {
        name: "",
        job: "",
        img: "",
        students: "",
        rating: "",
        About: "",
        coursesID: [],
        Contact: {
            address: "",
            Email: "",
            phone: "",
            facebook: "",
            twitter: "",
            linkedIn: ""
        }
    };

    if (addForm) {
        return (
            <CustomModal show={addForm} onHide={() => setAddForm(false)} title={<FormattedMessage id="addInstructor" />}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={AddInstructorScheme}
                >
                    {({ values, errors }) => (
                        <div className="FormContainer">
                            <Form className="d-flex flex-column gap-3">
                                <div className="d-flex flex-column gap-1" >
                                    <h6><FormattedMessage id="instName" /></h6>
                                    <Field type="text" name="name" />
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="jobTitle" /></h6>
                                    <Field type="text" name="job" />
                                    <ErrorMessage name="job" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="instImg" /></h6>
                                    <Field type="file" name="img" />
                                    <ErrorMessage name="img" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="aboutInst" /></h6>
                                    <Field as="textarea" name="About" />
                                    <ErrorMessage name="About" component="div" className="error" />
                                </div>
                                <h5><FormattedMessage id="conInfo" /></h5>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="Address" /></h6>
                                    <Field type="text" name="Contact.address" />
                                    <ErrorMessage name="Contact.address" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="Email" /></h6>
                                    <Field type="text" name="Contact.Email" />
                                    <ErrorMessage name="Contact.Email" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="phone" /></h6>
                                    <Field type="text" name="Contact.phone" />
                                    <ErrorMessage name="Contact.phone" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="facebook" /></h6>
                                    <Field type="text" name="Contact.facebook" />
                                    <ErrorMessage name="Contact.facebook" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="twitter" /></h6>
                                    <Field type="text" name="Contact.twitter" />
                                    <ErrorMessage name="Contact.twitter" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6><FormattedMessage id="linkedIn" /></h6>
                                    <Field type="text" name="Contact.linkedIn" />
                                    <ErrorMessage name="Contact.linkedIn" component="div" className="error" />
                                </div>

                                <button type="submit" className="btn btn-success"><FormattedMessage id="add" /></button>
                                {console.log(errors)}
                            </Form>
                        </div>
                    )}
                </Formik>
            </CustomModal>
        );
    }
}
