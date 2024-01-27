import { useState } from "react";
import { buttons, inputs } from "../misc/styles";

const LogInPage = ({ setNewUser, setSessionToken }) => {

    const [logData, setLogData] = useState({ userid: '', password: '' });
    return (
        <div className="h-screen flex m-auto p-12 justify-center">
            <div className="flex flex-col w-fit items-center justify-around rounded-2xl p-12 bg-[#fff2]">
                <p className="text-4xl font-bold p-12 rounded-full bg-primary border-x-2 border-secondary shadow-xl shadow-secondary">CO-LAB</p>

                <div className="flex flex-col gap-2 p-12 bg-[#fff2] rounded-2xl">
                    <div className="flex gap-8 justify-between items-center">
                        <label className="font-bold">UserID</label>
                        <input
                            type="text"
                            placeholder="user id"
                            value={logData.userid}
                            onChange={(e) => setLogData({ ...logData, userid: e.target.value })}
                            className={inputs.basic}
                        />
                    </div>

                    <div className="flex gap-8 justify-between items-center">
                        <label className="font-bold">Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={logData.password}
                            onChange={(e) => setLogData({ ...logData, password: e.target.value })}
                            className={inputs.basic}
                        />
                    </div>
                    <button className="self-end px-4 hover:text-secondary">Forget password ?</button>
                    <button className={`px-6 py-4 bg-[#fff1] mt-8 font-bold ${buttons.bulb}`} onClick={() => setSessionToken('12341234')} >LogIn</button>
                    <button className={`px-6 py-4 w-fit self-center bg-[#fff1] font-bold ${buttons.bulb}`} onClick={() => setNewUser(true)}>Create a New Account</button>                </div>
            </div>
        </div>
    )
}

export default LogInPage;