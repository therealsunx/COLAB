'use client';

import { useState } from "react";
import HomePage from "./components/HomePage";

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
    <HomePage />
  )
}
