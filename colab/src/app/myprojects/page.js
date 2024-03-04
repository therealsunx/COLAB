'use client';

import { AuthContext } from "@/src/components/AuthContext";
import Feed from "@/src/components/Feed";
import Login from "@/src/components/LogIn";
import { getAllProjectsOfUser } from "@/src/firebase/firestore";
import { useContext, useEffect, useState } from "react";

const MyProjects = () => {
    const { auth, userData } = useContext(AuthContext);
    const [projs, setProjs] = useState(null);

    useEffect(() => {
        if (!auth) return;
        const getProjs = async () => getAllProjectsOfUser(auth.uid).then(r => setProjs(r));
        getProjs();
    }, []);

    if (!auth) return <Login />;

    return (
        <div className="h-screen flex justify-between w-full">
            <Feed userData={{ ...userData, uid: auth.uid }} auth={auth} content={projs} />
        </div>
    )
}

export default MyProjects;