import { Accordion, Button } from "react-bootstrap";
import visa from "../../assets/images/pngwing.com.png"
import Mastercard from "../../assets/images/Mastercard-logo.svg.png"
import fawrey from "../../assets/images/fawrey.png"
import { useRecoilState } from "recoil";
import { $subPlans } from "../../Store/Store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { phoneSchema } from "../../schemas/phoneSchema";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
    const [subPlan] = useRecoilState($subPlans);
    let navigate = useNavigate()
    return (
        <div className="mt-5 col-12 col-md-8 col-lg-6" id="payment">
            <Accordion defaultActiveKey="1" alwaysOpen>
                <Accordion.Item eventKey="1" className='mt-3'>
                    <Accordion.Header>
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex">
                                <img src={Mastercard} alt="Mastercard" className="object-fit-contain" width={40} height={28} />
                                <img src={visa} alt="visa" className="object-fit-contain" width={40} height={28} />
                            </div>
                            <p className="header">
                                Pay with credit or debit card
                            </p>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <p className="body">
                                    Pay with credit or debit card
                                </p>
                                <div>
                                    <img src={Mastercard} alt="Mastercard" width={50} height={28} className="object-fit-contain" />
                                    <img src={visa} alt="visa" width={50} height={28} className="object-fit-contain" />
                                </div>
                            </div>
                            <Button className="mt-3 mx-auto col-10" variant="danger" onClick={() => navigate("/checkout")}>Pay {subPlan.price} EGP</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='mt-3'>
                    <Accordion.Header>
                        <div className="d-flex align-items-center gap-3">
                            <img src={fawrey} alt="fawrey" className="object-fit-cover" width={85} height={25} />
                            <p className="header">
                                Pay with Fawry
                            </p>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex flex-column">
                            <p>Through Fawry, you can pay through any Fawry outlet with cash. Please pay within the specified time mentioned in the receipt to avoid automatic cancellation.</p>
                            <Formik
                                initialValues={{ phone: "" }}
                                onSubmit={(values) => console.log(values)}
                                validationSchema={phoneSchema}
                            >
                                <Form>
                                    <p className="mt-3 mb-2">Mobile Number</p>
                                    <Field type="text" placeholder="01X-XXXX-XXXX" className="phone col-12 m-auto" required name="phone" />
                                    <span className="error">
                                        <ErrorMessage name="phone" />
                                    </span>
                                    <Button variant="danger" className="mt-3 mx-auto col-12" type="submit">Proceed</Button>
                                </Form>
                            </Formik>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
