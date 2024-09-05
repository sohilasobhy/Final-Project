import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { $HomeReviews, $ReviewForm } from '../Store/Store'
import CustomModal from '../Components/Modal/Modal'
import Swal from 'sweetalert2'

export default function AddReview() {
    const [reviews, setReviews] = useState([])
    const [HomeReviews, setHomeReviews] = useRecoilState($HomeReviews)
    const [AddForm, setAddForm] = useRecoilState($ReviewForm)
    let url = "http://localhost:3000/HomeReviews"
    useEffect(() => {
        axios
            .get("http://localhost:3000/Reviews")
            .then((res) => {
                setReviews(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios
            .get("http://localhost:3000/HomeReviews")
            .then((res) => {
                setHomeReviews(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const homeReviewsIds = HomeReviews.map(review => Number(review.id));
    console.log(reviews)
    console.log(homeReviewsIds)
    let filteredReviews = reviews.filter(oneReview => !homeReviewsIds.includes(Number(oneReview.id)));
    console.log(filteredReviews)
    function AddToHomeRewiews(reviewId) {
        let review = reviews.find((element) => element.id == reviewId)
        console.log(review)
        Swal.fire({
            title: "Are you sure you want to add this review?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, review)
                    .then(() => {
                        Swal.fire({
                            title: "Added!",
                            text: "Your review has been added.",
                            icon: "success"
                        });
                        setHomeReviews([...HomeReviews, review])
                        setAddForm(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding the review.",
                            icon: "error"
                        });
                    });
            }
        });

    }
    if (AddForm) {
        return (
            <CustomModal title={"Add Review To Home"} onHide={() => setAddForm(false)} show={AddForm}>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                Review
                            </td>
                            <td>
                                UserId
                            </td>
                            <td>
                                Add
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredReviews.map((review) => {
                                return (
                                    <tr>
                                        <td>
                                            {review.id}
                                        </td>
                                        <td>
                                            {review.comment}
                                        </td>
                                        <td>
                                            {review.userId}
                                        </td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => AddToHomeRewiews(review.id)}>
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </CustomModal>
        )
    }
}
