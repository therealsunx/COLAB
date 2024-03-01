'use client';

import { AuthContext } from "@/src/components/AuthContext";
import Login from "@/src/components/LogIn";
import { signOut } from "@/src/firebase/auth";
import { buttons } from "@/src/misc/styles";
import { LogOutIcon } from "lucide-react";
import { useContext, useState } from "react";

export default function MyAccount() {
    const { user } = useContext(AuthContext);
    if (!user) return <Login />;

    const handleLogOut = e => {
        e.preventDefault();
        signOut();
    }

    //deez data should be fetches from the database
    const [userData, setUserData] = useState({
        profession: "",
        education: "",
        skills: "",
        experience: ""
    });

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    // console.log(user);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center p-4 border-b-2">
                <div className="flex items-center gap-4">
                    <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full bg-blue-300" />
                    <p className="">{user.displayName}</p>
                </div>

                <button className={`${buttons.bulb} flex gap-4 px-6 py-2`} onClick={handleLogOut}>
                    LogOut
                    <LogOutIcon />
                </button>
            </div>

            <p className="font-bold px-6 py-2 text-md mt-6">Personal Information</p>

            <div className="w-2/3 rounded-xl px-6 py-2 bg-[#4444] text-sm">
                <div className="flex items-center justify-between w-full">
                    <p className="font-bold">Email</p>
                    <p className="py-2">{user.email}</p>
                </div>
            </div>

            <p className="font-bold px-6 py-2 text-md mt-12">Technical Information</p>

            <div className="w-2/3 rounded-xl px-6 py-2 bg-[#4444] text-sm gap-4 flex flex-col">
                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Education</p>
                    <input
                        name="education"
                        className="py-2 bg-[#4449] text-right flex-1  rounded-lg"
                        type="text" value={userData.education}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Profession</p>
                    <input
                        name="profession"
                        className="flex-1 py-2 bg-[#4449] text-right rounded-lg"
                        type="text" value={userData.profession}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Experience</p>
                    <input
                        name="experience"
                        className="flex-1 py-2 bg-[#4449] text-right rounded-lg"
                        type="text" value={userData.experience}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Skills</p>
                    <input
                        name="skills"
                        className="flex-1 py-2 bg-[#4449] text-right rounded-lg"
                        type="text" value={userData.skills}
                        onChange={handleChange}
                    />
                </div>

                <button className={`${buttons.primary} w-fit font-bold px-10 py-4`}>Update</button>
            </div>

        </div>
    )
}