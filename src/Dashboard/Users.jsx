import axios from "axios";
import { useEffect, useState } from "react";
import Default from "../assets/images/user.png"
export default function Users() {
    const [users, setusers] = useState()
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
    return (
        <div id="UsersDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
            <h2>All Users</h2>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            User Id
                        </td>
                        <td>
                            User Image
                        </td>
                        <td>
                            User Name
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        {user.id}
                                    </td>
                                    <td>
                                        <img src={user.img != "" ? user.img : Default} width={100} />
                                    </td>
                                    <td>
                                        {user.name}
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
