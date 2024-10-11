import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import Swal from "sweetalert2"
import { $AddInstructor, $AllInstructors, $HomeInstructors } from "../Store/Store"
import { FormattedMessage, useIntl } from "react-intl"

export default function InstructorsDash() {
    const [Instructors, setInstrucors] = useRecoilState($AllInstructors)
    const [homeInstructors, setHomeInstructors] = useRecoilState($HomeInstructors)
    const [, setAddForm] = useRecoilState($AddInstructor)
    let intl = useIntl()
    useEffect(() => {
        axios.get("http://localhost:3000/Instructors")
            .then((response) => {
                setInstrucors(response.data)
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
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
                axios.delete(`http://localhost:3000/HomeInstructors/${id}`)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                axios.delete(`http://localhost:3000/Instructors/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "deleted" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
                axios.delete(`http://localhost:3000/users/${id}`)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                const updatedArray = Instructors.filter(item => item.id !== id);
                const updatedInstructors = homeInstructors.filter(item => item.id !== id);
                setHomeInstructors(updatedInstructors)
                setInstrucors(updatedArray)
            }
        });
    };
    return (
        <div id="InstrucorsDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div className="d-flex justify-content-between">
                <h2><FormattedMessage id="instructors" /></h2>
                <button className="btn btn-outline-primary" onClick={() => setAddForm(true)}><FormattedMessage id="addInstructor" /></button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>

                        <td className="ps-4">
                            <FormattedMessage id="instName" />
                        </td>

                        <td className="text-center">
                            <FormattedMessage id="delete" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Instructors?.map((Instructor) => {
                            return (
                                <tr>
                                    <td className="ps-4">
                                        <Link to={`/Instructor/${Instructor.id}`}>
                                            {Instructor.name}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(Instructor.id)}>
                                            <FormattedMessage id="delete" />
                                        </button>
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
