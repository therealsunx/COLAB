'use client';

import { useProject } from "@/src/components/ProjectContext";
import { updateLinks } from "@/src/firebase/firestore";
import { buttons } from "@/src/misc/styles";
import { arrayUnion } from "firebase/firestore";
import { useState } from "react";

//https://wbo.ophir.dev/boards/rwnrq-nosLKZdLsA2wpt10tVLvagMos162PanPcoUTo-

export default function canvas() {

    const { links, setLinks, project } = useProject();
    const [boardURL, setBoardURL] = useState('');

    if (!boardURL && links?.boards.length > 0) setBoardURL(links.boards[0].split(";")[1]);

    const getRandomBoard = async () => {
        if (!project) return;
        try {
            // const _f = `${process.env.LAN_HOST}:${process.env.BOARD_PORT}/random`;
            const _f = "http://192.168.0.103:8080/random"
            const res = await fetch(_f);
            if (!res.ok) throw new Error("Network response not OK");
            const result = await res.text();
            const url = /<meta property="og:url" content="(.*?)"/.exec(result)[1];
            // console.log(result);
            // console.log(url);
            const name = prompt("Give a name for your board", "New Board").split(";");
            const __ = `${name};${url}`;
            // console.log(__);
            await updateLinks(project.id, { boards: arrayUnion(__) }).then(_ => { setBoardURL(url); setLinks({ ...links, boards: [...links.boards, __] }) });

        } catch (err) {
            console.log("ooooops", err);
        }
    }

    if (!links) return <p className="text-center p-12 mt-12 font-bold text-2xl">Loading...</p>

    return (
        <div className="w-full h-full p-4 space-y-4">
            <div className="flex gap-4">
                <select defaultValue={boardURL} onChange={e => setBoardURL(e.target.value)} className="w-1/3 px-8 py-2 bg-[#4448] rounded-xl">
                    {links && links.boards.map((l, _) => {
                        const ll = l.split(';');
                        return (
                            <option key={_} value={ll[1]} className="bg-primary">{ll[0]}</option>
                        )
                    })}
                </select>
                <button className={`${buttons.primary} px-8 py-2`} onClick={getRandomBoard}>Add New Board</button>
            </div>

            <iframe src={boardURL} className="w-full h-full bg-[#9998]" />
        </div>
    )
}