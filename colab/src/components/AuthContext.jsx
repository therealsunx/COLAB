'use client';

import { createContext } from "react";
import { onAuthStateChanged } from "../firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser => setUser(authUser));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged(authUser => {
            if (user === undefined) return;
            if (user?.email !== authUser?.email) {
                router.refresh();
            }
        });
    }, [user]);

    // console.log(user?.displayName || "null");

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}