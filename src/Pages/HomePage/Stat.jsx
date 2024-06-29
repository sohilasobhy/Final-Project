import React, { useEffect, useState } from "react";
import shape3 from "../../assets/images/shape3.png";
import shape1 from "../../assets/images/shape1.png";
import shape2 from "../../assets/images/shape-04.png";

export default function Stat() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPlay(true);
    }, 500);
  }, []);

  return (
    <div
      className="col-12 d-flex justify-content-center position-relative"
      id="Stat">
      <div className="bg-white d-flex flex-wrap p-5 position-relative section">
        <div className="col-12 col-md-6 px-2 py-5 topLeft box d-flex flex-column align-items-center">
          <p className="num">45.2K</p>
          <p>Student Enrolled</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 topRight box d-flex flex-column align-items-center">
          <p className="num">32.4K</p>
          <p>CLASS COMPLETED</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 bottomLeft box d-flex flex-column align-items-center">
          <p className="num">354+</p>
          <p>TOP INSTRUCTORS</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 bottomRight box d-flex flex-column align-items-center">
          <p className="num">99.9%</p>
          <p>SATISFACTION RATE</p>
        </div>
      </div>
      <img
        src={shape2}
        alt=""
        className="shape2 position-absolute d-none d-xl-block"
      />
      <img
        src={shape3}
        alt=""
        className="spin position-absolute d-none d-xl-block"
      />
      <img
        src={shape1}
        alt=""
        className="shape1 position-absolute d-none d-xl-block"
      />
    </div>
  );
}
