'use client';

import { AlignJustify, LogOut, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";
import { buttons } from "../misc/styles";
import { pages } from "../misc/constants";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { signInWithGoogle, signOut, onAuthStateChanged } from "@/src/firebase/auth";


function useUserSession(initialUser) {
    // The initialUser comes from the server through a server component
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser => {
            setUser(authUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        onAuthStateChanged(authUser => {
            if (user === undefined) return;
            if (user?.email !== authUser?.email) {
                router.refresh();
            }
        });
    }, [user]);

    return user;
}

const SideBar = ({ initialUser }) => {
    const user = useUserSession(initialUser);
    console.log(user);

    const handleLogIn = async (e) => {
        e.preventDefault();
        signInWithGoogle();
    };

    const handleLogOut = async e => {
        e.preventDefault();
        signOut();
    }

    const [expand, setExpand] = useState(true);
    const params = useParams();
    const path = usePathname();

    const projectView = params.projectid != null;

    const cmpCurPath = l => {
        return l.replace('[id]', params.projectid) === path;
    }

    const NavBtn = ({ title, active, data }) => {
        return (
            <Link
                href={data.link.replace('[id]', params.projectid)}
                className={`flex p-2 ${buttons.bulb} ${active && "bg-white shadow-secondary text-black"}`}
            >
                {data.icon}
                {expand && <p className="px-12 w-max">{title}</p>}
            </Link>
        )
    }

    return (
        <div className="h-screen fixed left-0 bg-black z-10 flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 py-4 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 ${buttons.icon}`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold w-max text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">

                <div className="flex flex-col gap-4">
                    {Object.entries(pages).map(([title, data], i) => (
                        (projectView || i < 2) && <NavBtn key={i} title={title} data={data} active={cmpCurPath(data.link)} />))}
                </div>

                <div className={`flex gap-4 p-2 mb-4 ${buttons.bulb}`} onClick={user ? handleLogOut : handleLogIn}>
                    {user ? <LogOut /> : <UserRound />}
                    {expand && <p className="px-12">{user ? user.displayName : "LogIn"}</p>}
                </div>
            </div>
        </div>
    )
}

export default SideBar;