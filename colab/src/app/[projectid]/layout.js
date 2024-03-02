import { ProjectProvider } from "@/src/components/ProjectContext";

export default function Layout({ children }) {
    return (
        <ProjectProvider>
            {children}
        </ProjectProvider>
    )
}