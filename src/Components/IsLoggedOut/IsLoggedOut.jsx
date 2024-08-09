import { useRecoilState } from "recoil";
import { $UserInfo } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IsLoggedOut({ children }) {
    const [user, setUser] = useRecoilState($UserInfo);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return !user ? children : null;
}
