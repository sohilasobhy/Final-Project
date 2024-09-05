import "./Index.scss"
import Menu from "./Menu";
import { Outlet, useNavigate } from "react-router-dom";
import AddCourseForm from "./AddCourseForm";
import AddReview from "./AddReview";
import AddCourseToHome from "./AddCourseToHome";
import AddInstructorToHome from "./AddInstructorToHome";
import AddNewCategory from "./AddNewCategory";
import { useRecoilState } from "recoil";
import { $UserInfo } from "../Store/Store";
import { useEffect } from "react";
import AddInstructorForm from "./AddInstructorForm";
export default function DashboardLayout() {
    const [userInfo] = useRecoilState($UserInfo)
    let navigate = useNavigate()
    console.log(userInfo)
    if (userInfo.role == "admin") {
        return (
            <div id="Dashboard" className="d-flex">
                <Menu />
                <AddCourseToHome />
                <AddCourseForm />
                <AddInstructorForm />
                <AddNewCategory />
                <AddInstructorToHome />
                <AddReview />
                <Outlet />
            </div>
        )
    } else {
        useEffect(() => {
            navigate("/")
        }, [])
    }

}
