import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IsLoggedIn({ children }) {
    const [user] = useRecoilState($UserInfo)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])
    // const [user] = useRecoilState($UserInfo)
    // if (user == null) return null;
    // return (children)

    return (user ? children : "")
}
