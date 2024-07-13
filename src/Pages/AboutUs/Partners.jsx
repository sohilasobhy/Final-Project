import Partner1 from "../..//assets/images/brand-01.png";
import Partner2 from "../..//assets/images/brand-02.png";
import Partner3 from "../..//assets/images/brand-03.png";
import Partner4 from "../..//assets/images/brand-04.png";
import Partner5 from "../..//assets/images/brand-05.png";
import Partner6 from "../..//assets/images/brand-06.png";
export default function Partners() {
    return (
        <div className="d-flex justify-content-center align-items-center p-5 flex-wrap " id="aboutPartners">
            <div className="img1 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner1} alt="Partner1" />
            </div>
            <div className="img2 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner2} alt="Partner2" />
            </div>
            <div className="img3 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner3} alt="Partner3" />
            </div>
            <div className="img4 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner4} alt="Partner4" />
            </div>
            <div className="img5 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner5} alt="Partner5" />
            </div>
            <div className="img6 px-4 col-6 col-md-4 col-lg-2  d-flex justify-content-center align-items-center">
                <img src={Partner6} alt="Partner6" />
            </div>
        </div>
    )
}
