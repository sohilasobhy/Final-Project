import "./ClientProfile.scss"
import { MdSlowMotionVideo } from "react-icons/md";
import { CiBookmark, CiLogout } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import userImg from "../../assets/images/user.png"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $UserInfo, $profile } from "../../Store/Store";
export default function ClientProfile() {
    const [user, setUser] = useRecoilState($UserInfo)
    const [profile, setProfile] = useRecoilState($profile)
    const navigate = useNavigate()
    console.log(user)
    if (profile) {
        return (
            <div className="bg-white position-fixed pb-3" id="client">
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
                    <div className="col-12 d-flex justify-content-center mt-4 rounded-1 subscribe">
                        <Link to={"/purchase"}
                            onClick={() => setProfile(false)}>Sucscribe</Link>
                    </div>
                </div>
                <div className="line col-12"></div>
                <div className="">
                    <Link to={"/progress"} className="d-flex align-items-center gap-2 item py-2 px-5"
                        onClick={() => setProfile(false)}
                    >
                        <MdSlowMotionVideo />
                        <p>My Progress</p>
                    </Link>
                    <Link to={"/wishlist"} className="d-flex align-items-center gap-2 item py-2 px-5 mt-3"
                        onClick={() => setProfile(false)}
                    >
                        <CiBookmark />
                        <p>Saved Courses</p>
                    </Link>
                    {/* <Link className="d-flex align-items-center gap-2 item mt-3 py-2 px-5">
                                <FaCertificate />
                                <p>Certificates</p>
                            </Link>
                            <Link className="d-flex align-items-center gap-2 item mt-3 py-2 px-5">
                                <IoMdSettings />
                                <p>Account Settings </p>
                            </Link> */}
                    {/* <Link to={"/messages"} className="d-flex align-items-center gap-2 item mt-3 py-2 px-5">
                        <TiMessages />
                        <p>Messages</p>
                    </Link> */}
                </div>
                <div className="line col-12"></div>
                <div className="py-3 px-5 item d-flex gap-2 align-items-center logout" onClick={() => {
                    navigate("/")
                    setProfile(false)
                    setUser(null)
                    localStorage.setItem('user', null)
                    sessionStorage.setItem('user', null)
                    toast.error("You are logged out")

                }}>
                    <CiLogout />
                    <p>Logout</p>
                </div>
            </div>
        )
    }
}
