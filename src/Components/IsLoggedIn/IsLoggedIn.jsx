import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IsLoggedIn({ children }) {
    const [user] = useRecoilState($UserInfo)
    const navigate = useNavigate()
    // حسبي الله 
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])


    return (user ? children : "")
}
