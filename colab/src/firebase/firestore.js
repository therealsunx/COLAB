import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, getDocs, addDoc, updateDoc, query, where, limit, arrayUnion } from "firebase/firestore";


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
    skills: [],
    invites: []
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
    applicants: [],
    invites: []
}

export const setUser = async (id, userdata) => {
    await setDoc(doc(users, id), userdata);
}

export const getUser = async (id) => {
    const ref = doc(db, "users", id);
    const snap = await getDoc(ref);
    if (snap.exists()) return { uid: id, ...snap.data() };
    else return null;
}

export const getUserByEmail = async (email) => {
    const q = query(users, where("email", "==", email), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
        return { ...snap.docs[0].data(), uid: snap.docs[0].id };
    }
    return null;
}

export const updateUser = async (id, data) => {
    const ref = doc(db, "users", id);
    await updateDoc(ref, data);
}

export const getAllProjectsOfUser = async (id) => {
    const user = await getUser(id);
    if (!user) return null;

    return await getMultipleProjects(user.projects);
}

export const getMultipleUsers = async (ids) => {
    const prms = ids.map(async id => {
        return await getUser(id);
    })
    return await Promise.all(prms);
}

export const getMultipleProjects = async (ids) => {
    const prms = ids.map(async pid => {
        return await getProjectData(pid);
    })
    return await Promise.all(prms);
}

export const getProjectData = async (id) => {
    const project = await getProject(id);
    if (!project) return null;

    const memberPromises = project.members.map(async m => {
        const userData = await getUser(m);
        return { uid: m, name: userData.name, photourl:userData.photourl };
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
    const q = query(projects, limit(10)); // Limiting to 10 documents
    const snap = await getDocs(q);
    snap.forEach(s => data.push({ ...s.data(), id: s.ref.id }));
    return data;
}

export const setProject = async (id, data) => {
    await setDoc(doc(projects, id), data);
}

export const createNewProject = async (data) => {
    const _invs = await Promise.all(data.invites.map(async i => await getUserByEmail(i)));
    const invs = _invs.filter(x => x && x.uid !== data.manager).map(x => x.uid);

    const ref = await addDoc(collection(db, "projects"), {
        name: data.name,
        intro: data.intro,
        detail: data.detail,
        manager: data.manager,
        members: data.members,
        skills: data.skills
    });

    await setLinks(ref.id, { ...defaultLinkData, invites: invs });
    invs.forEach(i => updateUser(i, { invites: arrayUnion(ref.id) }));
    return ref.id;
}

export const updateProject = async (id, data) => {
    const ref = doc(db, "projects", id);
    await updateDoc(ref, data);
}

export const setLinks = async (id, data) => {
    await setDoc(doc(links, id), data);
}

export const updateLinks = async (id, data) => {
    const ref = doc(db, "links", id);
    await updateDoc(ref, data);
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


