import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import AboutUs from "../Pages/AboutUs";
import Courses from "../Pages/Courses/Courses";
import SingleCourse from "../Pages/SingleCourse/SingleCourseDetails";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Categories from "../Pages/Categories/Categories";
import SignUp from "../Pages/Sign up/SignUp";
import ContactUs from "../Pages/ContactUs/ContactUs";
import LessonsList from "../Pages/CourseLessons/LessonsList";
import CourseLessons from "../Pages/CourseLessons/Index";
import Purchase from "../Pages/Purchase/Purchase";


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
            }, {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/Purchase",
                element: <Purchase />
            },
        ],
    }, {
        path: "/login",
        element: <LoginPage />
    }, {
        path: "/signup",
        element: <SignUp />
    }, {
        path: "/lessons/:courseId",
        element: <CourseLessons />
    },
])
export default router;
