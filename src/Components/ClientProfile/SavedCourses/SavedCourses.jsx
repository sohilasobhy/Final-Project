import "./SavedCourses.scss"
import saved from "../../../assets/images/empty-wishlist-light.png"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function SavedCourses() {
    return (
        <div id="SavedCourses" className="p-5 d-flex flex-column">
            <h4>Saved Courses</h4>
            <div className="d-flex flex-column align-items-center mt-3 col-12 gap-2 noCourses">
                <img src={saved} alt="empty-wishlist" />
                <p className="text-center col-12 empty">Your wishlist is empty</p>
                <p className="text-center col-12 col-md-6 col-lg-4 save">Tap the save icon on any course card or course page to wishlist it and get back to it later</p>
            </div>
            <Link className="align-self-center backBtn mt-4" to={"/courses"}>Go back</Link>
        </div>
    )
}
