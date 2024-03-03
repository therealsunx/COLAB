'use client';

import { AuthContext } from "@/src/components/AuthContext"
import { useProject } from "@/src/components/ProjectContext";
import { useContext } from "react"

export default function Settings() {

    const { auth } = useContext(AuthContext);
    const { project } = useProject();

    console.log(project, auth);

    return (
        <div className="flex flex-col items-center">
            <p className="text-4xl font-bold p-8">Settings</p>
            {(auth?.uid === project?.manager) ?
                <p>Manager Panel goes here (make form and functions to update project data here : @Sudhin Karki</p> :
                <p>You are not authorised to change stuff regarding the project. Just code... or design..</p>
            }
        </div>
    )
}