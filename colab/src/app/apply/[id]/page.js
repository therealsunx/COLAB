'use client';

import { projects } from "@/src/misc/dummy"
import { useParams } from "next/navigation"

export default function ApplyPage() {

    const params = useParams();
    const project = projects.find(x => x.id === params.id);

    return (
        <div className="flex flex-col items-center">
            <p className="text-xl font-semibold p-2">Apply for Involvement</p>
            <p className="text-4xl font-bold">{project.name}</p>
        </div>
    )
}