'use client';
import { signInWithGoogle } from "@/src/firebase/auth";
import { buttons } from "@/src/misc/styles";
import { setUser, defaultUserData, getUser } from "../firebase/firestore";

export default function Login() {
    
    const handleLogInGoogle = async (e) => {
        e.preventDefault();
        await signInWithGoogle().then(
            async res => {
                await getUser(res.user.uid).then(
                    async r => {
                        if (r) return;
                        await setUser(res.user.uid, { ...defaultUserData, name: res.user.displayName, email: res.user.email, photourl: res.user.photoURL });
                    }
                );
            }
        );
    };

    return (
        <div className="h-screen flex m-auto w-2/3 p-12 justify-center">
            <div className="flex flex-col w-full items-center justify-around rounded-2xl p-12 bg-[#fff2]">
                <p className="text-4xl font-bold p-12 rounded-full bg-primary border-x-2 border-secondary shadow-xl shadow-secondary">CO-LAB</p>

                <div className="flex flex-col gap-2 p-12 bg-[#fff2] rounded-2xl">
                    <button
                        className={`flex-1 px-6 py-2 bg-[#fff1] font-bold ${buttons.bulb}`}
                        onClick={handleLogInGoogle}
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    )
}