'use client';

import Feed from "@/src/components/Feed";
import { projects } from "@/src/misc/dummy";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-screen flex justify-between">
      <Feed user={user} content={projects} />
    </div>
  )
}