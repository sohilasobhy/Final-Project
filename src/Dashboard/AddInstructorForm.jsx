import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddInstructor, $AllInstructors } from "../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddInstructorScheme } from "../schemas/AddInstructorScheme";
import Swal from "sweetalert2";
import axios from "axios";

export default function wszAddInstructorForm() {
    const [addForm, setAddForm] = useRecoilState($AddInstructor);
    const [allInstructors, setAllInstructors] = useRecoilState($AllInstructors);
    const url = "http://localhost:3000/Instructors"
    const handleSubmit = (values) => {
        let image = values.img.split("\\")[2]
        values.img = `src/assets/images/${image}`
        Swal.fire({
            title: "Are you sure you want to add this instructor?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then(() => {
                        Swal.fire({
                            title: "Added!",
                            text: "the instructor has been added.",
                            icon: "success"
                        });
                        setAllInstructors([...allInstructors, values])
                        setAddForm(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding the instructor.",
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
            <CustomModal show={addForm} onHide={() => setAddForm(false)} title="Add New Instructor">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={AddInstructorScheme}
                >
                    {({ values, errors }) => (
                        <div className="FormContainer">
                            <Form className="d-flex flex-column gap-3">
                                <div className="d-flex flex-column gap-1" >
                                    <h6>Instructor Name</h6>
                                    <Field type="text" name="name" placeholder="Enter Instructor Name" />
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Job Title</h6>
                                    <Field type="text" name="job" placeholder="Enter Job Title" />
                                    <ErrorMessage name="job" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Instructor Image</h6>
                                    <Field type="file" name="img" />
                                    <ErrorMessage name="img" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>About Instructor</h6>
                                    <Field as="textarea" name="About" placeholder="Tell us about the instructor" />
                                    <ErrorMessage name="About" component="div" className="error" />
                                </div>
                                <h5>Contact Information</h5>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Address</h6>
                                    <Field type="text" name="Contact.address" placeholder="Enter Address" />
                                    <ErrorMessage name="Contact.address" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Email</h6>
                                    <Field type="text" name="Contact.Email" placeholder="Enter Email Address" />
                                    <ErrorMessage name="Contact.Email" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Phone Number</h6>
                                    <Field type="text" name="Contact.phone" placeholder="Enter Phone Number" />
                                    <ErrorMessage name="Contact.phone" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Facebook</h6>
                                    <Field type="text" name="Contact.facebook" placeholder="Enter Facebook Profile URL" />
                                    <ErrorMessage name="Contact.facebook" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>Twitter</h6>
                                    <Field type="text" name="Contact.twitter" placeholder="Enter Twitter Profile URL" />
                                    <ErrorMessage name="Contact.twitter" component="div" className="error" />
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h6>LinkedIn</h6>
                                    <Field type="text" name="Contact.linkedIn" placeholder="Enter LinkedIn Profile URL" />
                                    <ErrorMessage name="Contact.linkedIn" component="div" className="error" />
                                </div>

                                <button type="submit" className="btn btn-success">Add</button>
                                {console.log(errors)}
                            </Form>
                        </div>
                    )}
                </Formik>
            </CustomModal>
        );
    }
}
