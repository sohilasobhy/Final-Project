
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showSuccessAlert = () => {
    MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your payment was completed successfully',
        showConfirmButton: false,
        timer: 1500
    });
};
