import { useRecoilState } from "recoil";
import { $Video } from "../../Store/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import video from "../../assets/images/invideo-ai-1080 Unlock Your Potential with EduJourney! 2024-06-15.mp4";

export default function Video() {
  const [Video, setVideo] = useRecoilState($Video);
  if (Video) {
    return (
      <div
        className="col-12 position-fixed d-flex justify-content-center align-items-center"
        id="Video"
        onClick={() => {
          setVideo(false);
        }}>
        <div
          className="col-10 position-absolute VideoCon"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <video
            src={video}
            autoplay="true"
            controls="true"
            className="col-12 h-100"
          />
        </div>
        <FontAwesomeIcon icon={faX} className=" position-absolute CloseMark" />
      </div>
    );
  }
}
