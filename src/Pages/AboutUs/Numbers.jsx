import student from "../../assets/images/read.png"
import instructor from "../../assets/images/speech.png"
import like from "../../assets/images/like.png"
import classIcon from "../../assets/images/presentation.png"
import Counter from "../HomePage/Counter"
export default function Numbers() {
    return (
        <div className="container py-5" id="Numbers">
            <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                        <div className="p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#e8f8f5", borderRadius: "50%" }}>
                            <img src={student} alt="student" />
                        </div>
                        <h2 className="d-flex">
                            <Counter initialCount={0} targetValue={29} incrementValue={1} updateInterval={30} duration={2000} />.<Counter initialCount={0} targetValue={3} incrementValue={1} updateInterval={100} duration={2000} />K
                        </h2>
                        <p>STUDENT ENROLLED</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                        <div className="p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(255 238 238)", borderRadius: "50%" }}>
                            <img src={classIcon} alt="class" />
                        </div>
                        <h2 className="d-flex">
                            <Counter initialCount={0} targetValue={32} incrementValue={1} updateInterval={30} duration={2000} />.<Counter initialCount={0} targetValue={4} incrementValue={1} updateInterval={100} duration={2000} />K
                        </h2>
                        <p>CLASS COMPLETED</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                        <div className="p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(236 239 252)", borderRadius: "50%" }}>
                            <img src={like} alt="like" />
                        </div>
                        <h2 className="d-flex">
                            <Counter initialCount={0} targetValue={100} incrementValue={10} updateInterval={30} duration={2000} />%
                        </h2>
                        <p>SATISFACTION RATE</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 contentCon">
                        <div className="p-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(254 244 233)", borderRadius: "50%" }}>
                            <img src={instructor} alt="instructor" />
                        </div>
                        <h2 className="d-flex">
                            <Counter initialCount={0} targetValue={354} incrementValue={30} updateInterval={30} duration={2000} />+
                        </h2>
                        <p>TOP INSTRUCTORS</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
