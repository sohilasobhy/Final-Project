import { useRecoilState } from "recoil"
import { $UserInfo } from "../../Store/Store"

export default function IsLoggedIn({ children }) {
    const [user, setUser] = useRecoilState($UserInfo)
    if (user == null) return null;
    return (children)
}
