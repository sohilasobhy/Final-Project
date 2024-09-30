import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { $EditSubPlans, $EditedPlan, $addSubPlan, $allPlans } from '../Store/Store'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function SubPlans() {
    const [, setOpen] = useRecoilState($addSubPlan)
    const [, setEdit] = useRecoilState($EditSubPlans)
    const [, setEditedPlan] = useRecoilState($EditedPlan)
    const [plans, setPlans] = useRecoilState($allPlans)
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/SubPlans/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your plan has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the category.",
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
                <h2>All Users</h2>
                <button className="btn btn-outline-primary" onClick={() => setOpen(true)}>Add subscription plan</button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr className='text-center' >
                        <td >
                            Plan Duration
                        </td>
                        <td >
                            Plan Price
                        </td>
                        <td >
                            Plan Charge
                        </td>
                        <td className='text-center'>
                            Edit
                        </td>
                        <td className='text-center'>
                            Delete
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
                                        }}>Edit</button>
                                    </td>
                                    <td className='text-center'>
                                        <button className='btn btn-danger' onClick={() => {
                                            handleDelete(plan.id)
                                        }}>Delete</button>
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
