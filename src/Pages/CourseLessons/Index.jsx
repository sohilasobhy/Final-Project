import LessonsList from "./LessonsList";
import "./Index.scss"
import Content from "./Content";
export default function CourseLessons() {
    return (
        <div id="CourseLessons" className="d-flex flex-column flex-lg-row">
            <LessonsList />
            <Content />
        </div>
    )
}
