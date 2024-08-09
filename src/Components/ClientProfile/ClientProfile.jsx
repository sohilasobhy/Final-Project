import "./ClientProfile.scss"
import { MdSlowMotionVideo } from "react-icons/md";
import { CiBookmark, CiLogout } from "react-icons/ci";
import { FaCertificate } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import user from "../../assets/images/user.png"
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $profile } from "../../Store/Store";
export default function ClientProfile() {
    return (
        <div className="bg-white position-fixed pb-3" id="client">
            <div className="d-flex flex-column align-items-center user px-5 pt-5 pb-4">
                <div className="d-flex gap-3 userInfo">
                    <img src={user} alt="user image" width={50} height={50} />
                    <div>
                        <p className="username">
                            username
                        </p>
                        <p className="email text-muted">
                            email@email.com
                        </p>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-4 rounded-1 subscribe">
                    <Link to={"/purchase"}>Sucscribe</Link>
                </div>
            </div>
            <div className="line col-12"></div>
            <div className="">
                <Link to={"/progress"} className="d-flex align-items-center gap-2 item py-2 px-5">
                    <MdSlowMotionVideo />
                    <p>My Progress</p>
                </Link>
                <Link to={"/wishlist"} className="d-flex align-items-center gap-2 item py-2 px-5 mt-3">
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
                <Link to={"/messages"} className="d-flex align-items-center gap-2 item mt-3 py-2 px-5">
                    <TiMessages />
                    <p>Messages</p>
                </Link>
            </div>
            <div className="line col-12"></div>
            <div className="py-3 px-5 item d-flex gap-2 align-items-center logout">
                <CiLogout />
                <p>Logout</p>
            </div>
        </div>
    )
}
