import Invest from "./Invest";
import Payment from "./Payment";
import Plans from "./Plans";
import "./Purchase.scss"
export default function Purchase() {
    return (
        <div id="Purchase" className="py-5 px-2 d-flex flex-column justify-content-center align-items-center overflow-hidden">
            <Invest />
            <Plans />
            <Payment />
        </div>
    )
}
