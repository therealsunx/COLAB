'use client';

import { AuthContext } from "@/src/components/AuthContext";
import Feed from "@/src/components/Feed";
import { getProject, getUser } from "@/src/firebase/firestore";
import { myProjects, projects } from "@/src/misc/dummy";
import { useContext, useEffect, useState } from "react";

const MyProjects = () => {
    const { user } = useContext(AuthContext);
    const [projs, setProjs] = useState(null);

    useEffect(() => {
        if (!user) return;

        const getProjs = async () => {
            let __projs;

            await getUser(user.uid).then(async r => {
                const _gp = async () => {
                    let projs = []
                    r.projects.forEach(async id => {
                        await getProject(id).then(_ => projs.push(_))
                    });
                    return projs;
                }

                await _gp().then(x => __projs = x);
            });
            return __projs;
        }

        getProjs().then(r => setProjs(r));
    }, [user]);

    return (
        <div className="h-screen flex justify-between w-full">
            <Feed user={user} content={projs} />
        </div>
    )
}

export default MyProjects;