import { pages } from "../misc/constants";
import Page404 from "./404Page";
import Canvas from "./InProjectData/Canvas";
import Chat from "./InProjectData/Chat";
import CodeSpace from "./InProjectData/CodeSpace";
import ReadMePage from "./InProjectData/ReadMe";

const ProjectInView = ({ project, pageIndex }) => {

    const getContent = () => {
        switch (pageIndex) {
            case pages.Canvas: return <Canvas />
            case pages.Tasks:
            case pages.Events:
            case pages.References:
            case pages.Settings:
            case pages.ReadMe:
            default:
                return <Page404 />
        }
    }

    return (
        <div className="flex flex-col p-4 items-center w-full">
            <p className="text-4xl font-bold">{project.title}</p>
            {getContent()}
        </div>
    )
}

export default ProjectInView;