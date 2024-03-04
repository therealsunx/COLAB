import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";


const users = collection(db, "users");
const projects = collection(db, "projects");
const links = collection(db, "links");
const tasks = collection(db, "tasks");


export const defaultUserData = {
    name: "",
    email: "",
    photourl: "",
    education: "",
    experience: [],
    profession: "",
    projects: [],
    skills: []
};

export const defaultProjectData = {
    name: "",
    intro: "",
    detail: "",
    manager: "",
    members: [],
    skills: [],
}

export const defaultLinkData = {
    boards: [],
    repos: [],
    tasks: [],
    applicants: []
}

export const setUser = async (id, userdata) => {
    await setDoc(doc(users, id), userdata);
}

export const getUser = async (id) => {
    const ref = doc(db, "users", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    else return null;
}

export const updateUser = async (id, data) => {
    const ref = doc(db, "users", id);
    await updateDoc(ref, data);
}

export const getAllProjectsOfUser = async (id) => {
    const user = await getUser(id);
    if (!user) return null;

    const prms = user.projects.map(async pid => {
        return await getProjectData(pid);
    })
    return await Promise.all(prms);
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
        ...project,
        members: members,
        // manager: manager
    };
}

export const getProject = async (id) => {
    const ref = doc(db, "projects", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: id, ...snap.data() };
    else return null;
}

export const getFeedProjects = async () => {
    let data = [];
    const snap = await getDocs(projects);
    snap.forEach(s => data.push({ ...s.data(), id: s.ref.id }));
    return data;
}

export const setProject = async (id, data) => {
    await setDoc(doc(projects, id), data);
}

export const addProject = async (data) => {
    const ref = await addDoc(collection(db, "projects"), data);
    await setLinks(ref.id, defaultLinkData);
    return ref.id;
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
    if (snap.exists()) return { id: id, ...snap.data() };
    else return null;
}


