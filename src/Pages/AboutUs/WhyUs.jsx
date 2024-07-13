import onlineCourse from "../../assets/images/online-course (1).png"
import onlineCourseHov from "../../assets/images/online-course (2).png"
import key from "../../assets/images/key.png"
import keyHov from "../../assets/images/key (1).png"
import male from "../../assets/images/male.png"
import maleHov from "../../assets/images/male (1).png"
export default function WhyUs() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center position-relative" id="WhyUs">
            <div className="d-flex flex-column gap-2 align-items-center mainTitle">
                <p className="text-muted text-center fs-6">WHY CHOOSE EDUJOURNEY</p>
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <h2 className="text-center fs-1 col-8 title">The Best <span>Beneficial</span> Side of EduBlink</h2>
                    <div className="col-3 d-flex justify-content-center align-items-center">
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
            </div>
            <div className="p-5 body">
                <div className="row g-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="contentCon left d-flex flex-column justify-content-center align-items-center gap-2 ">
                            <div className="d-flex justify-content-center align-items-center imgCon1">
                                <img src={onlineCourse} alt="online-course" className="img" />
                                <img src={onlineCourseHov} alt="online-course" className="imgHov" />
                            </div>
                            <h5>High Quality Courses</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="middle d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                            <div className="d-flex justify-content-center align-items-center imgCon2">
                                <img src={key} alt="online-course" className="img" />
                                <img src={keyHov} alt="online-course" className="imgHov" />
                            </div>
                            <h5>Life Time Access</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="right d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                            <div className="d-flex justify-content-center align-items-center imgCon3">
                                <img src={male} alt="online-course" className="img" />
                                <img src={maleHov} alt="online-course" className="imgHov" />
                            </div>
                            <h5>Expert Instructors</h5>
                            <p className="text-center">Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
