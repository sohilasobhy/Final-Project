import { Link, useParams } from "react-router-dom"
import "./Categories.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { Spinner } from "react-bootstrap"
import SingleCourseComponent from "../../Components/SingleCourseComponent"
import ReactPaginate from 'react-paginate';

export default function Categories() {
    let categorId = useParams()
    const [categories, setCategories] = useState([])
    const [isloading, setIsloading] = useState(false)
    const itemsPerPage = 6;
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(categories?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(categories?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, categories]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % categories?.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        setIsloading(true)
        axios
            .get(`http://localhost:3000/Courses?CtegoryId=${categorId.categorId}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            }).finally(() => {
                setIsloading(false);
            });
    }, []);
    console.log(categories)
    let content;
    if (isloading) {
        content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
    } else if (categories?.length == 0) {
        content = <h2 className="p-5">No Courses in this category</h2>
    } else if (!categories) {
        content = <h2 className="p-5">No Category Data</h2>
    }
    else {
        content = <div id="mainCategories">
            <div className="header">
                <p className="d-flex align-items-center gap-2">
                    <Link to={"/"}>Home</Link>
                    <FontAwesomeIcon icon={faAngleRight} /> <p>{categories[0]?.category}</p>
                </p>
            </div>
            <div>
                <div className="row p-5 col-12 g-4">
                    {
                        currentItems?.map((category) => {
                            return (
                                <div
                                    className="col-12 col-md-6 col-lg-4 position-relative" key={category.id}>
                                    <SingleCourseComponent
                                        color={"#f5f9fa"}
                                        course={category}
                                    />
                                </div>
                            )

                        })
                    }
                </div>
            </div>
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
        </div>

    }
    return (
        <div>
            {content}
        </div>
    )
}
