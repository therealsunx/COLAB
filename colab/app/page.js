'use client';

import { useState } from "react";

export default function Home() {
  const [boardURL, setBoardURL] = useState('');

  const getRandomBoard = async () => {
    try {
      const res = await fetch("http://localhost:8080/random");
      if (!res.ok) throw new Error("Network response not OK");
      const result = await res.text();
      const url = /<meta property="og:url" content="(.*?)"/.exec(result)[1];
      setBoardURL(url);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      {boardURL ?
        <iframe src={boardURL} height={800} className="w-full bg-[#555]"/>
        :
        <button className="border-2 border-[#f00] px-8 py-3 rounded-full shadow-xl bg-black hover:invert hover:shadow-[#f00]" onClick={() => getRandomBoard()}>Get random board</button>
      }
    </main>
  )
}
