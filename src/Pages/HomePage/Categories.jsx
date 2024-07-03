import icon1 from "../../assets/images/project-manager.png";
import icon1Hov from "../../assets/images/project-manager(2).png";
import icon2 from "../../assets/images/vector.png";
import icon2Hov from "../../assets/images/vector(1).png";
import icon3 from "../../assets/images/web-programming.png";
import icon3Hov from "../../assets/images/web-programmingًWhite.png";
import icon4 from "../../assets/images/pill.png";
import icon4Hov from "../../assets/images/pill (1).png";
import icon5 from "../../assets/images/database.png";
import icon5Hov from "../../assets/images/database (1).png";
import icon6 from "../../assets/images/promotion.png";
import icon6Hov from "../../assets/images/promotion (1).png";
import icon7 from "../../assets/images/handshake.png";
import icon7Hov from "../../assets/images/handshake (1).png";
import icon8 from "../../assets/images/monitor.png";
import icon8Hov from "../../assets/images/monitor (1).png";
import icon9 from "../../assets/images/gallery.png";
import icon9Hov from "../../assets/images/gallery (1).png";

export default function Categories() {
  return (
    <div id="Categories" className="overflow-hidden">
      <div className="col-12 d-flex flex-column pt-5 justify-content-center align-items-center gap-4 topPart">
        <h2>Top Categories</h2>
        <div className="col-1">
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
        <p className="p-4 text-center">
          Explore a world of knowledge with courses across all disciplines and
          interests
        </p>
      </div>
      <div className="container">
        <div className="row courses p-5 g-5 justify-content-center flex-wrap">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon1} alt="" className="img1" />
              <img src={icon1Hov} alt="" className="img2" />
              <p>Business Management</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon2} alt="" className="img1" />
              <img src={icon2Hov} alt="" className="img2" />
              <p>Arts & Design</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon3} alt="" className="img1" />
              <img src={icon3Hov} alt="" className="img2" />
              <p>Arts & Design</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon4} alt="" className="img1" />
              <img src={icon4Hov} alt="" className="img2" />
              <p>Health and Fitness</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon5} alt="" className="img1" />
              <img src={icon5Hov} alt="" className="img2" />
              <p>Data Science</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon6} alt="" className="img1" />
              <img src={icon6Hov} alt="" className="img2" />
              <p>Arts & Design</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon7} alt="" className="img1" />
              <img src={icon7Hov} alt="" className="img2" />
              <p>Business & Finance </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon8} alt="" className="img1" />
              <img src={icon8Hov} alt="" className="img2" />
              <p>Computer Science </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex justify-content-start gap-2 align-items-center cat business-management col-12 h-100 py-3 ps-2">
              <img src={icon9} alt="" className="img1" />
              <img src={icon9Hov} alt="" className="img2" />
              <p>Video & Photography </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
