import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const CircularProgressButton = ({ percentage, onClick }) => {
  const size = 50;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
        zIndex: "999999",
      }}
      onClick={onClick}>
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          pathColor: `#ee4a62`,
          trailColor: "#ffdadd",
          backgroundColor: "#3e98c7",
        })}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          color: "#ee4a62",
        }}>
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
};

export default CircularProgressButton;
