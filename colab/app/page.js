'use client';

import { useState } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";

export default function Home() {
  const [sessionToken, setSessionToken] = useState('sdfsdf3da');

  return (
    sessionToken ? <HomePage sessionToken={sessionToken} setSessionToken={setSessionToken} /> : <AuthPage setSessionToken={setSessionToken} />
  )
}
