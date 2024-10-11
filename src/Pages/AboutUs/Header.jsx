import { Link } from "react-router-dom"
import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FormattedMessage } from "react-intl"
import { useRecoilState } from "recoil"
import { $Language } from "../../Store/Store"
export default function Header() {
    const [lang] = useRecoilState($Language)
    return (
        <div className="position-relative d-flex flex-column gap-3 align-items-center justify-content-center" id="Header">
            <div className="w-100 h-100 position-absolute backgroundFilter"></div>
            <h1><FormattedMessage id="aboutHeader" /></h1>
            <div className="d-flex align-items-center gap-2">
                <Link to={"/"}><FormattedMessage id="home" /></Link>
                {lang == "En" ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />}
                <p><FormattedMessage id="about" /></p>
            </div>
        </div>
    )
}
