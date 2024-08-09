import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function Informations() {
    return (
        <div id="Informations" className="py-5 container">
            <div className="d-flex  justify-content-center  align-items-center">
                <div className="col-12 col-lg-6">
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                conPass: "",
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <Form className='col-12 p-5 d-flex flex-column gap-4'>
                                <h4>Forget your password ?</h4>
                                <Field name="email" type="email" placeholder='Enter Your Email*' />
                                <Field name="password" type="password" placeholder='Enter your new password' />
                                <Field name="conPass" type="password" placeholder='Confirm your password' />
                                <Button variant="success" className="d-flex align-items-center justify-content-center col-12 col-md-6">
                                    Submit Message
                                </Button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
