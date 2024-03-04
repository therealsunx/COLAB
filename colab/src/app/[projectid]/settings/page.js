"use client";

import { AuthContext } from "@/src/components/AuthContext";
import DeveloperPanel from "@/src/components/DeveloperPanel";
import ManagerPanel from "@/src/components/ManagerPanel";
import { useProject } from "@/src/components/ProjectContext";
import { useContext } from "react";

export default function Settings() {
  const { auth } = useContext(AuthContext);
  const { project } = useProject();

//   console.log("project", project);

  return (
    <>
      {project && (
        <div className="flex flex-col items-center h-full">
          <p className="text-4xl font-bold p-8">Settings</p>
          {auth?.uid === project?.manager ? (
            <ManagerPanel projectId={project.id} auth={auth} />
          ) : (
            <DeveloperPanel />
          )}
        </div>
      )}
    </>
  );
}
