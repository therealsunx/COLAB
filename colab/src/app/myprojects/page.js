'use client';

import { AuthContext } from "@/src/components/AuthContext";
import Feed from "@/src/components/Feed";
import Login from "@/src/components/LogIn";
import { getAllProjectsOfUser, getProject, getUser } from "@/src/firebase/firestore";
import { useContext, useEffect, useState } from "react";

const MyProjects = () => {
    const { user } = useContext(AuthContext);
    const [projs, setProjs] = useState(null);

    useEffect(() => {
        if (!user) return;

        const getProjs = async () => getAllProjectsOfUser(user.uid).then(r => setProjs(r));
        getProjs();
    }, [user]);

    if (!user) return <Login />

    return (
        <div className="h-screen flex justify-between w-full">
            <Feed user={user} content={projs} />
        </div>
    )
}

export default MyProjects;