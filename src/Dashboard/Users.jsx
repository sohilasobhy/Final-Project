import axios from "axios";
import { useEffect } from "react";
import Default from "../assets/images/user.png"
import Swal from "sweetalert2";
import { $AddAdmin, $allUsers } from "../Store/Store";
import { useRecoilState } from "recoil";
import { FormattedMessage, useIntl } from "react-intl";
export default function Users() {
    const [users, setusers] = useRecoilState($allUsers)
    const [, setOpen] = useRecoilState($AddAdmin)
    let intl = useIntl()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Users")
            .then((response) => {
                setusers(response.data);
                console.log(users);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    console.log(users)
    const handleDelete = (id) => {
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
                axios.delete(`http://localhost:3000/Users/${id}`)
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
                const updatedArray = users.filter(item => item.id !== id);
                setusers(updatedArray)

            }
        });
    };
    return (
        <div id="UsersDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div className="d-flex justify-content-between">
                <h2><FormattedMessage id="users" /></h2>
                <button className="btn btn-outline-primary" onClick={() => setOpen(true)}><FormattedMessage id="addAdmin" /></button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="ps-4">
                            <FormattedMessage id="userImg" />
                        </td>
                        <td >
                            <FormattedMessage id="userName" />
                        </td>
                        <td >
                            <FormattedMessage id="userRole" />
                        </td>
                        <td className="text-center">
                            <FormattedMessage id="delete" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {console.log(users)}
                    {
                        users?.map((user) => {
                            if (user.role == "admin") {
                                return (
                                    <tr>

                                        <td className="ps-4">
                                            <img src={user.img != "" ? `../${user.img}` : Default} width={80} height={80} className="object-fit-cover" />
                                        </td>
                                        <td >
                                            {user.name}
                                        </td>
                                        <td >
                                            {user.role}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                                <FormattedMessage id="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    {
                        users?.map((user) => {
                            if (user.role == "user") {
                                return (
                                    <tr>

                                        <td className="ps-4">
                                            <img src={user.img != "" ? `../${user.img}` : Default} width={80} height={80} className="object-fit-cover" />
                                        </td>
                                        <td >
                                            {user.name}
                                        </td>
                                        <td >
                                            {user.role}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                                <FormattedMessage id="delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
