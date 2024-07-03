import background from "../../assets/images/cta-bg-imgae-07.png";
export default function GetInTouch() {
  return (
    <div
      className="col-12 d-flex justify-content-center p-5 mt-5 overflow-hidden"
      id="GetInTouch">
      <div className="col-12 col-lg-8 contact d-flex justify-content-center flex-column flex-lg-row align-items-center gap-3 gap-lg-5 p-5 position-relative">
        <p className="left">
          Get In Touch: <br /> <span>info@eduJourney</span>
        </p>
        <div className="middle">
          <p>Or</p>
        </div>
        <p className="right">
          Call Us Via <br /> <span>+01123564182</span>
        </p>
        <img src={background} alt="" className="position-absolute" />
      </div>
    </div>
  );
}
