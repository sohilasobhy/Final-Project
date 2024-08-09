import ClientProfile from "./ClientProfile/ClientProfile";
import InstractourProfile from "./InstractourProfile/InstractourProfile";
import IsLoggedIn from "./IsLoggedIn/IsLoggedIn";

export default function Profile() {
    return (
        <IsLoggedIn>
            {/* <ClientProfile /> */}
            <InstractourProfile />
        </IsLoggedIn>
    )
}
