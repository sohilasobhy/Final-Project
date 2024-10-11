import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AddInstructorHome, $HomeInstructors } from "../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

export default function AddInstructorToHome() {
    const [AddInstructorHome, setAddInstructorHome] = useRecoilState($AddInstructorHome)
    const [allInstructors, setallInstructors] = useState([])
    const [HomeInstructors, setHomeInstructors] = useRecoilState($HomeInstructors)
    let intl = useIntl()
    console.log(allInstructors)
    let url = "http://localhost:3000/HomeInstructors"
    function addToHome(instId) {
        let instructor = allInstructors.find((element) => element.id == instId)
        Swal.fire({
            title: intl.formatMessage({ id: 'courseAdding' }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'yesAdd' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, instructor)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'confirm' }),
                            text: intl.formatMessage({ id: 'courseDone' }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setHomeInstructors([...HomeInstructors, instructor])
                        setAddInstructorHome(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'error' }),
                            text: intl.formatMessage({ id: 'proplem' }),
                            icon: "error"
                        });
                    });
            }
        });
    }
    useEffect(() => {
        axios
            .get("http://localhost:3000/Instructors")
            .then((res) => {
                setallInstructors(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeInstructors")
            .then((res) => {
                setHomeInstructors(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const homeInstructorsIds = HomeInstructors.map(instructor => Number(instructor.id));
    console.log(homeInstructorsIds)
    let filteredInstructors = allInstructors.filter(instructor => !homeInstructorsIds.includes(Number(instructor.id)));
    console.log(filteredInstructors)
    if (AddInstructorHome == true) {
        return (
            <div id="AddInstructorHome">
                <CustomModal onHide={() => setAddInstructorHome(false)} title={<FormattedMessage id="addInstructor" />} show={AddInstructorHome}>
                    <div className="allCoursesCon">
                        <table className="table table-active w-100">
                            <thead>
                                <tr>
                                    <td><FormattedMessage id="instImg" /></td>
                                    <td><FormattedMessage id="instName" /></td>
                                    <td className="text-center"><FormattedMessage id="add" /></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredInstructors.map((Instructor) => {
                                        return (
                                            <tr key={Instructor.id}>
                                                <td><img src={`../${Instructor.img}`} alt="" width={80} height={80} className="object-fit-cover instructorImage" /></td>
                                                <td>{Instructor.name}</td>
                                                <td onClick={() => addToHome(Instructor.id)} className="add text-center">
                                                    <button className="btn btn-primary"><FormattedMessage id="add" /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </CustomModal>
            </div>
        )
    }
}
