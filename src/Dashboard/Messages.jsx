import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MessagesDash() {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        axios
            .get("http://localhost:3000/Messages")
            .then((response) => {
                setMessages(response.data);
                console.log(messages);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
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
                axios.delete(`http://localhost:3000/Messages/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "message has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting this message.",
                            icon: "error"
                        });
                    });
                const updatedArray = messages.filter(item => item.id !== id);
                setMessages(updatedArray)

            }
        });
    };
    if (messages?.length == 0) {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
                <h2>No messages</h2>
            </div>
        )

    } else {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
                <h2>All Categories</h2>
                <table className="col-12 table mt-3">
                    <thead>
                        <tr>
                            <td className="text-center">
                                User name
                            </td>
                            <td>
                                Subject
                            </td>
                            <td>
                                Messages
                            </td>
                            <td className="text-center">
                                Delete
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages?.map((message) => {
                                console.log(message)
                                return (
                                    <tr>
                                        <td className="text-center">
                                            {message.name}
                                        </td>
                                        <td>
                                            {message.subject}
                                        </td>
                                        <td>
                                            {message.message}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" onClick={() => handleDelete(message.id)}>
                                                Delete
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
}
