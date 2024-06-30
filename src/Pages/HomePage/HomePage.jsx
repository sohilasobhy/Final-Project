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

export default function HomePage() {
  return (
    <div className="col-12 HomePage position-relative">
      <Search />
      <SideMenu />
      <Video />
      <NavBar />
      <HeroSection />
      <Features />
      <Categories />
      <Edges />
      <HomeCourses />
      <Stat />
      <HomeReviews />
      <GetInTouch />
      <HomeInstractor />
      <Add />
    </div>
  );
}
