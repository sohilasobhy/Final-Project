import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import './RateStarsClick.css';

export const RateStarsClick = ({ setFieldValue }) => {
    const [content, setContent] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    let starElements = [];

    const handleClick = (index) => {
        setSelectedIndex(index);
        setFieldValue('rating', index + 1);
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    };

    for (let i = 0; i < 5; i++) {
        starElements.push(
            <span
                key={`star-${i}`}
                onClick={() => handleClick(i)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                className={`starHover ${i <= (hoverIndex >= 0 ? hoverIndex : selectedIndex) ? 'starColor' : ''}`}
            >
                {i <= (hoverIndex >= 0 ? hoverIndex : selectedIndex) ? <FaStar size={23} /> : <FaRegStar size={23} />}
            </span>
        );
    }

    useEffect(() => {
        setContent(starElements);
    }, [hoverIndex, selectedIndex]);

    return (
        <div className='flex items-center gap-2 my-3'>
            <div className='flex items-center'>{content}</div>
        </div>
    );
};
