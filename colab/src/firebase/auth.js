import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/src/firebase/firebase";

export function onAuthStateChanged(cb) {
    return () => { };
}

export async function signInWithGoogle() {
    return;
}

export async function signOut() {
    return;
}