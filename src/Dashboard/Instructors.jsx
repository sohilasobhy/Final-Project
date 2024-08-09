import axios from "axios"
import { useEffect, useState } from "react"

export default function Instructors() {
    const [Instructors, setInstrucors] = useState()
    useEffect(() => {
        axios.get("http://localhost:3000/Instructors")
            .then((response) => {
                setInstrucors(response.data)
                console.log(Instructors)
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            })
    }, [])
    return (
        <div id="InstrucorsDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
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
                                        {Instructor.name}
                                    </td>
                                    <td>
                                        {Instructor.coursesID.map((course) => { return (`${course}`) })}
                                    </td>
                                    <td className="text-center">
                                        -
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
