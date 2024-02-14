import { tasks } from "@/app/misc/dummy"
import { buttons } from "@/app/misc/styles"
import { CheckCheck, Trash } from "lucide-react"

const TaskLists = ({ type, tasks }) => {

    const removeTask = (task_id) => { // TODO

    }

    const markComplete = (task_id) => { // TODO

    }

    return <div className="flex flex-col gap-4 bg-[#333] w-3/7 p-8 rounded-xl">
        <p className="text-center font-bold text-2xl">{type}</p>
        <div className="flex flex-col gap-4">
            {tasks.map((t, i) =>
                <div className="flex flex-col p-2 shadow-lg shadow-[#444] cursor-pointer bg-[#333] hover:invert rounded-xl">
                    <p className="text-xl text-center underline font-semibold">{t.title}</p>
                    <p className="p-2">{t.description}</p>
                    <div className="flex justify-between">
                        <CheckCheck className={buttons.miniactionred} onClick={() => removeTask(t.id)} />
                        <Trash className={buttons.miniactionsec} onClick={() => markComplete(t.id)} />
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default function TasksPage({ project }) {
    return (
        <div className="w-full h-full p-12">
            <div className="flex flex-wrap justify-around gap-4">
                <TaskLists type="Tasks For You" tasks={tasks} />
                <TaskLists type="Tasks For All" tasks={tasks} />
            </div>
        </div>
    )
}