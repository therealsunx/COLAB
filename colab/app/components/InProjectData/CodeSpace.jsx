import { buttons } from "@/app/misc/styles";
import { ArrowRight } from "lucide-react";
import Link from "next/link"
import { useState } from "react";

function NewRepoForm({project, className}) { // 
    const [repo, setRepo] = useState('');

    const addnewrepo = (repo) => {
        // add the repo in the project (use github API to check if the repo actually exists or not then add)
    }

    return (
        <div className={`${className} flex flex-col items-center gap-2 w-1/2 bg-[#333] p-4 rounded-xl`}>
            <p className="text-xl text-center font-semibold mb-4">Add New Repository</p>
            <input
                value={repo}
                placeholder="github.com/<user | organization>/<repository>"
                onChange={e => setRepo(e.target.value)}
                className="px-6 py-2 text-center rounded-2xl text-black w-full"
            />
            <button className={`px-6 py-2 mt-3 w-fit ${buttons.bulb}`}>Add</button>
        </div>
    )
}


export default function CodeSpace({ project }) {
    return (
        <div className="w-full flex gap-4 justify-center p-12">
            {project.repo && <div className="flex flex-col flex-1 gap-4 p-4 bg-[#333] rounded-xl">
                <p className="text-xl text-center font-semibold mb-4 ">Repositories </p>
                {project.repo.map((r, i)=>
                    <Link href={`https://vscode.dev/${r}`} className={`px-6 py-2 ${buttons.bulb} flex justify-between`} target="_blank">{r} <ArrowRight /> </Link>
                )}
            </div>}

            <NewRepoForm className="w-1/2" />
        </div>
    )
}