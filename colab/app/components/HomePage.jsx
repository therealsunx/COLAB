import Feed from "./Feed";
import SideBar from "./SideBar";

const HomePage = ({ sessionToken, setSessionToken }) => {
    return (
        <div className="h-screen flex justify-between">
            <SideBar sessionToken={sessionToken} setSessionToken={setSessionToken} />
            <Feed />
        </div>
    )
}

export default HomePage;