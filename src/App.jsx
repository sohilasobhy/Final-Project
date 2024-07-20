import { BrowserRouter, Route, RouterProvider, Routes, useParams } from "react-router-dom";
import "animate.css";
import "animate.css";
import "aos/dist/aos.css";
import router from "./router/router.jsx";
export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
