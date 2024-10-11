import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";


export const showSuccessAlert = () => {
    toast.success(<FormattedMessage id="successPayment" />)
};
