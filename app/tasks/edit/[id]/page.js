"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchTask, updateTask } from "../../../../src/utils/api";


export default function EditTaskPage({ params: asyncParams }) {
  const router = useRouter();
  const params = use(asyncParams); // unwrap async params (Next.js 15+)
  const { id } = params;

  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTask(id);
        console.log("Fetched task:", data); // ✅ debug
        if (!data) {
          setError("Task not found");
        } else {
          setTask(data);
        }
      } catch (err) {
        console.error("Failed to fetch task", err);
        setError("Failed to fetch task");
      }
    };

    loadTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task);
      router.push("/tasks");
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Update failed");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Edit Task</h1>
      <input
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="border p-2 w-full"
        required
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border p-2 w-full"
      />
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        className="border p-2 w-full"
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input
        type="date"
        value={task.dueDate || ""}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Update Task
      </button>
    </form>
  );
}
