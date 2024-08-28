import axios from "axios";
import { useEffect, useState } from "react";

export default function MessagesDash() {
    const [messages, setMessages] = useState()
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
    console.log(messages.length)
    if (messages?.length == 0) {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
                <h2>No messages yet</h2>
            </div>
        )
    } else {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
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
}
