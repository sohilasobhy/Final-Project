import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import "animate.css";
import AboutUs from "./Pages/AboutUs/index.jsx";
import "animate.css";
import "aos/dist/aos.css";
export default function App() {
  return (
    <div className="col-12 App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
