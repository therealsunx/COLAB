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
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      // Check if authUser is not null before accessing its properties
      if (authUser) {
        if (auth && auth.uid === authUser.uid) return;
        setAuth(authUser);
        const userData = await getUser(authUser.uid);
        setUserData(userData);
      } else {
        // Handle the case where authUser is null (e.g., user is not authenticated)
        setAuth(null);
        setUserData(null);
      }
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
