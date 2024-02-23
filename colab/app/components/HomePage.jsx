import { useState } from "react";

import Feed from "./Feed";
import SideBar from "./SideBar";
import { myProjects, projects } from "../misc/dummy";
import ProjectInView from "./ProjectInView";

const HomePage = ({ sessionToken, setSessionToken }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [projectView, setProjectView] = useState(false);

    const [openProj, setOpenProj] = useState(null);

    const getContent = () => {
        if (pageIndex === 0) return projects; // db baata feed ko laagi projects fetch garerw return garne
        else if (pageIndex === 1) return myProjects; // fb baata user involve vako projects return garne
        else return openProj;
    }

    const onOpenProject = (project) => {
        setPageIndex(2);
        setProjectView(true);
        setOpenProj(project);
    }

    const updatePageIndex = (i) => {
        setPageIndex(i);
        if (i < 2) setProjectView(false);
    }

    return (
        <div className="h-screen flex justify-between">
            <SideBar
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
                pageIndex={pageIndex}
                updatePageIndex={updatePageIndex}
                projectView={projectView}
            />
            {
                projectView ? <ProjectInView project={openProj} pageIndex={pageIndex} />
                    : <Feed content={getContent()} onOpenProject={onOpenProject} />
            }
        </div>
    )
}

export default HomePage;