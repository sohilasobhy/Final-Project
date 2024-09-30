import { Accordion, Button } from "react-bootstrap";
import visa from "../../assets/images/pngwing.com.png"
import Mastercard from "../../assets/images/Mastercard-logo.svg.png"
import { useRecoilState } from "recoil";
import { $UserInfo, $checkoutPay, $subPlans } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Payment() {
    const [subPlan] = useRecoilState($subPlans);
    const [checkoutPay, setcheckoutPay] = useRecoilState($checkoutPay);
    const [userInfo, setUserInfo] = useRecoilState($UserInfo)
    console.log(subPlan)
    function handlecheck() {
        if (userInfo != null) {
            navigate("/checkout")
            setcheckoutPay(subPlan)
        } else {
            toast.error("Please login first")
            setTimeout(() => { navigate("/login") }, 500)
        }
    }
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
                            <Button className="mt-3 mx-auto col-10" variant="danger" onClick={() => {
                                handlecheck()
                            }}>Pay {subPlan.price} EGP</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    );
}
