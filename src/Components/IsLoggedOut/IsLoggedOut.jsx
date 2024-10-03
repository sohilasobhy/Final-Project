import { useRecoilState } from "recoil";
import { $UserInfo, $loginCourseID } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IsLoggedOut({ children }) {
    const [user] = useRecoilState($UserInfo);
    let navigate = useNavigate();
    const [courseId] = useRecoilState($loginCourseID)

    useEffect(() => {
        if (user) {
            if (courseId != false) {
                console.log(courseId)
                navigate(`/single-course/${courseId}`)
            } else {
                console.log(courseId)
                navigate("/")
            }
        }
    }, [user]);

    return !user ? children : null;
}
