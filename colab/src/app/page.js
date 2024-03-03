'use client';

import Feed from "@/src/components/Feed";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { getFeedProjects } from "../firebase/firestore";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [projs, setProjs] = useState(null);

  useEffect(() => {
    const getProjs = async () => getFeedProjects().then(r => setProjs(r));
    getProjs();
  }, [user]);

  return (
    <div className="h-screen flex justify-between">
      <Feed user={user} content={projs} />
    </div>
  )
}