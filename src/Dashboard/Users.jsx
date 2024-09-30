import axios from "axios";
import { useEffect } from "react";
import Default from "../assets/images/user.png"
import Swal from "sweetalert2";
import { $AddAdmin, $allUsers } from "../Store/Store";
import { useRecoilState } from "recoil";
export default function Users() {
    const [users, setusers] = useRecoilState($allUsers)
    const [, setOpen] = useRecoilState($AddAdmin)
    console.log(users)
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
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/Users/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting this user.",
                            icon: "error"
                        });
                    });
                const updatedArray = users.filter(item => item.id !== id);
                setusers(updatedArray)

            }
        });
    };
    console.log(users)
    return (
        <div id="UsersDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div className="d-flex justify-content-between">
                <h2>All Users</h2>
                <button className="btn btn-outline-primary" onClick={() => setOpen(true)}>Add admin</button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            User Id
                        </td>
                        <td >
                            User Image
                        </td>
                        <td >
                            User Name
                        </td>
                        <td >
                            User Role
                        </td>
                        <td className="text-center">
                            Delete
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
                                        <td className="text-center">
                                            <p>
                                                {user.id}
                                            </p>
                                        </td>
                                        <td >
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
                                                Delete
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
                                        <td className="text-center">
                                            <p>
                                                {user.id}
                                            </p>
                                        </td>
                                        <td >
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
                                                Delete
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
