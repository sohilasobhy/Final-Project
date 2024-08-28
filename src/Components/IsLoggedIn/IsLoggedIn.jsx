import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function IsLoggedIn({ children }) {
    const [user] = useRecoilState($UserInfo)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            toast.error("please login first")
            navigate("/")
        }
    }, [user])


    return (user ? children : "")
}
