import "./SingleInstructor.scss"
import shareIcon from "../../assets/images/share.png";
import linkedIn from "../../assets/images/linkedin(3).png";
import facebook2 from "../../assets/images/facebook-app-symbol(1).png";
import twitter from "../../assets/images/twitter.png";
import { useNavigate } from "react-router-dom";
export default function SingleInstructor({ instractour }) {
    const navigate = useNavigate()
    return (
        <div className="col-12 col-md-6 col-lg-3" id="SingleInstructor" key={instractour.id} onClick={() => {
            navigate(`/Instructor/${instractour.id}`)
        }}>
            <div className="h-100">
                <div className="instractour h-100">
                    <div className="col-12 imgCon h-75">
                        <img
                            src={instractour.img}
                            alt=""
                            className="col-12 h-100 object-fit-cover instratourImg"
                        />
                        <div className="position-absolute shareIcon">
                            <img src={shareIcon} />
                        </div>
                        <div className="position-absolute greenFilter"></div>
                        <div className="position-absolute facebook socialMedia" onClick={() => {
                            window.open(`${instractour?.Contact?.facebook}`, '_blank')
                        }} >
                            <img src={facebook2} alt="" className="facebookBlue" />
                        </div>
                        <div className="position-absolute twitter socialMedia" onClick={() => {
                            window.open(`${instractour?.Contact?.twitter}`, '_blank')
                        }} >
                            <img src={twitter} alt="" />
                        </div>
                        <div className="position-absolute linkedIn socialMedia" onClick={() => {
                            window.open(`${instractour?.Contact?.linkedIn}`, '_blank')
                        }} >
                            <img src={linkedIn} alt="" />
                        </div>
                    </div>
                    <p className="text-center mt-3">
                        {instractour.name} <br /> <span>{instractour.job}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
