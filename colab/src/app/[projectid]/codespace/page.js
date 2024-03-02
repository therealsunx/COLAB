'use client';

import { useProject } from "@/src/components/ProjectContext";
import { buttons } from "@/src/misc/styles";
import { ArrowRight } from "lucide-react";
import Link from "next/link"

export default function CodeSpace() {

    const { links } = useProject();

    return (
        <div className="mx-auto w-2/3 flex gap-4 justify-center p-12">
            <div className="flex flex-col flex-1 gap-4 p-4 bg-[#0444] rounded-xl">
                <p className="text-xl text-center font-semibold mb-4 ">Repositories </p>
                {
                    links?.repos.map((r, i) => {
                        const l = r.split(';');
                        return (
                            <Link key={i} href={`https://vscode.dev/${r}`} className={`px-6 py-2 ${buttons.bulb} flex items-center justify-between`} target="_blank">
                                <div className="space-y-2">
                                    <p className="font-bold">{l[0]}</p>
                                    <p className="text-sm">{l[1]}</p>
                                </div>
                                <ArrowRight />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}