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
import CourseLessons from "../Pages/CourseLessons/Index";
import Purchase from "../Pages/Purchase/Purchase";
import Progress from "../Components/ClientProfile/Progress/Progress";
import SavedCourses from "../Components/ClientProfile/SavedCourses/SavedCourses";
// import Messages from "../Components/ClientProfile/Messages/Messages";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";
import InstructorsPage from "../Pages/Instructors/Instructors";
import IsLoggedOut from "../Components/IsLoggedOut/IsLoggedOut";
import Checkout from "../Pages/Checkout/Checkout";
import SingleInstructor from "../Pages/SingleInstructorPage/SingleInstructor";
import DashboardLayout from "../Dashboard/Index";
import Users from "../Dashboard/Users";
import IsLoggedIn from "../Components/IsLoggedIn/IsLoggedIn";
import HomePageDash from "../Dashboard/HomePage";
import AllCourses from "../Dashboard/AllCourses";
import CategoriesDash from "../Dashboard/Categories";
import ReviewsDash from "../Dashboard/Reviews";
import InstructorsDash from "../Dashboard/Instructors";
import MessagesDash from "../Dashboard/Messages";
import EditCourseForm from "../Pages/SingleCourse/test";
import InstructorCourses from "../Components/InstractourProfile/InstructorCourses";
import SubPlans from "../Dashboard/SubPlans";


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
            {
                path: "/progress",
                element: <Progress />
            },
            {
                path: "/wishlist",
                element: <SavedCourses />
            },
            {
                path: "/myCourses",
                element: <InstructorCourses />
            },
            {
                path: "/forget-password",
                element: <ForgetPassword />
            },
            {
                path: "/Instructors",
                element: <InstructorsPage />
            },
            {
                path: "/Instructor/:instructorId",
                element: <SingleInstructor />
            },
            {
                path: "/test",
                element: <EditCourseForm />
            },
        ],
    }, {
        path: "/login",
        element: <IsLoggedOut><LoginPage /></IsLoggedOut>
    }, {
        path: "/signup",
        element: <SignUp />
    }, {
        path: "/lessons/:courseId",
        element: <CourseLessons />
    }, {
        path: "/dashboard",
        element: <IsLoggedIn><DashboardLayout /></IsLoggedIn>,
        children: [
            {
                path: "users",
                element: <Users />
            },
            {
                path: "Home-page",
                element: <HomePageDash />
            },
            {
                path: "All-courses",
                element: <AllCourses />
            },
            {
                path: "Categories",
                element: <CategoriesDash />
            },
            {
                path: "Reviews",
                element: <ReviewsDash />
            },
            {
                path: "instructors",
                element: <InstructorsDash />
            },
            {
                path: "messages",
                element: <MessagesDash />
            },
            {
                path: "subPlans",
                element: <SubPlans />
            }
        ],
    }, {
        path: "/checkout",
        element: <Checkout />
    },
])
export default router;
