import { db } from "./firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";


const users = collection(db, "users");

export const setUser = async (id, userdata) => {
    await setDoc(doc(users, id), userdata);
}

export const getUser = async (id) => {
    const userref = doc(db, "users", id);
    const usersnap = await getDoc(userref);
    if (usersnap.exists()) return usersnap.data();
    else return null;
}

export const defaultUserData = {
    name: "",
    education: "",
    experience: [],
    profession: "",
    projects: [],
    skills: []
};
