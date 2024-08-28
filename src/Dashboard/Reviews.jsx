import axios from "axios";
import { useEffect, useState } from "react";

export default function ReviewsDash() {
    const [Reviews, setReviews] = useState()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Reviews")
            .then((response) => {
                setReviews(response.data);
                console.log(Reviews);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    return (
        <div id="Reviews" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
            <h2>All Reviews</h2>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            Review Id
                        </td>
                        <td>
                            Comment
                        </td>
                        <td className="text-center">
                            User Id
                        </td>
                        <td className="text-center">
                            Course Id
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Reviews?.map((review) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        {review.id}
                                    </td>
                                    <td className="col-6">
                                        {review.comment}
                                    </td>
                                    <td className="text-center">
                                        {review.userId}
                                    </td>
                                    <td className="text-center">
                                        {review.courseID}
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
