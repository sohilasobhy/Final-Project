import girl from "../../assets/images/team-01.webp";
import shareIcon from "../../assets/images/share.png";
import linkedIn from "../../assets/images/linkedin-logo.png";
import facebook from "../../assets/images/facebook-app-symbol.png";
import twitter from "../../assets/images/twitter.png";
import { useEffect, useState } from "react";
import axios from "axios";
export default function HomeInstractor() {
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/HomeInsrtractuors")
      .then((response) => {
        setArray(response.data);
        console.log(array);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div
      className="col-12 d-flex flex-column align-items-center gap-5"
      id="HomeInstractor">
      <div className="d-flex flex-column align-items-center header gap-2">
        <p>INSTRUCTORS</p>
        <h2>Course Instructors</h2>
        <div className="col-6">
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
      <div className="col-12 row g-3 px-5">
        {array.map((instractour, index) => {
          return (
            <div className="col-12 col-md-6 col-lg-3" key={instractour.id}>
              <div className="instractour">
                <div className="col-12 imgCon">
                  <img
                    src={girl}
                    alt=""
                    className="col-12 h-100 object-fit-cover instratourImg"
                  />
                  <div className="position-absolute shareIcon">
                    <img src={shareIcon} />
                  </div>
                  <div className="position-absolute greenFilter"></div>
                  <div className="position-absolute facebook socialMedia">
                    <img src={facebook} alt="" />
                  </div>
                  <div className="position-absolute twitter socialMedia">
                    <img src={twitter} alt="" />
                  </div>
                  <div className="position-absolute linkedIn socialMedia">
                    <img src={linkedIn} alt="" />
                  </div>
                </div>
                <p className="text-center mt-3">
                  {instractour.name} <br /> <span>{instractour.job}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
