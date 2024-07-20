import { useRecoilState } from "recoil";
import { $lessonData } from "../../Store/Store";

export default function Content() {
    const [lessonData, setLessonData] = useRecoilState($lessonData)
    console.log(lessonData)
    return (
        <div className="d-flex flex-column align-items-center col-12 col-lg-8" id="Content">
            <h2 className="py-4">{lessonData?.LessonName}</h2>
            <p>{lessonData?.desc}</p>
            <video
                src={`../../${lessonData?.Link}`}
                controls="true"
                className="col-10 rounded-2"
            />
        </div>
    )
}
