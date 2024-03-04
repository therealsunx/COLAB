'use client';

import { useState } from "react";
import { Search, User } from "lucide-react";
import { buttons, cards } from "../misc/styles";

import Link from "next/link";

const FeedProjectCard = ({ project, onClick, className }) => {

    return (
        <div className={`flex flex-col items-center ${className}`} onClick={onClick}>
            <p className="font-bold px-4 py-2">{project.name}</p>
            <p className="px-4 py-2">{project.intro}</p>

            {/* <div className="p-4 flex w-full justify-between">
                <div className="flex gap-2">
                    <EyeIcon className={buttons.mini} />
                    {project.impressions}
                </div>
                <div className="flex gap-2">
                    {project.upvotes}
                    <ChevronsUp className={buttons.mini} />
                </div>
            </div> */}
        </div>
    )
}

const ProjectDetailCard = ({ project, currentUser }) => {

    const onProjectWork = () => {
        const involved = project.members.find(x => x === currentUser.uid);
        if (involved) {
            console.log(project);
            window.location.href = `/${project.id}`;
        } else {
            // fetch the applicants data of the project
            // check if user id is in applicants list
            // if it is, alert (decision pending)
            // else alert(successfully applied)
        }
    }

    return (
        <>
            {/* <div className="flex w-full items-center justify-between">
                <div className="flex gap-2">
                    <EyeIcon className={buttons.mini} />
                    {project?.impressions || "___"}
                </div>
                <div className="flex gap-2">
                    {project?.upvotes || "___"}
                    <ChevronsUp className={buttons.mini} />
                </div>
            </div> */}

            <p className="text-4xl p-6 font-bold border-b-2">{project.name}</p>
            <p className="text-md p-6 font-semibold border-b-2">{project.intro}</p>
            <p className="text-sm px-2 py-6 text-left font-semibold">{project.detail}</p>

            <div className="flex flex-col gap-2 text-center py-4 border-y-2 w-full">
                <p className="text-2xl font-bold p-3">Skills</p>
                <div className="flex flex-wrap justify-center gap-4 py-4">
                    {project.skills.map((s, i) => (
                        <p className="px-8 py-3 border-2 shadow-xl rounded-xl hover:bg-[#fffa] hover:text-black" key={i}>{s}</p>
                    ))}
                </div>
            </div>
            <button className={`mt-6 px-6 py-3 border-2 ${buttons.bulb}`} onClick={onProjectWork}>Work On Project</button>
        </>
    )
}

const Feed = ({ userData, auth, content }) => {
    const [viewed, setViewed] = useState(0);
    const [searchPrmpt, setSearchPrmpt] = useState("");

    const startSearch = () => {
        setViewed(0);
        console.log("Searching for : ", searchPrmpt);
    }

    const getIndex = () => {
        if (viewed < content?.length) return viewed;
        setViewed(0);
        return 0;
    }

    const getAccountLink = () => {
        if (!userData) return "/";
        if (auth && auth.uid === userData.uid)
            return "/account";
        return `/account/${userData.uid}`;
    }

    return (
        <div className="flex justify-end gap-6 p-8 w-full">

            <div className="flex flex-col flex-1 tems-center p-8 border-2 rounded-2xl">

                <div className="flex justify-between w-full gap-8 mb-12">
                    {<Link href={getAccountLink()} className="flex items-center gap-2">
                        <User className={buttons.icon} />
                        <p className="w-max">{userData?.name || "guestuser"}</p>
                    </Link>}

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

                {content && <div className="bg-[#fff3] flex flex-col w-full h-full gap-4 p-6 rounded-l-2xl overflow-y-scroll">
                    {content.map((p, i) => p && <FeedProjectCard project={p} key={i} onClick={() => setViewed(i)} className={viewed === i ? cards.active : cards.projectFeed} />)}
                </div>}
            </div>
            <div className="flex flex-col flex-1 gap-4 h-full items-center bg-[#6666] border-2 p-8 rounded-l-2xl rounded-r-md overflow-auto">
                {content && <ProjectDetailCard project={content[getIndex()]} currentUser={auth} />}
            </div>
        </div>
    )
}

export default Feed;