'use client';

import { useEffect, useState } from "react";
import Feed from "./Feed";
import { buttons } from "../misc/styles";
import { getAllProjectsOfUser, getMultipleProjects, updateLinks, updateProject, updateUser } from "../firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { projects } from "../misc/dummy";

export default function InvitationsPage({ userData, setUserData }) {

    const [projs, setProjs] = useState(null);

    const acceptProj = async (id) => {
        await updateLinks(id, { invites: arrayRemove(userData.uid) });
        await updateProject(id, { members: arrayUnion(userData.uid) });
        await updateUser(userData.uid, { invites: arrayRemove(id), projects: arrayUnion(id) }).then(r => setUserData({ ...userData, projects: [...userData.projects, id], invites: userData.invites.filter(x => x != id) }));
    }

    const rejectProj = async (id) => {
        await updateLinks(id, { invites: arrayRemove(userData.id) });
        await updateUser(userData.uid, { invites: arrayRemove(id) }).then(r => setUserData({ ...userData, invites: userData.invites.filter(x => x != id) }));
    }

    useEffect(() => {
        if (!userData) return;
        const getProjs = async () => getMultipleProjects(userData.invites).then(r => setProjs(r));
        getProjs();
    }, []);

    return (
        <div>
            {projs && projs.length > 0 ? projs.map((p, _) => (
                <div className="p-4 flex gap-8 items-center" key={_}>
                    <div className="flex-grow p-4 rounded-xl bg-[#4448]">
                        <p className="font-bold px-4 py-2">{p.name}</p>
                        <p className="px-4 py-2">{p.intro}</p>
                    </div>

                    <button className={`${buttons.bulb} px-6 py-2 h-fit`} onClick={() => acceptProj(p.id)}>
                        Accept
                    </button>

                    <button className={`${buttons.redbulb} px-6 py-2 h-fit`} onClick={() => rejectProj(p.id)}>
                        Reject
                    </button>
                </div>
            )) : <p className="font-bold text-xl py-12 text-center">No Invitations</p>}
        </div>
    )
}