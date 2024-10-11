import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Swal from "sweetalert2";

export default function MessagesDash() {
    const [messages, setMessages] = useState([])
    let intl = useIntl()
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
                axios.delete(`http://localhost:3000/Messages/${id}`)
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
                const updatedArray = messages.filter(item => item.id !== id);
                setMessages(updatedArray)

            }
        });
    };
    if (messages?.length == 0) {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
                <h2><FormattedMessage id="noMessages" /></h2>
            </div>
        )

    } else {
        return (
            <div id="MessagesDash" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
                <h2><FormattedMessage id="messages" /></h2>
                <table className="col-12 table mt-3">
                    <thead>
                        <tr>
                            <td className="text-center">
                                <FormattedMessage id="users" />
                            </td>
                            <td>
                                <FormattedMessage id="subject" />
                            </td>
                            <td>
                                <FormattedMessage id="message" />
                            </td>
                            <td className="text-center">
                                <FormattedMessage id="delete" />
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
}
