import img2 from "../../assets/images/check-mark.png";
import group from "../../assets/images/about-11.webp"
import man from "../../assets/images/about-12.webp"
import { FormattedMessage } from "react-intl";
export default function Features() {
    return (
        <div id="AboutFeatures">
            <div className="d-flex flex-column flex-lg-row contentCon gap-lg-0 justify-content-center align-items-center container">
                <div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center gap-3">
                    <p className="title text-center text-lg-start"><FormattedMessage id="about" /></p>
                    <div className="col-12 d-flex flex-column align-items-center">
                        <h2 className="col-11 text-center text-lg-start"><FormattedMessage id="qualityCourses" /></h2>
                        <div className="col-3 d-flex justify-content-center align-items-center mt-3">
                            <svg
                                style={{
                                    fill: "none",
                                    stroke: "#00C8D5",
                                    strokeWidth: "5",
                                    enableBackground: "new 0 0 1 1",
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                id="Laag_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 119 15"
                                xmlSpace="preserve">
                                <path className="st0" d="M1,13.5C21,4.2,72-3,118,6" />
                            </svg>
                        </div>
                    </div>
                    <p className="desc col-11 text-center text-lg-start"><FormattedMessage id="commited" /></p>
                    <div className="d-flex justify-content-start gap-2 align-content-center about">
                        <img src={img2} alt="check-mark" />
                        <p><FormattedMessage id="SATISFACTIONRATE" /></p>
                    </div>
                    <div className="d-flex justify-content-start gap-2 align-content-center about">
                        <img src={img2} alt="check-mark" />
                        <p><FormattedMessage id="OnlineRemoteLearning" /></p>
                    </div>
                    <div className="d-flex justify-content-start gap-2 align-content-center about">
                        <img src={img2} alt="check-mark" />
                        <p><FormattedMessage id="LifetimeAccess" /></p>
                    </div>
                </div>
                <div className="imgSec d-flex justify-content-center align-items-center position-relative">
                    <img src={group} alt="group-photo" className="groupPhoto h-100" />
                    <img src={man} alt="man-photo" className="position-absolute manPhoto" />
                </div>
            </div>
        </div>
    )
}
