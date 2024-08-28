import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
export const LoginFunction = () => {
    const navigate = useNavigate()
    MySwal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Login first',
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        navigate("/login")
    }, 1500)
};
