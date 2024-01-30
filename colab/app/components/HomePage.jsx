import { useState } from "react";

import Feed from "./Feed";
import SideBar from "./SideBar";
import { myProjects, projects } from "../misc/dummy";

const HomePage = ({ sessionToken, setSessionToken }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const getContent = () => {
        switch (pageIndex) {
            case 0:
                //feed projects
                return projects;
            case 1:
                // my projects
                return myProjects;
            default:
                return projects;
        }
    }

    return (
        <div className="h-screen flex justify-between">
            <SideBar sessionToken={sessionToken} setSessionToken={setSessionToken} pageIndex={pageIndex} setPageIndex={setPageIndex} />
            {
                <Feed content={getContent()} />
            }
        </div>
    )
}

export default HomePage;