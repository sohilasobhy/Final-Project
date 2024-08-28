import { BrowserRouter, Route, RouterProvider, Routes, useParams } from "react-router-dom";
import "animate.css";
import "animate.css";
import "aos/dist/aos.css";
import router from "./router/router.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1500} position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}
