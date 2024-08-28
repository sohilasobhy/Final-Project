import axios from "axios";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { showSuccessAlert } from "../../Components/ShowSuccessAlert";
import { ContactScheme } from "../../schemas/ContactScheme";

let url = "http://localhost:3000/Messages";

export default function Informations() {
    function handleSubmit(values) {
        axios.post(url, values)
            .then(response => {
                console.log(response.data.email);
                showSuccessAlert();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div id="Informations" className="py-5 container">
            <div className="d-flex flex-column flex-lg-row justify-content-center gap-5 align-items-center">
                <div className="col-12 col-lg-5">
                    <div className="d-flex flex-column gap-4 contactInfo">
                        <h2 className="col-8">We're Always Eager to Hear From You!</h2>
                        <div>
                            <h4>Address</h4>
                            <p>Studio 76d, Riley Ford, North Michael chester, CF99 6QQ</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>egujourney@example.com</p>
                        </div>
                        <div>
                            <h4>Phone</h4>
                            <p>(+091) 413 554 8598</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <div>
                        <Formik
                            initialValues={{
                                name: "",
                                subject: "",
                                message: "",
                                email: "",
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={ContactScheme}
                        >
                            <Form className='col-12 p-5 d-flex flex-column gap-4'>
                                <h4>Get in touch!</h4>
                                <Field name="name" type="text" placeholder='Your Name*' />
                                <span className="text-danger fw-bold">
                                    <ErrorMessage name="name" />
                                </span>
                                <Field name="email" type="email" placeholder='Enter Your Email*' />
                                <span className="text-danger fw-bold">
                                    <ErrorMessage name="email" />
                                </span>
                                <Field name="subject" type="text" placeholder='Subject' />
                                <span className="text-danger fw-bold">
                                    <ErrorMessage name="subject" />
                                </span>
                                <Field name="message" as="textarea" placeholder='Your Message' />
                                <span className="text-danger fw-bold">
                                    <ErrorMessage name="message" />
                                </span>
                                <Button type="submit" variant="success" className="d-flex align-items-center justify-content-center col-12 col-md-6">
                                    Submit Message
                                </Button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
