import Events2 from "./Events2";
export default function Events() {
  return (
    <div
      className="col-12 d-flex flex-column align-items-center justify-content-center mt-5 px-5 pt-5"
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
        <div className="container">
          <div className="row g-5">
            <Events2 />
            <Events2 />
            <Events2 />
          </div>
        </div>
      </div>
    </div>
  );
}
