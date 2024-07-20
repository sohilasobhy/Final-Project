import Invest from "./Invest";
import Plans from "./Plans";

export default function Purchase() {
    return (
        <div id="Purchase" className="p-5 d-flex flex-column justify-content-center align-items-center">
            <Invest />
            <Plans />
        </div>
    )
}
