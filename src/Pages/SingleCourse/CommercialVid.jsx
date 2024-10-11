import { useRecoilState } from "recoil";
import { $commercialVid } from "../../Store/Store";
export default function CommercialVid() {
    const [comVideo, setVideo] = useRecoilState($commercialVid);
    let content;
    if (comVideo.comVideo) {
        content = <video
            src={comVideo?.comVideo}
            autoplay="true"
            controls="true"
            className="col-12 h-100 rounded-2"
            onClick={(event) => {
                event.stopPropagation();
            }}
        />
    } else {
        content =
            <div>
                <h2 className="text-danger text-center my-5">There was an error, try again later</h2>
                <img height={500} src={`../../${comVideo.img}`} alt="" className="w-100 m-auto object-fit-cover rounded-2" />
            </div>
    }
    if (comVideo) {
        return (
            <div className="position-fixed fixed-top filter w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000000cc" }} onClick={() => {
                setVideo(false)
            }}>
                <div className="col-8 bg-white rounded-2 p-3">
                    {content}
                </div>
            </div>
        )
    }
}
