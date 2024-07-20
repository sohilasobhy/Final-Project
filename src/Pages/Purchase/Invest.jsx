import { FaCheck } from "react-icons/fa6";
export default function Invest() {
    return (
        <div className="d-flex flex-column align-items-center gap-4">
            <h2>Invest in yourself</h2>
            <div className='d-flex flex-wrap justify-content-center col-12 gap-2'>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p>More than 1,000 video courses.</p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p>Unlimited access to all courses on web and Android app.</p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p>Taught by renowned experts in the Arab world.</p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p>Certificates upon courses completion.</p></div>
            </div>
        </div>
    )
}
