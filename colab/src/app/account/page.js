'use client';

import { AuthContext } from "@/src/components/AuthContext";
import Login from "@/src/components/LogIn";
import { signOut } from "@/src/firebase/auth";
import { setUser, getUser } from "@/src/firebase/firestore";
import { buttons } from "@/src/misc/styles";
import { LogOutIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function MyAccount() {
    const { user } = useContext(AuthContext);

    const handleLogOut = e => {
        e.preventDefault();
        signOut();
    }

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user) return;
        const getUserData = async () => await getUser(user.uid).then(res => setUserData(res));
        getUserData();

    }, [user]);

    if (!user || !userData) return <Login />;

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleList = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value.split(',') })
    }

    const handleSubmit = async () => {
        await setUser(user.uid, userData);
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center p-4 border-b-2">
                <div className="flex items-center gap-4">
                    <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full bg-blue-300" />
                    <p className="">{userData.name || ""}</p>
                </div>

                <button className={`${buttons.bulb} flex gap-4 px-6 py-2`} onClick={handleLogOut}>
                    LogOut
                    <LogOutIcon />
                </button>
            </div>

            <p className="font-bold px-6 py-2 text-md mt-6">Personal Information</p>

            <div className="rounded-xl px-6 py-2 text-sm space-y-4">
                <div className="flex items-center justify-between w-full">
                    <p className="font-bold">Email</p>
                    <p className="py-2">{user.email}</p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Name</p>
                    <input
                        name="name"
                        className="form-input"
                        type="text" value={userData.name}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <p className="font-bold px-6 py-2 text-md mt-4">Technical Information</p>

            <div className="rounded-xl px-6 py-2 text-sm gap-4 flex flex-col">
                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Education</p>
                    <input
                        name="education"
                        className="form-input"
                        type="text" value={userData.education}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Profession</p>
                    <input
                        name="profession"
                        className="form-input"
                        type="text" value={userData.profession}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Experience</p>
                    <div className="form-div space-y-4">
                        <div className="flex flex-col gap-4">
                            {userData.experience.map((e, _) => {
                                const exp = e.split(";");
                                return (
                                    <div key={_} className="flex gap-2">
                                        {exp.map((d, __) => (
                                            <p className="list-buttn flex-grow" key={__}>{d}</p>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                        <textarea
                            name="experience"
                            className="form-input w-full text-[0.8rem]"
                            type="text" value={userData.experience}
                            onChange={handleList}
                            placeholder="position1 ; company1 ; startDate1 , position2 ; company2 ; startDate2"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Skills</p>
                    <div className="form-div space-y-4">
                        <div className="flex flex-wrap gap-4">
                            {userData.skills.map((e, _) => {
                                return (
                                    <p className="list-buttn" key={_}>{e}</p>
                                )
                            })}
                        </div>
                        <textarea
                            name="skills"
                            className="form-input w-full text-[0.8rem]"
                            type="text" value={userData.skills}
                            onChange={handleList}
                            placeholder="skill1, skills2, skill3"
                        />
                    </div>
                </div>

                <button className={`${buttons.primary} w-fit font-bold px-10 py-4`} onClick={handleSubmit}>Update</button>
            </div>

        </div>
    )
}