import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { $EditSubPlans, $EditedPlan, $addSubPlan, $allPlans } from '../Store/Store'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormattedMessage, useIntl } from 'react-intl'

export default function SubPlans() {
    const [, setOpen] = useRecoilState($addSubPlan)
    const [, setEdit] = useRecoilState($EditSubPlans)
    const [, setEditedPlan] = useRecoilState($EditedPlan)
    const [plans, setPlans] = useRecoilState($allPlans)
    let intl = useIntl()
    useEffect(() => {
        axios
            .get("http://localhost:3000/SubPlans")
            .then((res) => {
                setPlans(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    function handleDelete(id) {
        Swal.fire({
            title: intl.formatMessage({ id: "areYouSure" }),
            text: intl.formatMessage({ id: "revert" }),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/SubPlans/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "deleted" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
                const updatedArray = plans.filter(item => item.id !== id);
                setPlans(updatedArray)
            }
        });
    }
    return (
        <div id="SubPlans" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div className="d-flex justify-content-between">
                <h2><FormattedMessage id='subPlans' /></h2>
                <button className="btn btn-outline-primary" onClick={() => setOpen(true)}><FormattedMessage id='adPlan' /></button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr className='text-center' >
                        <td >
                            <FormattedMessage id='planDuration' />
                        </td>
                        <td >
                            <FormattedMessage id='planPrice' />
                        </td>
                        <td >
                            <FormattedMessage id='planCharge' />
                        </td>
                        <td className='text-center'>
                            <FormattedMessage id='edit' />
                        </td>
                        <td className='text-center'>
                            <FormattedMessage id='delete' />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        plans?.map((plan) => {
                            return (
                                <tr className='text-center'>
                                    <td>
                                        {plan.duration}
                                    </td>
                                    <td>
                                        {plan.price}$
                                    </td>
                                    <td>
                                        {plan.charge}
                                    </td>
                                    <td className='text-center'>
                                        <button className='btn btn-primary' onClick={() => {
                                            setEdit(true)
                                            setEditedPlan(plan.id)
                                        }}><FormattedMessage id='edit' /></button>
                                    </td>
                                    <td className='text-center'>
                                        <button className='btn btn-danger' onClick={() => {
                                            handleDelete(plan.id)
                                        }}><FormattedMessage id='delete' /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
