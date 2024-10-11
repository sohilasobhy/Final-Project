import { FaCheck } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
export default function Invest() {
    return (
        <div className="d-flex flex-column align-items-center gap-4">
            <h2><FormattedMessage id="invest" /></h2>
            <div className='d-flex flex-wrap justify-content-center col-12 gap-2'>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p><FormattedMessage id="more" /></p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p><FormattedMessage id="unlimited" /></p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p><FormattedMessage id="taught" /></p></div>
                <div className="d-flex gap-2 align-items-center col-12 col-md-5 col-lg-4"><FaCheck /><p><FormattedMessage id="complation" /></p></div>
            </div>
        </div>
    )
}
