import { BookOpenTextIcon, ClipboardListIcon, Code2Icon, HomeIcon, LibrarySquareIcon, MessageCircleCodeIcon, PencilLineIcon, PlusCircleIcon, Rows3Icon, SettingsIcon } from "lucide-react";

export const pages = {
    Home: {
        link: "/",
        icon: <HomeIcon />
    },
    MyProjects: {
        link: "/myprojects",
        icon: <Rows3Icon />
    },
    CreateProject: {
        link: "/createnew",
        icon: <PlusCircleIcon />
    },
    ReadMe: {
        link: "/[id]",
        icon: <BookOpenTextIcon />
    },
    Canvas: {
        link: "/[id]/canvas",
        icon: <PencilLineIcon />
    },
    Chat: {
        link: "/[id]/chatspace",
        icon: <MessageCircleCodeIcon />
    },
    CodeSpace: {
        link: "/[id]/codespace",
        icon: <Code2Icon />
    },
    Tasks: {
        link: "/[id]/tasks",
        icon: <ClipboardListIcon />
    },
    References: {
        link: "/[id]/refs",
        icon: <LibrarySquareIcon />
    },
    Settings: {
        link: "/[id]/settings",
        icon: <SettingsIcon />
    }
};

//colab_server_1234