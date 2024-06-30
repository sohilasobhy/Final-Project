import girl from "../../assets/images/course-79-750x750.jpg";
import calender from "../../assets/images/calender.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Events() {
  return (
    <div
      className="col-12 d-flex flex-column align-items-center justify-content-center mt-5 p-5"
      id="Events">
      <div className="d-flex flex-column align-items-center gap-3">
        <p className="header">LATEST EVENTS</p>
        <h2>Get News with EduJourney</h2>
        <div className="col-3">
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
      <div className="d-flex mt-5">
        <div className="row g-4">
          <div className="col-4">
            <div className=" position-relative">
              <div className="eventPicCon position-relative">
                <img src={girl} alt="event-pic" className="col-12 eventPic" />
                <div className="filter"></div>
                <div className="eventBtn">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
              <div className=" position-absolute bg-white col-10 eventDetail">
                <p className="category">SIENCE</p>
                <p className="name">Crafting Effective Learning Guide Line</p>
                <p className="date d-flex gap-1 align-items-center">
                  <img src={calender} alt="calender" /> 15 Nov, 2023
                </p>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum commodi cupiditate tempore dignissimos
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className=" position-relative">
              <div className="eventPicCon position-relative">
                <img src={girl} alt="event-pic" className="col-12 eventPic" />
                <div className="filter"></div>
                <div className="eventBtn">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
              <div className=" position-absolute bg-white col-10 eventDetail">
                <p className="category">SIENCE</p>
                <p className="name">Crafting Effective Learning Guide Line</p>
                <p className="date d-flex gap-1 align-items-center">
                  <img src={calender} alt="calender" /> 15 Nov, 2023
                </p>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum commodi cupiditate tempore dignissimos
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className=" position-relative">
              <div className="eventPicCon position-relative">
                <img src={girl} alt="event-pic" className="col-12 eventPic" />
                <div className="filter"></div>
                <div className="eventBtn">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
              <div className=" position-absolute bg-white col-10 eventDetail">
                <p className="category">SIENCE</p>
                <p className="name">Crafting Effective Learning Guide Line</p>
                <p className="date d-flex gap-1 align-items-center">
                  <img src={calender} alt="calender" /> 15 Nov, 2023
                </p>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rerum commodi cupiditate tempore dignissimos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
