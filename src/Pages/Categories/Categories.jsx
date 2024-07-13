import { Link, useParams } from "react-router-dom"
import "./Categories.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { Spinner } from "react-bootstrap"
import SingleCourseComponent from "../../Components/SingleCourseComponent"
export default function Categories() {
    let categorId = useParams()
    console.log(categorId)
    const [categories, setCategories] = useState([])
    const [isloading, setIsloading] = useState(false)
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
                    categories?.map((category) => {
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
        </div>
    }
    return (
        <div>
            {content}
        </div>
    )
}
