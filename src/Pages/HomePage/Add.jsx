import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export default function Add() {
  let navigate = useNavigate()
  return (
    <div className="col-12 my-5 p-5 " id="Add">
      <div className="contant d-flex justify-content-center flex-column align-items-center">
        <p className=" mainContant text-center">
          <FormattedMessage id="qualitySkills" /> <span><FormattedMessage id="certificate" /></span> <FormattedMessage id="ThroughEduJourney" />
        </p>
        <div className="position-relative Browse d-flex justify-content-center col-7 col-md-4 col-lg-3 mt-3" onClick={() => { navigate("/courses") }}>
          <button className="d-flex align-items-center gap-3 btn">
            <p>
              <FormattedMessage id="BrowseMore" /> <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </button>
          <div className="position-absolute BTNFilter"></div>
        </div>
      </div>
    </div>
  );
}
