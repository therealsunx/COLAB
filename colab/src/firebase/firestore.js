import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";


const users = collection(db, "users");
const projects = collection(db, "projects");
const links = collection(db, "links");
const tasks = collection(db, "tasks");


export const defaultUserData = {
    name: "",
    education: "",
    experience: [],
    profession: "",
    projects: [],
    skills: []
};

export const setUser = async (id, userdata) => {
    await setDoc(doc(users, id), userdata);
}

export const getUser = async (id) => {
    const ref = doc(db, "users", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    else return null;
}

export const getProjectData = async (id) => {
    const project = await getProject(id);
    if (!project) return null;

    const memberPromises = project.members.map(async m => {
        const userData = await getUser(m);
        return { id: m, name: userData.name };
    });
    const members = await Promise.all(memberPromises);
    // const manager = members.find(x => x.id === project.manager);

    return {
        id: id,
        ...project,
        members: members,
        // manager: manager
    };
}

export const getProject = async (id) => {
    const ref = doc(db, "projects", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    else return null;
}

export const setProject = async (id, data) => {
    await setDoc(doc(projects, id), data);
}

export const setLinks = async (id, data) => {
    await setDoc(doc(links, id), data);
}

export const getLinks = async (id) => {
    const ref = doc(db, "links", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    else return null;
}

export const setTasks = async (id, data) => {
    await setDoc(doc(tasks, id), data);
}

export const getTasks = async (id) => {
    const ref = doc(db, "tasks", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    else return null;
}


