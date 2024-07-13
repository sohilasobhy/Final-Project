import HomeInstractor from "../HomePage/HomeInstractor";
import HomeReviews from "../HomePage/HomeReviews";
import Features from "./Features";
import Header from "./Header";
import Numbers from "./Numbers";
import Partners from "./Partners";
import WhyUs from "./WhyUs";
export default function index() {
  return (
    <div id="AboutPage">
      <Header />
      <Features />
      <Partners />
      <WhyUs />
      <HomeReviews />
      <Numbers />
      <div className="py-5">
        <HomeInstractor />
      </div>
    </div>
  )
}
