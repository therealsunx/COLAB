"use client";

import { createContext } from "react";
import { onAuthStateChanged } from "../firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async authUser => {
            setAuth(authUser);
            if (!authUser) {
                setUserData(null);
                return;
            }
            await getUser(authUser.uid).then(r => setUserData(r));
        });
        return () => unsubscribe();
    }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (auth === undefined) return;
      if (auth?.email !== authUser?.email) {
        router.refresh();
      }
    });
  }, [auth]);

  // console.log(user?.displayName || "null");

  return (
    <AuthContext.Provider value={{ auth, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
