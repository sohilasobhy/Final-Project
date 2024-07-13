import { Link } from "react-router-dom"
import "./SignUp.scss"
import signUp from "../../assets/images/Graduation-rafiki.png"
export default function SignUp() {
    return (
        <div>
            <div className="col-12" id="SignUp">
                <div className="backgroundFilter"></div>
                <div className="imgCon">
                    <img src={signUp} className="col-12" />
                </div>
                <form action="post">
                    <h2>Sign Up</h2>
                    <div className="d-flex flex-column mt-4 imageInput">
                        <span>Upload your image</span>
                        <input type="file" required="required" className="mt-4 " accept="image/*" />
                    </div>
                    <div className="inputBox userName">
                        <input type="text" required="required" />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password" required="required" />
                        <span>Re-Enter password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <Link to={"/login"} className="signup">Login</Link>
                    </div>
                    <input type="submit" className="submitBTN" />
                </form>

            </div >
        </div >
    )
}
