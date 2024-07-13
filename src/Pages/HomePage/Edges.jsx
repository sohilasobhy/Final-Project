import img1 from "../../assets/images/about-01.webp";
import img2 from "../../assets/images/check-mark.png";
import img3 from "../../assets/images/play-buttton.png";
import img3Hov from "../../assets/images/play-buttton (1).png";
import videoCon from "../../assets/images/videoCon.png";
import award from "../../assets/images/award.png";
import { useRecoilState } from "recoil";
import { $Video } from "../../Store/Store";

export default function Edges() {
  const [Video, setVideo] = useRecoilState($Video);

  return (
    <div className="col-12 mt-5 pt-5 position-relative" id="Edges">
      <div className="yellowCircle position-absolute d-none"></div>
      <div className=" my-md-5 py-md-5">
        <div className="d-flex justify-content-center flex-wrap gap-5">
          <div className="col-12 col-lg-5 d-flex justify-content-center position-relative ">
            <div className=" position-absolute videoCon d-none d-md-block ">
              <div className=" position-relative videoPause">
                <img src={videoCon} alt="" className="videoConImg" />
                <div
                  className=" position-absolute pause p-4 d-flex justify-content-end"
                  onClick={() => {
                    setVideo(true);
                  }}>
                  <img src={img3} alt="" className="ms-1 img3" />
                  <img src={img3Hov} alt="" className="ms-1 hovImg" />
                </div>
              </div>
            </div>
            <div className="animate__animated animate__bounceInDown position-absolute awards d-none d-md-flex align-items-center gap-3 bg-white justify-content-center p-3">
              <div className="p-3 awardCon">
                <img src={award} />
              </div>
              <div>
                <p className="numbers">29+</p>
                <p className="text">Wonderful Awards</p>
              </div>
            </div>
            <img src={img1} alt="" className=" img1 " />
          </div>
          <div className="col-12 col-lg-6">
            <div className=" d-flex flex-column justify-content-center gap-3 right py-5 px-5 px-lg-0">
              <p className="p1">About Us</p>
              <div className="col-10 d-flex flex-column gap-2">
                <h1>
                  Learn & Grow Your Skills From <span>Anywhere</span>
                </h1>
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
              <p className="p2 mb-3 mb-md-0">
                Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod
                ex tempor incididunt labore dolore magna aliquaenim minim veniam
                quis nostrud exercitation ullamco laboris.
              </p>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-start gap-2 align-content-center about">
                  <img src={img2} alt="" />
                  <p>Expert Trainers</p>
                </div>
                <div className="d-flex justify-content-start gap-2 align-content-center  about">
                  <img src={img2} alt="" />
                  <p>Online Remote Learning</p>
                </div>
                <div className="d-flex justify-content-start gap-2 align-content-center about">
                  <img src={img2} alt="" />
                  <p>Lifetime Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
