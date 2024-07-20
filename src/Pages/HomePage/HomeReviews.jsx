import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/scrollbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RateStars } from "../RateStars/RateStars";
import quotation from "../../assets/images/quotation-right-mark.png";
import man from "../../assets/images/user.png";

export default function HomeReviews(props) {
  let navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [reviewer, setReviewer] = useState([]);
  console.log(reviewer)
  const sliceTextByWords = (text, start, end) => {
    const wordsArray = text.split(' ');
    const slicedArray = wordsArray.slice(start, end);
    return slicedArray.join(' ');
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/Users")
      .then((response) => {
        setReviewer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  // users

  useEffect(() => {
    axios
      .get("http://localhost:3000/Reviews")
      .then((response) => {
        setArray(response.data.slice(0, 4));
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  // Reviews

  function getImage(userId) {
    let x = reviewer.find((ele) => ele.id == userId);
    console.log(x);
    return x;
  }
  return (
    <div className="col-12 container py-5" id="HomeReviews" style={{ marginTop: props.number }}>
      <div className="col-12 d-flex justify-content-center flex-wrap gap-5">
        <div className="col-12 col-lg-4 d-flex flex-column gap-3 align-items-center align-items-lg-start">
          <h5>TESTIMONIALS</h5>
          <div className="d-flex flex-column align-items-center align-items-lg-start">
            <h2 className="col-12 text-center text-lg-start">What Our Students Have To Say</h2>
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
          <p className="studentsReviews text-center text-lg-start">
            Our students love the comprehensive and engaging courses we offer.
            Here's what they have to say about their learning experiences.
          </p>
          <div
            className="position-relative Browse d-flex justify-content-center col-6 mt-5"
            onClick={() => { navigate("/courses") }}>
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
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            loop={true}
            breakpoints={{
              786: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
            }}
          >
            {array?.map((review) => (
              <SwiperSlide className="col-6 d-flex flex-column gap-2 gap-lg-3 p-4" key={review.id}>
                <div className="position-relative col-12">
                  <img
                    src={getImage(review.userId)?.img ? getImage(review.userId)?.img : man}
                    alt="user image"
                    className="col-3 object-fit-cover reviewerImg"
                  />
                  <div className="bg-white firstLayer quotationCon">
                    <div className="secondLayer">
                      <img src={quotation} alt="" className="quotation" />
                    </div>
                  </div>
                </div>
                <div className="comment">
                  {review.comment}
                </div>
                <RateStars rate={review.rating} />
                <div className="name">
                  <p>{review.name}</p>
                </div>
                <div className="job">{review.Job}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
