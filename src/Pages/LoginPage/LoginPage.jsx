import { Link } from "react-router-dom"
import "./LoginPage.scss"
import loginphoto from "../../assets/images/3094352.jpg"
export default function LoginPage() {
    return (
        <div className="col-12" id="LoginPage">
            <div className="backgroundFilter"></div>
            <form action="post">
                <h2>Sign in</h2>
                <div className="inputBox">
                    <input type="text" required="required" />
                    <span>Username</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="password" required="required" />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className="links">
                    <Link to={"/"}>Forget password</Link>
                    <Link to={"/signup"} className="signup">Signup</Link>
                </div>
                <input type="submit" className="submitBTN" />
            </form>
            <div className="imgCon">
                <img src={loginphoto} className="col-12" />
            </div>
        </div>
    )
}
