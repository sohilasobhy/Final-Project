import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/scrollbar";
import man from "../../assets/images/testimonial-02.png";
import stars from "../../assets/images/rating.png";
import quotation from "../../assets/images/quotation-right-mark.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function HomeReviews() {
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Reviews")
      .then((response) => {
        setArray(response.data);
        console.log(array);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div className="col-12 container py-5" id="HomeReviews">
      <div className="col-12 d-flex justify-content-center flex-wrap gap-5">
        <div className="col-12 col-lg-4 d-flex flex-column gap-3">
          <h5>TESTIMONIALS</h5>
          <div>
            <h2 className="col-11">What Our Students Have To Say</h2>
            <div className="col-3 mt-1">
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
          <p className="studentsReviews">
            Our students love the comprehensive and engaging courses we offer.
            Here's what they have to say about their learning experiences.
          </p>
          <div className="position-relative Browse d-flex justify-content-center col-6 mt-5">
            <button className="d-flex align-items-center gap-3 btn">
              <p>
                View All <FontAwesomeIcon icon={faArrowRight} />
              </p>
            </button>
            <div className="position-absolute BTNFilter"></div>
          </div>
        </div>
        <div className="col-12 col-lg-7 slider p-2 h-100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={2}
            autoplay={{ delay: 5000 }}
            loop={true}>
            {array.map((course, index) => {
              return (
                <SwiperSlide
                  className="col-6 h-100 d-flex flex-column gap-3 p-4"
                  key={course.id}>
                  <div className="position-relative col-12">
                    <img
                      src={man}
                      alt=""
                      className="col-3 object-fit-cover reviewerImg"
                    />
                    <div className="bg-white firstLayer quotationCon">
                      <div className="secondLayer">
                        <img src={quotation} alt="" className="quotation" />
                      </div>
                    </div>
                  </div>
                  <div className="comment">{course.comment}</div>
                  <img src={stars} alt="" className="col-6" />
                  <div className="name">
                    <p>{course.name}</p>
                  </div>
                  <div className="job">{course.Job}</div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
