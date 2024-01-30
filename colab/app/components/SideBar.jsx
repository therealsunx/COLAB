import { AlignJustify, LogOut, Plus, Rows3, UserRound, X } from "lucide-react";
import { useState } from "react";
import { buttons } from "../misc/styles";
import { navBarItems } from "../misc/constants";

const SideBar = ({ sessionToken, setSessionToken, pageIndex, setPageIndex }) => {
    const [expand, setExpand] = useState(false);
    return (
        <div className="flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 py-4 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 ${buttons.icon}`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold w-max text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col gap-4">
                    {navBarItems.map((n, i) =>
                        <button
                            onClick={() => setPageIndex(i)}
                            className={`flex gap-4 p-2 ${buttons.bulb} ${pageIndex === i && "bg-white shadow-secondary text-black"}`}
                        >
                            {n.icon}
                            {expand && <p className="px-12 w-max">n.title</p>}
                        </button>
                    )}
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