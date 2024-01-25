import { useState } from "react";
import { ChevronsUp, EyeIcon, Search } from "lucide-react";
import { projects } from "../misc/dummy";

const FeedProjectCard = ({ project, onClick, className }) => {

    return (
        <div className={`flex flex-col items-center p-4 rounded-2xl border-2 bg-black ${className}`} onClick={onClick}>
            <p className="font-bold px-4 py-2">{project.title}</p>
            <p className="px-4 py-2">{project.description}</p>

            <div className="p-4 flex w-full justify-between">
                <div className="flex gap-2">
                    <EyeIcon className="hover:text-secondary hover:-translate-y-1 hover:scale-125 duration-300 cursor-pointer" />
                    {project.impressions}
                </div>
                <div className="flex gap-2">
                    {project.upvotes}
                    <ChevronsUp className="hover:text-secondary hover:-translate-y-1 hover:scale-125 duration-300 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

const ProjectDetailCard = ({ project }) => {
    return (
        <div className="flex flex-col items-center text-center border-2 p-8 w-1/3 rounded-2xl overflow-auto">
            <div className="flex w-full items-center justify-between">
                <div className="flex gap-2">
                    <EyeIcon className="hover:text-secondary hover:-translate-y-1 hover:scale-125 duration-300 cursor-pointer" />
                    {project.impressions}
                </div>
                <div className="flex gap-2">
                    {project.upvotes}
                    <ChevronsUp className="hover:text-secondary hover:-translate-y-1 hover:scale-125 duration-300 cursor-pointer" />
                </div>
            </div>
            <p className="text-4xl p-6 font-bold">{project.title}</p>
            <p className="text-md p-2 font-semibold ">{project.description}</p>
            <p className="text-sm px-2 py-6 text-left font-semibold">{project.readme}</p>

            <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold p-3">Skills</p>
                <div className="flex flex-wrap gap-4 py-4">
                    {project.skills.split(';').map((s, i) => (
                        <p className="px-8 py-3 border-2 shadow-xl rounded-xl hover:shadow-primary">{s}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Feed = () => {
    const [viewed, setViewed] = useState(0);
    const [searchPrmpt, setSearchPrmpt] = useState("");

    const startSearch = () => {
        setViewed(0);
        console.log("Searching for : ", searchPrmpt);
    }

    return (
        <div className="flex justify-end gap-2 p-8">

            <div className="flex flex-col items-center p-8 border-2 rounded-2xl">
                <div className="flex justify-center w-full gap-2 mb-12">
                    <input
                        type="text"
                        value={searchPrmpt}
                        placeholder="Search"
                        onChange={e => setSearchPrmpt(e.target.value)}
                        onKeyDown={startSearch}
                        className="px-8 py-2 rounded-full text-zinc-600 outline-none"
                    />
                    <Search className="bg-black hover:invert rounded-full p-2 w-10 h-10" onClick={startSearch} />
                </div>

                <div className="bg-[#fff3] flex flex-col gap-4 p-6 rounded-2xl overflow-y-auto">
                    {projects.map((p, i) => <FeedProjectCard project={p} key={i} onClick={() => setViewed(i)} className={(viewed === i) && "bg-primary"} />)}
                </div>
            </div>

            <ProjectDetailCard project={projects[viewed]} />
        </div>
    )
}

export default Feed;