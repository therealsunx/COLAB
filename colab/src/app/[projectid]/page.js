'use client';

import Link from "next/link";
import { useProject } from "@/src/components/ProjectContext";

export default function Project() {
    const { project } = useProject();

    // console.log(project);
    if (!project) return null;

    return (
        <div className="w-full flex flex-col items-center p-8">

            <p className="text-4xl font-bold">{project.name}</p>

            <p className="text-xl p-6 font-bold border-b-2">{project.intro}</p>

            <p className="px-2 py-6 text-center w-2/3 font-semibold">{project.detail}</p>

            <div className="flex flex-col items-center gap-2 border-y-2 py-4 w-2/3 mt-4">
                <p className="text-3xl font-bold p-3">Skills</p>
                <div className="flex flex-wrap justify-center gap-4 py-4">
                    {project.skills.map((s, i) => (
                        <p className="px-8 py-3 border-2 shadow-xl rounded-xl hover:bg-white hover:text-black" key={i}>{s}</p>
                    ))}
                </div>
            </div>

            <div className="p-6 w-2/3 mt-12 text-center space-y-2">
                <p className="font-bold text-3xl p-3">Team</p>
                {project.members.map((t, _) => (
                    <Link href="" className="py-4 px-6 flex justify-between rounded-xl form-div" key={_}>
                        <p className="font-bold">{t.name} </p>
                        {t.id === project.manager && "Manager"}
                    </Link>
                ))}
            </div>
        </div>
    )
}