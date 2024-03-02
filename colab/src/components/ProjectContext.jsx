'use client';

import { useParams } from 'next/navigation';
import { getLinks, getProjectData } from "@/src/firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const params = useParams();

    const [project, setProject] = useState(null);
    const [links, setLinks] = useState(null);

    useEffect(() => {
        if (project && project.id == params.projectid) return;
        const fetchProj = async () => {
            await getProjectData(params.projectid).then(r => setProject(r));
            await getLinks(params.projectid).then(r => setLinks(r));
        };
        fetchProj();
    }, []);

    return (
        <ProjectContext.Provider value={{ project, links, setProject, setLinks }}>
            {children}
        </ProjectContext.Provider>
    );
};
