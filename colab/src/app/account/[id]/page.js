'use client';

import { getUser } from "@/src/firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountData() {

    const [userData, setUserData] = useState(null);
    const params = useParams();
    useEffect(() => {
        const _getUser = async () => await getUser(params.id).then(r => setUserData(r));
        _getUser();
    })

    if (!userData) return <p className="m-auto font-bold text-3xl">Loading...</p>

    return (
        <div className="w-full">
            <div className="flex justify-between items-center p-4 border-b-2">
                <div className="flex items-center gap-4">
                    {/* <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full bg-blue-300" /> */}
                    <p className="">{userData.name || ""}</p>
                </div>

            </div>

            <p className="font-bold px-6 py-2 text-md mt-6">Personal Information</p>

            <div className="rounded-xl px-6 py-2 text-sm space-y-4">
                <div className="flex items-center justify-between w-full">
                    <p className="font-bold">Email</p>
                    <p className="py-2">{userData?.email || ""}</p>
                </div>
            </div>

            <p className="font-bold px-6 py-2 text-md mt-4">Technical Information</p>

            <div className="rounded-xl px-6 py-2 text-sm gap-4 flex flex-col">
                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Education</p>
                    <p className="list-buttn flex-1">{userData.education || "None"}</p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Profession</p>
                    <p className="list-buttn flex-1">{userData.profession || "None"}</p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Experience</p>
                    {userData.experience.length > 0 ? <div className="form-div space-y-4">
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
                    </div> : <p className="list-buttn flex-1">No Experience</p>}
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Skills</p>
                    {userData.skills.length > 0 ? < div className="form-div space-y-4">
                        <div className="flex flex-wrap gap-4">
                            {userData.skills.map((e, _) => {
                                return (
                                    <p className="list-buttn" key={_}>{e}</p>
                                )
                            })}
                        </div>
                    </div> : <p className="list-buttn flex-1">No Skills</p>}
                </div>
            </div>

        </div >
    )
}