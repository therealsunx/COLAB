import { AlignJustify, LogOut, Plus, Rows3, UserRound, X } from "lucide-react";
import { useState } from "react";
import { buttons } from "../misc/styles";

const SideBar = ({ sessionToken, setSessionToken }) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className="flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 py-4 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 ${buttons.icon}`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col gap-4">
                    <button className={`flex gap-4 p-2 ${buttons.bulb}`} >
                        <Plus />
                        {expand && <p className="px-12 w-max">Create Project</p>}
                    </button>
                    <button className={`flex gap-4 p-2 ${buttons.bulb}`}>
                        <Rows3 />
                        {expand && <p className="px-12 w-max">My Projects</p>}
                    </button>
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