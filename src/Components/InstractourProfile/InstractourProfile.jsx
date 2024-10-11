import "./InstractourProfile.scss"
import { CiBookmark, CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $UserInfo, $profile } from "../../Store/Store";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

export default function InstractourProfile() {
    const [profile, setProfile] = useRecoilState($profile)
    const [user, setUser] = useRecoilState($UserInfo)
    const navigate = useNavigate()
    if (profile) {
        return (
            <div className="bg-white position-fixed pb-3" id="Insratcour">
                <div className="d-flex flex-column align-items-center user px-5 pt-5 pb-4">
                    <div className="d-flex gap-3 userInfo">
                        <img src={user?.img == "" ? user : `../${user?.img}`} alt="user image" width={50} height={50} className="rounded-5 object-fit-cover" />
                        <div>
                            <p className="username">
                                {user?.name}
                            </p>
                            <p className="email text-muted">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="line col-12"></div>
                <div>
                    <Link to={"/myCourses"} className="d-flex align-items-center gap-2 item py-2 px-5 mt-3" onClick={() => setProfile(false)}>
                        <CiBookmark />
                        <p><FormattedMessage id="myCourses" /></p>
                    </Link>
                </div>
                <div className="line col-12"></div>
                <div className="py-3 px-5 item d-flex gap-2 align-items-center logout" onClick={() => {
                    setProfile(false)
                    navigate("/")
                    localStorage.setItem('user', null)
                    sessionStorage.setItem('user', null)
                    setUser(null)
                    toast.error(<FormattedMessage id="loggedOut" />)

                }}>
                    <CiLogout />
                    <p><FormattedMessage id="logout" /></p>
                </div>
            </div >
        )
    }
}       