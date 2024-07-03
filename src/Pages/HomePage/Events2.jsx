import girl from "../../assets/images/course-79-750x750.jpg";
import calender from "../../assets/images/calender.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Events2() {
  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <div className="eventPicCon position-relative mt-5">
        <img src={girl} alt="event-pic" className="col-12 eventPic " />
        <div className="filter"></div>
        <div className="eventBtn">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <div className=" bg-white col-11 eventDetail">
        <p className="category">SIENCE</p>
        <p className="name">Crafting Effective Learning Guide Line</p>
        <p className="date d-flex gap-1 align-items-center">
          <img src={calender} alt="calender" /> 15 Nov, 2023
        </p>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          commodi cupiditate tempore dignissimos
        </p>
      </div>
    </div>
  );
}
