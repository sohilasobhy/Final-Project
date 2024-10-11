import { RouterProvider } from "react-router-dom";
import "animate.css";
import "animate.css";
import "aos/dist/aos.css";
import router from "./router/router.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { $Language } from "./Store/Store.js";
import { IntlProvider } from "react-intl";
import { messages } from "./Languages/Meassages.js";
import { useEffect } from "react";
export default function App() {
  const [language, setLanguage] = useRecoilState($Language);
  const lang = localStorage.getItem("lang") || "ltr";
  const locale = lang == "ltr" ? "EN" : "AR";
  const translation = messages[locale];
  useEffect(() => {
    document.documentElement.dir = lang;
    setLanguage(locale)
  }, [])
  return (
    <div className="App">
      <IntlProvider locale={locale} messages={translation} defaultLocale='EN'>
        <ToastContainer autoClose={1500} position="top-right" />
        <RouterProvider router={router} />
      </IntlProvider>

    </div>
  );
}
