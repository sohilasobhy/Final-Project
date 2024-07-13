import NavBar from "../../Components/NavBar";
import Search from "../../Components/Search";
import SideMenu from "../../Components/SideMenu";
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
import Events from "./Events";
import Footer from "../../Components/Footer";
import CircleProgress from "../../Components/CircleProgress";

export default function HomePage() {
  return (
    <div className="col-12 HomePage position-relative">
      <SideMenu />
      <Video />
      <CircleProgress />
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
      <Events />
    </div>
  );
}
