import icon1 from "../../assets/images/video-conference.png";
import icon2 from "../../assets/images/male.png";
import icon3 from "../../assets/images/certificate.png";
import icon4 from "../../assets/images/membership.png";
export default function Features() {
  return (
    <div id="Features" className="col-12 p-0 px-xxl-5">
      <div className=" d-flex justify-content-center align-items-center flex-wrap px-xxl-5">
        <div className="d-flex gap-3 align-items-center px-3 py-5 col-12 col-md-6 col-lg-3 putBorder justify-content-start  justify-content-md-center align-items-center ">
          <div className="leftIcon d-flex justify-content-center align-items-center">
            <img src={icon1} alt="" className="object-fit-cover" width={50} />
          </div>
          <div className="d-flex flex-column rightDiv">
            <p className="number">3020</p>
            <p className="feature">Online Courses</p>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center px-3 py-5 col-12 col-md-6 col-lg-3 instructors justify-content-start  justify-content-md-center align-items-center">
          <div className="leftIcon d-flex justify-content-center align-items-center">
            <img src={icon2} alt="" className="object-fit-cover" width={50} />
          </div>
          <div className="d-flex flex-column rightDiv ">
            <p className="feature">
              Top <br /> Instructors
            </p>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center px-1 py-5 col-12 col-md-6 col-lg-3 putBorder justify-content-start  justify-content-md-center align-items-center">
          <div className="leftIcon d-flex justify-content-center align-items-center">
            <img src={icon3} alt="" className="object-fit-cover" width={50} />
          </div>
          <div className="d-flex flex-column rightDiv ">
            <p className="number">Online</p>
            <p className="feature">Certifications</p>
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center px-3 py-5 col-12 col-md-6 col-lg-3  justify-content-start  justify-content-md-center align-items-center">
          <div className="leftIcon d-flex justify-content-center align-items-center">
            <img src={icon4} alt="" className="object-fit-cover" width={50} />
          </div>
          <div className="d-flex flex-column rightDiv">
            <p className="number">6,000</p>
            <p className="feature">Membership</p>
          </div>
        </div>
      </div>
    </div>
  );
}
