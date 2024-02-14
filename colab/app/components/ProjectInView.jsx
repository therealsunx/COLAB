import { pages } from "../misc/constants";
import Page404 from "./404Page";
import Canvas from "./InProjectData/Canvas";
import Chat from "./InProjectData/Chat";
import CodeSpace from "./InProjectData/CodeSpace";
import ReadMePage from "./InProjectData/ReadMe";
import TasksPage from "./InProjectData/Tasks";

const ProjectInView = ({ project, pageIndex }) => {

    const getContent = () => {
        switch (pageIndex) {
            case pages.Canvas: return <Canvas />;
            case pages.ReadMe: return <ReadMePage project={project} />;
            case pages.CodeSpace: return <CodeSpace project={project} />;
            case pages.Chat: return <Chat />;
            case pages.Tasks: return <TasksPage project={project} />
            case pages.References:
            case pages.Settings:
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