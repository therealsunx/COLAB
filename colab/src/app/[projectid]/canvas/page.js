'use client';

import { buttons } from "@/src/misc/styles";
import { useState } from "react";

export default function canvas() {
    const [boardURL, setBoardURL] = useState('http://localhost:8080/boards/wjZUGFgGMPjeyd-2vTjNv-yQ363Y2MQuj1aVmVBS4To-');

    const getRandomBoard = async () => {
        try {
            const res = await fetch("http://localhost:8080/random");
            if (!res.ok) throw new Error("Network response not OK");
            const result = await res.text();
            const url = /<meta property="og:url" content="(.*?)"/.exec(result)[1];
            console.log(url);
            setBoardURL(url);

        } catch (err) {
            console.log(err);
        }
    }

    return boardURL ? <iframe src={boardURL} className="w-full h-screen bg-[#9998]" /> :
        <button className={`px-6 py-3 mt-12 text-xl bg-[#8888] font-bold ${buttons.bulb}`} onClick={getRandomBoard}>
            Get Board
        </button>
}