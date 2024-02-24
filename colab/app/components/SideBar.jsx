import { AlignJustify, HomeIcon, LogOut, Plus, Rows3, Rows3Icon, UserRound, X } from "lucide-react";
import { useState } from "react";
import { buttons } from "../misc/styles";
import Home from "../page";
import { navIcons, pages } from "../misc/constants";


const SideBar = ({ sessionToken, setSessionToken, pageIndex, updatePageIndex, projectView }) => {
    const [expand, setExpand] = useState(false);

    const NavBtn = ({ icon, title, active, onClick }) => (
        <button
            onClick={onClick}
            className={`flex p-2 ${buttons.bulb} ${active && "bg-white shadow-secondary text-black"}`}
        >
            {icon}
            {expand && <p className="px-12 w-max">{title}</p>}
        </button>
    )

    return (
        <div className="fixed h-screen bg-black z-10 flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 py-4 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 ${buttons.icon}`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold w-max text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">

                <div className="flex flex-col gap-4">
                    {Object.entries(pages).map(([title, i]) => (
                        (projectView || i < 2) && <NavBtn key={i} title={title} active={pageIndex === i} onClick={() => updatePageIndex(i)} icon={navIcons[i]} />))}
                </div>

                <button className={`flex gap-4 p-2 mb-4 ${buttons.bulb}`} onClick={() => setSessionToken('')}>
                    {sessionToken ? <LogOut /> : <UserRound />}
                    {expand && <p className="px-12">{sessionToken ? "LogOut" : "LogIn/SignUp"}</p>}
                </button>
            </div>
        </div>
    )
}

export default SideBar;