"use client";

// Correct the imports and context usage
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/src/components/AuthContext";
import { useProject } from "@/src/components/ProjectContext";
import {
  getTasks,
  setTasks,
  deleteTask,
  updateTask,
} from "@/src/firebase/firestore";
import { CheckCheck, Trash } from "lucide-react";
import { buttons } from "@/src/misc/styles";

const TaskLists = ({ type, tasks }) => {
  const { auth } = useContext(AuthContext);
  const { project } = useProject();

  const removeTask = async (task_id) => {
    const task = tasks.find((t) => t.id === task_id);
    if (task.creator !== auth.uid) {
      alert("You can only delete tasks you created.");
      return;
    }
    await deleteTask(task_id);
    // Refresh tasks list after deletion
    const updatedTasks = await getTasks();
    setTasks(project.id, updatedTasks);
  };

  const markComplete = async (task_id) => {
    await updateTask(task_id, { completed: true });
    // Refresh tasks list after marking as complete
    const updatedTasks = await getTasks();
    setTasksState(updatedTasks);
  };

  return (
    <div className="flex flex-col flex-1 gap-4 bg-[#333] w-3/7 p-8 rounded-xl">
      <p className="text-center font-bold text-2xl">{type}</p>
      <div className="flex flex-col gap-4">
        {tasks.map((t, i) => (
          <div
            key={i}
            className="flex flex-col p-2 shadow-lg cursor-pointer text-black bg-white hover:invert rounded-xl"
          >
            <p className="text-xl text-center underline font-semibold">
              {t.title}
            </p>
            <p className="p-2">{t.description}</p>
            <div className="flex justify-between">
              <CheckCheck
                className={buttons.miniactionsec}
                onClick={() => removeTask(t.id)}
              />
              <Trash
                className={buttons.miniactionred}
                onClick={() => markComplete(t.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useContext(AuthContext);
  const { project } = useProject();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.uid) {
      alert("You must be logged in to create a task.");
      return;
    }
    const taskData = {
      title,
      description,
      creator: auth.uid,
    };

    await setTasks(project.id, taskData);
    setTitle("");
    setDescription("");

    // Call the onTaskCreated function to refresh the tasks list
    await getTasks(project.id);
  };

  return (
    <div>
      <h1 className="mt-10">Create a New Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-black">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-cyan-100 hover:bg-white hover:text-black w-auto"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const { project } = useProject();
  const { auth } = useContext(AuthContext);

  // console.log("Project", project);
  console.log("Auth", auth);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksSnapshot = await getTasks(project.id);
      setTasks(tasksSnapshot);
    };

    fetchTasks();
  }, [project]);

  return (
    <div className="w-full h-full p-12">
      <div className="flex justify-around gap-4">
        <TaskLists type="TODO" tasks={tasks} />
        <TaskLists type="DONE" tasks={tasks} />
      </div>
      <CreateTaskPage />
    </div>
  );
}
