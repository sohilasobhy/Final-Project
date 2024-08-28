import { FaFacebookF } from "react-icons/fa6";
import { SiTwitter } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function InstructorInfo({ Instructor }) {
    return (
        <div className="d-flex flex-column flex-lg-row gap-1 justify-content-center align-items-center" id="InstructorInfo">
            <div className="col-12 col-lg-5 d-flex flex-column align-items-center">
                <img src={`../${Instructor?.img}`} alt="Instructor" className="instructorImage" width={300} height={300} />
                <div className="d-flex justify-content-center gap-5 contacts">
                    <Link to={Instructor?.Contact?.facebook} target="_blank">
                        <FaFacebookF />
                    </Link>
                    <Link to={Instructor?.Contact?.twitter} target="_blank">
                        <SiTwitter />
                    </Link>
                    <Link to={Instructor?.Contact?.linkedIn} target="_blank">
                        <FaLinkedinIn />
                    </Link>
                </div>
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column  justify-content-start align-items-lg-start align-items-center info">
                <p className="instructorName text-center text-lg-start">{Instructor?.name}</p>
                <p className="instructorJob mt-1  text-center text-lg-start">{Instructor?.job}</p>
                <div>
                    <h5 className="mt-5  text-center text-lg-start">About Me</h5>
                    <p className="mt-3  text-center text-lg-start">
                        {Instructor?.About}
                    </p>
                </div>
            </div>
        </div>
    )
}
