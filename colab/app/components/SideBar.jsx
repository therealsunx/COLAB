import { AlignJustify, Plus, Rows3, UserRound, X } from "lucide-react";
import { useState } from "react";

const SideBar = () => {
    const [expand, setExpand] = useState(false);
    return (
        <div className="flex flex-col border-r-2 p-2 rounded-b-xl">
            <div className="flex gap-2 items-center">
                <div className={`${expand ? "rotate-180" : "rotate-0"} duration-500 w-fit p-2 bg-black rounded-full hover:invert`} onClick={() => setExpand(!expand)}>
                    {expand ? <X /> : <AlignJustify />}
                </div>
                {expand && <p className="font-bold text-2xl px-12">CO-LAB</p>}
            </div>

            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col">
                    <button className="flex gap-4 p-2 rounded-xl border-b-2 mt-12 border-black hover:border-secondary">
                        <Plus />
                        {expand && <p className="px-12">Create Project</p>}
                    </button>
                    <button className="flex gap-4 p-2 rounded-xl border-b-2 border-black hover:border-secondary">
                        <Rows3 />
                        {expand && <p className="px-12">My Projects</p>}
                    </button>
                </div>

                <button className="flex gap-4 p-2 rounded-xl border-b-2 border-black hover:border-secondary">
                    <UserRound />
                    {expand && <p className="px-12">LogIn/SignUp</p>}
                </button>
            </div>
        </div>
    )
}

export default SideBar;