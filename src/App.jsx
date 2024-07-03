import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import "animate.css";
import AboutUs from "./Pages/AboutUs/index.jsx";
import "animate.css";
import "aos/dist/aos.css";
import Courses from "./Pages/Courses/Courses.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
export default function App() {
  return (
    <div className="col-12 App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="courses" element={<Courses />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
