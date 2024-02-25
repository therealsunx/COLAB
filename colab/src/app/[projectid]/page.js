'use client';

import { projects } from "@/src/misc/dummy";
import { ChevronsUpIcon, EyeIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { buttons } from "@/src/misc/styles";

export default function Project() {

    const params = useParams();
    const project = projects.find(x => x.id === params.projectid);

    return (
        <div className="w-full flex flex-col items-center p-8">

            <p className="text-4xl font-bold">{project.title}</p>

            <div className="flex w-full items-center justify-between">
                <div className="flex gap-2">
                    <EyeIcon />
                    {project.impressions}
                </div>
                <div className="flex gap-2">
                    {project.upvotes}
                    <ChevronsUpIcon className={buttons.mini} />
                </div>
            </div>
            <p className="text-xl p-6 font-bold border-b-2">{project.description}</p>

            <p className="px-2 py-6 text-left w-1/2 font-semibold">{project.readme}</p>

            <div className="flex flex-col items-center gap-2 border-y-2 py-4 w-1/2 mt-4">
                <p className="text-3xl font-bold p-3">Skills</p>
                <div className="flex flex-wrap justify-center gap-4 py-4">
                    {project.skills.split(';').map((s, i) => (
                        <p className="px-8 py-3 border-2 shadow-xl rounded-xl hover:bg-white hover:text-black" key={i}>{s}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}