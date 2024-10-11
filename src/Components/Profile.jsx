import { useRecoilState } from "recoil";
import ClientProfile from "./ClientProfile/ClientProfile";
import InstractourProfile from "./InstractourProfile/InstractourProfile";
import IsLoggedIn from "./IsLoggedIn/IsLoggedIn";
import { $UserInfo } from "../Store/Store";
import AdminProfile from "./AdminProfile/AdminProfile";

export default function Profile() {
    const [userInfo] = useRecoilState($UserInfo)
    return (
        <IsLoggedIn>
            {
                userInfo?.role == "user" ? <ClientProfile />
                    : userInfo?.role == "instructor" ? <InstractourProfile />
                        : userInfo?.role == "admin" ? <AdminProfile />
                            : ""
            }
        </IsLoggedIn>
    )
}
