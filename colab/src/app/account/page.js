'use client';

import AccountInfo from "@/src/components/AccountInfo";
import { LogOutIcon, UserRound } from "lucide-react";
import { AuthContext } from "@/src/components/AuthContext";
import Login from "@/src/components/LogIn";
import { tabs } from "@/src/misc/constants";
import { buttons } from "@/src/misc/styles";
import { useContext, useState } from "react";
import InvitationsPage from "@/src/components/InvitationsPage";
import { signOut } from "@/src/firebase/auth";

export default function MyAccount() {
    const [tab, setTab] = useState(0);
    const { userData, auth, setUserData } = useContext(AuthContext);


    if (!auth) return <Login />;
    if (!userData) return <p className="text-3xl text-center font-bold mt-[20%]">Loading...</p>;

    const getContent = () => {
        switch (tab) {
            case 1: return <InvitationsPage userData={userData} setUserData={setUserData} />;
            case 0:
            default:
                return <AccountInfo userData={userData} setUserData={setUserData} />
        }
    }

    const handleLogOut = async e => {
        e.preventDefault();
        await signOut();
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center p-4 border-b-2">
                <div className="flex items-center gap-4">
                    {userData?.photourl ? <img src={userData.photourl} className="size-12 rounded-full" /> : <UserRound />}
                    <p className="">{userData?.name || ""}</p>
                </div>

                <button className={`${buttons.bulb} flex gap-4 px-6 py-2`} onClick={handleLogOut}>
                    LogOut
                    <LogOutIcon />
                </button>
            </div>
            <div className="flex gap-4 bg-[#4448] p-2">
                {tabs.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)} className={`${buttons.bulb} font-bold p-2 flex-1 ${tab === i && "bg-white text-black"}`} >{t}</button>
                ))}
            </div>
            {getContent()}
        </div>
    )
}