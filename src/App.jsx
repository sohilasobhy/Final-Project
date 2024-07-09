import { BrowserRouter, Route, RouterProvider, Routes, useParams } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import "animate.css";
import AboutUs from "./Pages/AboutUs/index.jsx";
import "animate.css";
import "aos/dist/aos.css";
import Courses from "./Pages/Courses/Courses.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import SingleCourse from "./Pages/SingleCourse/SingleCourseDetails.jsx";
import Search from "./Components/Search.jsx";
import router from "./router/router.jsx";
export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <BrowserRouter> */}
      {/* <NavBar /> */}
      {/* <Search /> */}
      {/* <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/single-course/:id?" element={<SingleCourse />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes> */}
      {/* <Footer /> */}
      {/* </BrowserRouter> */}
    </div>
  );
}
