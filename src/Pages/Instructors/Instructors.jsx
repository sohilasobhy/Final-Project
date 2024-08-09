import { Link } from "react-router-dom";
import "./Instructors.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleInstructor from "../../Components/SingleInstructorComponent/SingleInstructor";
import ReactPaginate from "react-paginate";

export default function InstructorsPage() {
    const [values, setValue] = useState();
    const itemsPerPage = 8; // Changed from 12 to 10
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [Instructors, setInstructors] = useState();

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(Instructors?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(Instructors?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, Instructors]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Instructors?.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/Instructors?q=${values}`)
            .then((response) => {
                setInstructors(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, [values]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/Instructors")
            .then((res) => {
                setInstructors(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="InstructorsPage">
            <div className="header">
                <p>
                    <Link to={"/"}>Home</Link>&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                    &nbsp; <Link to={"/courses"}>Instructors</Link>
                </p>
            </div>
            <div className="col-12 d-flex justify-content-end pt-5 px-5 container position-relative">
                <input
                    type="Search"
                    placeholder="Search Instructors..."
                    className="py-3 px-4 col-md-6 col-lg-3"
                    onChange={(e) => { setValue(e.target.value); }}
                />
            </div>
            <div className="container p-3">
                <div className="row g-4 justify-content-center align-items-stretch">
                    {
                        currentItems?.map((instructor) => {
                            return (
                                <SingleInstructor instractour={instructor} key={instructor.id} />
                            );
                        })
                    }
                </div>
            </div>
            <div className="col-12 d-flex justify-content-center mb-5">
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
    );
}
