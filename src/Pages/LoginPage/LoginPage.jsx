import { Link } from "react-router-dom"
import "./LoginPage.scss"
export default function LoginPage() {
    return (
        <div className="col-12" id="LoginPage">
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
                    <Link to={"/"} className="signup">Signup</Link>
                </div>
                <input type="submit" className="submitBTN" />
            </form>
        </div>
    )
}
