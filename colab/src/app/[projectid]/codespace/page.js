'use client';

import { useProject } from "@/src/components/ProjectContext";
import { buttons } from "@/src/misc/styles";
import { ArrowRight } from "lucide-react";
import Link from "next/link"
import { useState } from "react";

export default function CodeSpace() {

    const { links } = useProject();
    const [repo, setRepo] = useState({
        name: "",
        link: ""
    });

    const handleChange = e => {
        setRepo({ ...repo, [e.target.name]: e.target.value });
    }
    // console.log(links);

    return (
        <div className="mx-auto flex gap-4 justify-center p-12">

            <div className="flex flex-col flex-1 gap-4 p-4 bg-[#0446] rounded-xl">
                <p className="text-xl text-center font-semibold mb-4 ">Repositories </p>
                {
                    links?.repos.map((r, i) => {
                        const l = r.split(';');
                        return (
                            <Link key={i} href={`https://vscode.dev/${l[1]}`} className={`px-6 py-2 ${buttons.bulb} flex items-center justify-between border-2`} target="_blank">
                                <div className="space-y-2">
                                    <p className="font-bold">{l[0]}</p>
                                    <p className="text-sm">{l[1]}</p>
                                </div>
                                <ArrowRight />
                            </Link>
                        )
                    })
                }
                {links?.repos.length === 0 && <p className="font-semibold text-center">No repositories added</p>}
            </div>

            <div className="flex-1 space-y-4 bg-[#0446] rounded-xl p-4">
                <p className="text-xl text-center font-semibold mb-8">Add new Repository </p>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-[0.5] w-min font-bold">Name</p>
                    <input
                        name="name"
                        className="form-input"
                        type="text" value={repo.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-[0.5] font-bold">Link</p>
                    <input
                        name="link"
                        className="form-input"
                        type="text" value={repo.link}
                        onChange={handleChange}
                    />
                </div>

                <button className={`${buttons.primary} px-8 py-2`} onClick={() => addNewRepo}>Add Repository</button>
            </div>

        </div>
    )
}