import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SingleCourseComponent from '../../Components/SingleCourseComponent';
const PaginatedCourses = ({ courses }) => {
    console.log(courses)
    const itemsPerPage = 12;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(courses?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(courses?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, courses]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % courses?.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems.map((course) => (
                <div
                    className="col-sm-9 col-md-6 col-lg-5 col-xl-4 col-xxl-3 position-relative"
                    key={course.id}>
                    <SingleCourseComponent course={course} color={"#f7f5f2"} img={course.img} />
                </div>
            ))}
            <div className='col-12 d-flex justify-content-center'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    pageCount={pageCount}
                    previousLabel="<"
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
            </div>
        </>
    );
};

export default PaginatedCourses;
