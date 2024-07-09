import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import AboutUs from "../Pages/AboutUs";
import Courses from "../Pages/Courses/Courses";
import SingleCourse from "../Pages/SingleCourse/SingleCourseDetails";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Categories from "../Pages/Categories/Categories";


const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout />,
        errorElement: <span>Error</span>,
        children: [
            {
                path: "/",
                element: <HomePage />
            }, {
                path: "/about",
                element: <AboutUs />,
            }, {
                path: "/courses",
                element: <Courses />
            }, {
                path: "/single-course/:id?",
                element: <SingleCourse />
            }, {
                path: "/one-category/:categorId",
                element: <Categories />
            }
        ],
    }, {
        path: "/login",
        element: <LoginPage />
    }
])
export default router;