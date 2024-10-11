import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
let intl = useIntl();
export const LoginFunction = () => {
    const navigate = useNavigate()
    MySwal.fire({
        position: 'center',
        icon: 'warning',
        title: intl.formatMessage({ id: 'pleaseLogin' }),
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        navigate("/login")
    }, 1500)
};
