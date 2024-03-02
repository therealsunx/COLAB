'use client';

import { AlignJustify, UserRound, X } from "lucide-react";
import { useContext, useState } from "react";
import { buttons } from "../misc/styles";
import { pages } from "../misc/constants";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AuthContext } from "./AuthContext";

const SideBar = () => {
    const [expand, setExpand] = useState(true);
    const params = useParams();
    const path = usePathname();
    const { user } = useContext(AuthContext);

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
        <div className="h-screen w-fit bg-black z-10 flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 py-4 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 ${buttons.icon}`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold w-max text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">

                <div className="flex flex-col gap-4">
                    {Object.entries(pages).map(([title, data], i) => (
                        (projectView || i < 3) && <NavBtn key={i} title={title} data={data} active={cmpCurPath(data.link)} />))}
                </div>

                <Link href="/account" className={`flex gap-4 p-2 mb-4 ${buttons.bulb}`}>
                    <UserRound />
                    {expand && <p className="px-12 w-max">{user?.displayName || "LogIn/SignUp"}</p>}
                </Link>
            </div>
        </div>
    )
}

export default SideBar;