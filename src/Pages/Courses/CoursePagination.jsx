import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import SingleCourseComponent from '../../Components/SingleCourseComponent';

const PaginatedCourses = () => {
    let itemsPerPage = 6
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [array, setArray] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Courses`)
            .then((response) => {
                setArray(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(itemOffset)
        console.log(itemsPerPage)
        if (array.length > 1) {
            setArray(array?.slice(itemOffset, endOffset));
            console.log(array)
            setPageCount(Math.ceil(array?.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % courses.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {array?.map((course, index) => {
                return (
                    <div
                        className="col-12 col-md-6 col-lg-4  position-relative"
                        key={course.id}>
                        <SingleCourseComponent course={course} color={"#f7f5f2"} img={course.img} />
                    </div>
                );
            })}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />
        </ >
    );
};

export default PaginatedCourses;
