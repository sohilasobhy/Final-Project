import Categories from "./Categories";
import Edges from "./Edges";
import Features from "./Features";
import HeroSection from "./HeroSection";
import Video from "./Video";
import "./HomePage.scss";
import HomeCourses from "./HomeCourses";
import Stat from "./Stat";
import HomeReviews from "./HomeReviews";
import GetInTouch from "./GetInTouch";
import HomeInstractor from "./HomeInstractor";
import Add from "./Add";
import Partners from "./Partners";

export default function HomePage() {
  return (
    <div className="col-12 HomePage position-relative">
      <Video />
      <HeroSection />
      <Features />
      <Edges />
      <Categories />
      <HomeCourses />
      <Stat />
      <HomeReviews number={"10%"} />
      <GetInTouch />
      <HomeInstractor />
      <Add />
      <Partners />
    </div>
  );
}
