import { ContextProvider } from "@/src/components/chatcomponents/Context";

export default function Layout({ children }) {
    return (
        <ContextProvider>
            {children}
        </ContextProvider>
    )
}