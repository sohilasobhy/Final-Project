import LessonsList from "./LessonsList";
import "./Index.scss"
import Content from "./Content";
import NavBarLogin from "../../Components/NavBarLogin";
export default function CourseLessons() {
    return (
        <>
            <NavBarLogin />
            <div id="CourseLessons" className="d-flex flex-column flex-lg-row">
                <LessonsList />
                <Content />
            </div>
        </>
    )
}
