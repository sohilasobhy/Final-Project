import Menu from "./Menu";
import "./Index.scss"
import HomePage from "./HomePage";
import AllCourses from "./AllCourses";
import Categories from "./Categories";
import Reviews from "./Reviews";
import Instructors from "./Instructors";
import Users from "./Users";
export default function Dashboard() {
    return (
        <div id="Dashboard" className="d-flex">
            <Menu />
            {/* <HomePage /> */}
            {/* <AllCourses /> */}
            {/* <Categories /> */}
            {/* <Reviews /> */}
            {/* <Instructors /> */}
            <Users/>
        </div>
    )
}
