import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { $subPlans } from "../../Store/Store"

export default function Plans() {
    const [plans, setPlans] = useState()
    const [subPlans, setSubPlans] = useRecoilState($subPlans)
    useEffect(() => {
        axios
            .get("http://localhost:3000/SubPlans")
            .then((res) => {
                setPlans(res.data)
                console.log(plans)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className='row mt-5 g-5 justify-content-center align-items-center' id="Plans">
            {
                plans?.map((plan, index) => {
                    return (
                        <div className="col-12 col-md-8 col-lg-4" key={index} onClick={() => setSubPlans(plan)}>
                            <div className="d-flex flex-column justify-content-between plan">
                                <div>
                                    <h3>{plan.duration} Plan</h3>
                                    <p className="mt-2">{plan.price} EGP/month</p>
                                </div>
                                <p className="charge">{plan.charge}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
