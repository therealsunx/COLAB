'use client';

import { buttons } from "../misc/styles";
import { setUser } from "@/src/firebase/firestore";


export default function AccountInfo({ userData, setUserData }) {

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleList = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value.split(',') });
    }

    const handleSubmit = async () => {
        await setUser(auth.uid, userData).then(r => alert("Updated Successfully"));
    }

    return (
        <section>
            <p className="font-bold px-6 py-2 text-md mt-6">Personal Information</p>

            <div className="rounded-xl px-6 py-2 text-sm space-y-4">
                <div className="flex items-center justify-between w-full">
                    <p className="font-bold">Email</p>
                    <p className="py-2">{userData?.email}</p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <p className="flex-1 font-bold">Name</p>
                    <input
                        name="name"
                        className="form-input"
                        type="text" value={userData?.name}
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
        </section>
    )
}