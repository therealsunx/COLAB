import Feed from "./Feed";
import SideBar from "./SideBar";

const HomePage = () => {
    return (
        <div className="h-screen flex justify-between">
            <SideBar />
            <Feed />
        </div>
    )
}

export default HomePage;