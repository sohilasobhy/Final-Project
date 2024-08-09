import "./InstractourProfile.scss"
import { MdSlowMotionVideo } from "react-icons/md";
import { CiBookmark, CiLogout } from "react-icons/ci";
import user from "../../assets/images/user.png"
import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { useRecoilState } from "recoil";
import { $UserInfo, $profile } from "../../Store/Store";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InstractourProfile() {
    console.log("first")
    const [profile] = useRecoilState($profile)
    const [user, setUser] = useRecoilState($UserInfo)

    // const user = JSON.parse(localStorage.getItem(`user`))

    if (profile) {
        return (
            <div className="bg-white position-fixed pb-3" id="Insratcour">
                <div className="d-flex flex-column align-items-center user px-5 pt-5 pb-4">
                    <div className="d-flex gap-3 userInfo">
                        <img src={user?.img == "" ? user : user?.img} alt="user image" width={50} height={50} className=" rounded-5" />
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
                    {/* <Link to={"/progress"} className="d-flex align-items-center gap-2 item py-2 px-5">
                    <MdSlowMotionVideo />
                    <p>My Progress</p>
                </Link> */}
                    <Link to={"/wishlist"} className="d-flex align-items-center gap-2 item py-2 px-5 mt-3">
                        <CiBookmark />
                        <p>My Courses</p>
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
                <div className="py-3 px-5 item d-flex gap-2 align-items-center logout" onClick={() => {
                    localStorage.setItem('user', null)
                    sessionStorage.setItem('user', null)
                    setUser(null)
                }}>
                    <CiLogout />
                    <p>Logout</p>
                </div>
            </div>
        )
    }
}       