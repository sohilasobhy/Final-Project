import { Link } from "react-router-dom"
import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
export default function Header() {
    return (
        <div className="position-relative d-flex flex-column gap-3 align-items-center justify-content-center" id="Header">
            <div className="w-100 h-100 position-absolute backgroundFilter"></div>
            <h1>A Large Range of Course Learning Paths</h1>
            <div className="d-flex align-items-center gap-2">
                <Link to={"/"}>Home</Link>
                <FontAwesomeIcon icon={faAngleRight} />
                <p>About Us</p>
            </div>
        </div>
    )
}
