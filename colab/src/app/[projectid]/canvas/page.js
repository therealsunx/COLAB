'use client';

import { buttons } from "@/src/misc/styles";
import { useState } from "react";

export default function canvas() {
    const [boardURL, setBoardURL] = useState('https://wbo.ophir.dev/boards/rwnrq-nosLKZdLsA2wpt10tVLvagMos162PanPcoUTo-');

    const getRandomBoard = async () => {
        try {
            const res = await fetch("https://wbo.ophir.dev/random");
            if (!res.ok) throw new Error("Network response not OK");
            const result = await res.text();
            const url = /<meta property="og:url" content="(.*?)"/.exec(result)[1];
            console.log(result);
            console.log(url);
            setBoardURL(url);

        } catch (err) {
            console.log("ooooops", err);
        }
    }

    return boardURL ? <iframe src={boardURL} className="w-full h-screen bg-[#9998]" /> :
        <button className={`px-6 py-3 mt-12 text-xl bg-[#8888] font-bold ${buttons.bulb}`} onClick={getRandomBoard}>
            Get Board
        </button>
}