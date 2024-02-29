'use client';

import Feed from "@/src/components/Feed";
import { projects } from "@/src/misc/dummy";

export default function HomePage() {

  return (
    <div className="h-screen flex justify-between">
      <Feed content={projects} />
    </div>
  )
}