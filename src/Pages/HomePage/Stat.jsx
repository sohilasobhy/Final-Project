import React, { useEffect, useState } from "react";
import shape3 from "../../assets/images/shape3.png";
import shape1 from "../../assets/images/shape1.png";
import shape2 from "../../assets/images/shape-04.png";
import Counter from "./Counter";

export default function Stat() {
  const [play, setPlay] = useState(false);
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
          <div
            className="num d-flex align-items-center justify-content-center">
            <Counter initialCount={0} targetValue={45} incrementValue={1} updateInterval={30} duration={2000} />
            <p className="point">.</p>
            <Counter initialCount={0} targetValue={2} incrementValue={1} updateInterval={100} duration={2000} />
            <p className="point">K</p>
          </div>
          <p>Student Enrolled</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 topRight box d-flex flex-column align-items-center">
          <div className="num d-flex align-items-center justify-content-center">
            <Counter initialCount={0} targetValue={32} incrementValue={1} updateInterval={30} duration={2000} />
            <p className="point">.</p>
            <Counter initialCount={0} targetValue={4} incrementValue={1} updateInterval={100} duration={2000} />
            <p className="point">K</p>
          </div>
          <p>CLASS COMPLETED</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 bottomLeft box d-flex flex-column align-items-center">
          <div className="num d-flex align-items-center justify-content-center">
            <Counter initialCount={0} targetValue={354} incrementValue={10} updateInterval={30} duration={2000} />
            <p className="point">+</p>
          </div>
          <p>TOP INSTRUCTORS</p>
        </div>
        <div className="col-12 col-md-6 px-2 py-5 bottomRight box d-flex flex-column align-items-center">
          <div className="num d-flex align-items-center justify-content-center">
            <Counter initialCount={0} targetValue={99} incrementValue={2} updateInterval={30} duration={2000} />
            <p className="point">.</p>
            <Counter initialCount={0} targetValue={9} incrementValue={1} updateInterval={30} duration={2000} />
            <p className="point">%</p>
          </div>
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
        style={{
          transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`
        }}
      />
    </div>
  );
}
