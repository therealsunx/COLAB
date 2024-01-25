import { useState } from "react";
import { buttons } from "../misc/styles";

const AuthPage = ({ setSessionToken }) => {
    const [logData, setLogData] = useState({ userid: '', password: '' });
    return (
        <div className="h-screen flex m-auto p-12 justify-center">
            <div className="flex flex-col w-fit items-center justify-around rounded-2xl p-12 bg-[#fff2]">
                <p className="text-center text-4xl font-bold w-max p-12 rounded-full bg-primary">CO-LAB</p>

                <div className="flex flex-col gap-6 p-12 bg-[#fff2] rounded-2xl">
                    <div className="flex gap-8 justify-between items-center">
                        <label className="font-bold">UserID</label>
                        <input
                            type="text"
                            placeholder="user id"
                            value={logData.userid}
                            onChange={(e) => setLogData({ ...logData, userid: e.target.value })}
                            className="px-8 py-2 rounded-full outline-none text-black"
                        />
                    </div>

                    <div className="flex gap-8 justify-between items-center">
                        <label className="font-bold">Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={logData.password}
                            onChange={(e) => setLogData({ ...logData, password: e.target.value })}
                            className="px-8 py-2 rounded-full outline-none text-black"
                        />
                    </div>

                    <button className={` px-6 py-4 bg-[#fff1] mt-8 font-bold ${buttons.bulb}`} onClick={() => setSessionToken('12341234')} >LogIn</button>
                </div>

            </div>
        </div>
    )
}

export default AuthPage;