import Feed from "@/src/components/Feed";
import { myProjects, projects } from "@/src/misc/dummy";

const MyProjects = () => {
    return (
        <div className="h-screen flex justify-between">
            <Feed content={projects.filter(p => myProjects.find(x => x === p.id))} />
        </div>
    )
}

export default MyProjects;