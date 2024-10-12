import React from 'react';
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { TbMoodSad } from "react-icons/tb";

export const RateStars = ({ rate }) => {
    console.log(rate)
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars;
    const lang = localStorage.getItem("lang") || "ltr";

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
        starElements.push(<span className='starColor' key={`full-star-${i}`}><FaStar /></span>);
    }

    if (halfStar > 0) {
        starElements.push(
            <span className='starColor' key={`half-star`}>
                {lang == 'ltr' ? <FaStarHalf /> : <FaStarHalf style={{ transform: 'scaleX(-1)' }} />}
            </span>
        );
    }

    return (
        <div className='flex items-center'>
            {starElements.length > 0 ? starElements : <span><TbMoodSad /></span>}
        </div>
    );
};

