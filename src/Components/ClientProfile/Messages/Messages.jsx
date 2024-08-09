import "./Messages.scss"
import messages from "../../../assets/images/Sent Message-bro.png"
export default function Messages() {
    return (
        <div className="p-5 d-flex flex-column align-items-center gap-4" id="Messages">
            <img src={messages} alt="" width={300} />
            <p className="fs-4 fw-bold">You have no messages!</p>
        </div>
    )
}
