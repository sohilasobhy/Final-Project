import shape1 from "../../assets/images/shape1.png";
import shape2 from "../../assets/images/shape2.png";
import shape3 from "../../assets/images/shape3.png";
import shape4 from "../../assets/images/shpe4.png";
import shape5 from "../../assets/images/shape5.png";
import girl from "../../assets/images/girl-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
export default function HeroSection() {
  let navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div id="HeroSection" className="col-12 overflow-hidden">
      <div className="col-12 px-5 pt-5 d-flex justify-content-between align-items-center gap-5 container flex-wrap ">
        <div className="left col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start text-center text-lg-start gap-5 gap-lg-4 z-1 position-relative ">
          <h1 className="col-12 col-lg-9">
            <FormattedMessage id="get" />
            &nbsp;
            <span><FormattedMessage id="number" /></span>
            <FormattedMessage id="title" />
          </h1>
          <p>
            <FormattedMessage id="subTitle" />
          </p>
          <button className="btn btn-primary col-6 col-lg-4 py-3 d-flex align-items-center gap-2 justify-content-center position-relative" onClick={() => { navigate("/courses") }}>
            <div className="position-absolute btnBG w-100 h-100"></div>
            <p className=" z-2"><FormattedMessage id="findCourses" /></p>
            <FontAwesomeIcon icon={faArrowRight} className=" z-2" />
          </button>
        </div>
        <div className="right col-12 col-lg-5 d-flex justify-content-center" >
          <img src={girl} alt="" className=" z-1" />
        </div>
        <img
          src={shape1}
          alt=""
          className="shape1 position-absolute d-none d-xxl-block"
          style={{
            transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`
          }}
        />
      </div>
      <img
        src={shape2}
        alt=""
        className="shape2 position-absolute d-none d-xxl-block"
        style={{
          transform: `translate(${mousePosition.x * 0}px, ${mousePosition.y * -0.1}px)`
        }}
      />
      <img
        src={shape3}
        alt=""
        className="shape3 position-absolute z-2 d-none d-xxl-block"

      />
      <img
        src={shape4}
        alt=""
        className="shape4 position-absolute d-none d-xxl-block"

      />
      <img
        src={shape5}
        alt=""
        className="shape5 position-absolute d-none d-xxl-block"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
        }}
      />
      <img
        src={shape1}
        alt=""
        className="shape6 position-absolute d-none d-xxl-block"
        style={{
          transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`
        }}
      />
      <div className="circle position-absolute  d-none d-xxl-block"></div>
      <div className="blueCircle position-absolute d-none "></div>
    </div>
  );
}
