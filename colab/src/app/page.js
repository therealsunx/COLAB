'use client';

import Feed from "@/src/components/Feed";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { getFeedProjects } from "../firebase/firestore";

export default function HomePage() {
  const { auth, userData } = useContext(AuthContext);
  const [projs, setProjs] = useState(null);

  useEffect(() => {
    const getProjs = async () => getFeedProjects().then(r => setProjs(r));
    getProjs();
  }, []);

  return (
    <div className="h-screen flex justify-between">
      <Feed userData={userData} auth={auth} content={projs} />
    </div>
  )
}