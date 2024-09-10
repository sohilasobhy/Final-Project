import "./AdminProfile.scss"
import { MdSlowMotionVideo } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import userImg from "../../assets/images/user.png"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $UserInfo, $profile } from "../../Store/Store";
import { toast } from "react-toastify";
export default function AdminProfile() {
    const [user, setUser] = useRecoilState($UserInfo)
    const [profile, setProfile] = useRecoilState($profile)
    const navigate = useNavigate()
    console.log(user?.img)
    if (profile) {
        return (
            <div className="bg-white position-fixed pb-3" id="Admin">
                <div className="d-flex flex-column align-items-center user px-5 pt-5 pb-4">
                    <div className="d-flex gap-3 userInfo">
                        <img src={`../${user?.img ? user?.img : userImg}`} alt="user image" width={50} height={50} className=" object-fit-cover" />
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
                <div className="">
                    <Link to={"/dashboard/Home-page"} className="d-flex align-items-center gap-2 item py-2 px-5" onClick={() => setProfile(false)}>
                        <MdDashboard />
                        <p>Dashboard</p>
                    </Link>
                </div>
                <div className="line col-12"></div>
                <div className="py-3 px-5 item d-flex gap-2 align-items-center logout" onClick={() => {
                    navigate("/")
                    setProfile(false)
                    localStorage.setItem('user', null)
                    sessionStorage.setItem('user', null)
                    toast.error("You are logged out")
                    setUser(null)
                }}>
                    <CiLogout />
                    <p>Logout</p>
                </div>
            </div>
        )
    }
}
