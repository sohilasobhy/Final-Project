import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import Swal from "sweetalert2"
import { $AddInstructor, $AllInstructors } from "../Store/Store"

export default function InstructorsDash() {
    const [Instructors, setInstrucors] = useRecoilState($AllInstructors)
    const [, setAddForm] = useRecoilState($AddInstructor)
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/Instructors/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "the instructor has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the instructor.",
                            icon: "error"
                        });
                    });
                axios.delete(`http://localhost:3000/users/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "the instructor has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the instructor.",
                            icon: "error"
                        });
                    });
                const updatedArray = Instructors.filter(item => item.id !== id);
                setInstrucors(updatedArray)
            }
        });
    };
    return (
        <div id="InstrucorsDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <h2>All Instructors</h2>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            Instructor Id
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Course Id
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Instructors?.map((Instructor) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        {Instructor.id}
                                    </td>
                                    <td>
                                        <Link to={`/Instructor/${Instructor.id}`}>
                                            {Instructor.name}
                                        </Link>
                                    </td>
                                    <td>
                                        {Instructor.coursesID.map((course, index) => (
                                            <span key={course}>
                                                {course}{index !== Instructor.coursesID.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(Instructor.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan={4} className=" text-primary fw-medium fs-5 add" onClick={() => setAddForm(true)}>
                            + Add New Instructor
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
