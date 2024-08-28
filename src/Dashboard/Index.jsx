import "./Index.scss"
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import AddCourseForm from "./AddCourseForm";
export default function DashboardLayout() {
    return (
        <div id="Dashboard" className="d-flex">
            <Menu />
            <AddCourseForm />
            <Outlet />
        </div>
    )
}
