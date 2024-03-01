'use client';

import { useContext, useState } from "react";
import { ChevronsUp, EyeIcon, Search, User } from "lucide-react";
import { buttons, cards } from "../misc/styles";
import { myProjects } from "../misc/dummy";
import { AuthContext } from "./AuthContext";
import Link from "next/link";

const FeedProjectCard = ({ project, onClick, className }) => {

    return (
        <div className={`flex flex-col items-center ${className}`} onClick={onClick}>
            <p className="font-bold px-4 py-2">{project.title}</p>
            <p className="px-4 py-2">{project.description}</p>

            <div className="p-4 flex w-full justify-between">
                <div className="flex gap-2">
                    <EyeIcon className={buttons.mini} />
                    {project.impressions}
                </div>
                <div className="flex gap-2">
                    {project.upvotes}
                    <ChevronsUp className={buttons.mini} />
                </div>
            </div>
        </div>
    )
}

const ProjectDetailCard = ({ project }) => {

    const onProjectWork = () => {
        let isInvolved = myProjects.find(v => v === project.id); // fetch if userid is present at the member list of the project

        if (isInvolved) {
            window.location.href = "/" + project.id; // pass the project's id
        } else {
            window.location.href = "/apply/" + project.id;
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center bg-[#6666] border-2 p-8 w-1/2 rounded-l-2xl rounded-r-md overflow-auto">
            <div className="flex w-full items-center justify-between">
                <div className="flex gap-2">
                    <EyeIcon className={buttons.mini} />
                    {project?.impressions || "___"}
                </div>
                <div className="flex gap-2">
                    {project?.upvotes || "___"}
                    <ChevronsUp className={buttons.mini} />
                </div>
            </div>

            <p className="text-4xl p-6 font-bold border-b-2">{project?.title || "______"}</p>
            <p className="text-md p-6 font-semibold border-b-2">{project?.description || "______"}</p>
            <p className="text-sm px-2 py-6 text-left font-semibold">{project?.readme || "______"}</p>

            <div className="flex flex-col gap-2 border-y-2 py-4 rounded-t-xl">
                <p className="text-2xl font-bold p-3">Skills</p>
                <div className="flex flex-wrap gap-4 py-4">
                    {project && project.skills.split(';').map((s, i) => (
                        <p className="px-8 py-3 border-2 shadow-xl rounded-xl hover:bg-white hover:text-black" key={i}>{s}</p>
                    ))}
                </div>
            </div>
            <button className={`mt-6 px-6 py-3 ${buttons.bulb}`} onClick={onProjectWork}>Work On Project</button>
        </div>
    )
}

const Feed = ({ user, content }) => {
    const [viewed, setViewed] = useState(0);
    const [searchPrmpt, setSearchPrmpt] = useState("");

    const startSearch = () => {
        setViewed(0);
        console.log("Searching for : ", searchPrmpt);
    }

    const getIndex = () => {
        if (viewed < content.length) return viewed;
        setViewed(0);
        return 0;
    }

    return (
        <div className="flex justify-end gap-6 p-8 w-full">

            <div className="flex flex-col w-1/2 items-center p-8 border-2 rounded-2xl">

                <div className="flex justify-between w-full gap-2 mb-12">
                    <Link href="/account" className="flex items-center gap-4">
                        <User className={buttons.icon} />
                        <p className="w-max">{user?.displayName || "guestuser"}</p>
                    </Link>

                    <div className="flex">
                        <input
                            type="text"
                            value={searchPrmpt}
                            placeholder="Search"
                            onChange={e => setSearchPrmpt(e.target.value)}
                            onKeyDown={startSearch}
                            className="px-8 py-2 rounded-l-full text-zinc-600 outline-none"
                        />
                        <Search className={buttons.semicon} onClick={startSearch} />
                    </div>
                </div>

                {content && <div className="bg-[#fff3] flex flex-col w-full gap-4 p-6 rounded-l-2xl overflow-y-scroll">
                    {content.map((p, i) => <FeedProjectCard project={p} key={i} onClick={() => setViewed(i)} className={viewed === i ? cards.active : cards.projectFeed} />)}
                </div>}
            </div>

            <ProjectDetailCard project={content ? content[getIndex()] : null} />
        </div>
    )
}

export default Feed;