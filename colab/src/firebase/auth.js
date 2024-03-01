import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/src/firebase/firebase";

export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
    let user;
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider).then(res => user = res);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
    return user;
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}
