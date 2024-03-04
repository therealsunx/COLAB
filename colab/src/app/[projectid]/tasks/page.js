'use client';

import { done, tasks } from "@/src/misc/dummy";
import { buttons } from "@/src/misc/styles";
import { CheckCheck, Trash } from "lucide-react";

const TaskLists = ({ type, tasks }) => {

    const removeTask = (task_id) => { // TODO

    }

    const markComplete = (task_id) => { // TODO

    }

    return <div className="flex flex-col flex-1 gap-4 bg-[#333] w-3/7 p-8 rounded-xl">
        <p className="text-center font-bold text-2xl">{type}</p>
        <div className="flex flex-col gap-4">
            {tasks.map((t, i) =>
                <div key={i} className="flex flex-col p-2 shadow-lg cursor-pointer text-black bg-white hover:invert rounded-xl">
                    <p className="text-xl text-center underline font-semibold">{t.title}</p>
                    <p className="p-2">{t.description}</p>
                    <div className="flex justify-between">
                        <CheckCheck className={buttons.miniactionsec} onClick={() => removeTask(t.id)} />
                        <Trash className={buttons.miniactionred} onClick={() => markComplete(t.id)} />
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default function TasksPage() {

    return (
        <div className="w-full h-full p-12">
            <div className="flex justify-around gap-4">
                <TaskLists type="TODO" tasks={tasks} />
                <TaskLists type="DONE" tasks={done} />
            </div>
        </div>
    )
}