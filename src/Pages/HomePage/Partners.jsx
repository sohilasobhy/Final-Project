import collage1 from "../../assets/images/brand-01.png";
import collage2 from "../../assets/images/brand-02.png";
import collage3 from "../../assets/images/brand-03.png";
import collage4 from "../../assets/images/brand-04.png";
import collage5 from "../../assets/images/brand-05.png";
import collage6 from "../../assets/images/brand-06.png";
import collage7 from "../../assets/images/brand-07.png";
import collage8 from "../../assets/images/brand-08.png";
export default function Partners() {
  return (
    <div
      className="col-12 d-flex justify-content-center gap-5 flex-column flex-lg-row p-5"
      id="Partners">
      <div className="col-12 col-lg-5 d-flex flex-column gap-3">
        <p className="header">OUR PARTNERS</p>
        <h2 className="col-12 col-lg-8">Learn with Our Partners</h2>
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
        <p className="contant col-12 col-lg-10">
          We collaborate with top universities and educational organizations to
          bring you the best learning experience. Our partners are renowned for
          their academic excellence and commitment to quality education. Join us
          and take advantage of their expertise to enhance your skills and
          knowledge.
        </p>
      </div>
      <div className="col-12 col-lg-6 d-flex flex-wrap justify-content-center">
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage1} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage2} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage3} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage4} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage5} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage6} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage7} alt="" />
        </div>
        <div className="col-6 col-md-3 p-3 d-flex justify-content-center">
          <img src={collage8} alt="" />
        </div>
      </div>
    </div>
  );
}
