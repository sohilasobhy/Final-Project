import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { $HomeReviews, $ReviewForm } from '../Store/Store'
import CustomModal from '../Components/Modal/Modal'
import Swal from 'sweetalert2'
import { FormattedMessage, useIntl } from 'react-intl'

export default function AddReview() {
    const [reviews, setReviews] = useState([])
    const [HomeReviews, setHomeReviews] = useRecoilState($HomeReviews)
    const [AddForm, setAddForm] = useRecoilState($ReviewForm)
    let intl = useIntl();
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
            title: intl.formatMessage({ id: 'courseAdding' }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'confirm' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, review)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'added' }),
                            text: intl.formatMessage({ id: 'courseDone' }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setHomeReviews([...HomeReviews, review])
                        setAddForm(false)
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
    if (AddForm) {
        return (
            <CustomModal title={<FormattedMessage id="addReview" />} onHide={() => setAddForm(false)} show={AddForm}>

                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <td>
                                <FormattedMessage id="review" />
                            </td>

                            <td className='text-center'>
                                <FormattedMessage id="add" />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredReviews.map((review) => {
                                return (
                                    <tr key={review.id}>
                                        <td>
                                            {review.comment}
                                        </td>
                                        <td className='text-center'>
                                            <button className='btn btn-primary ' onClick={() => AddToHomeRewiews(review.id)}>
                                                <FormattedMessage id="add" />
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
