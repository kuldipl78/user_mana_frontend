import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTask, updateTask } from '../utils/api';

export default function EditTaskForm({ taskId, onCancel }) {
  const [task, setTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchTask(taskId).then(setTask);
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(taskId, task);
    router.refresh();
    onCancel();
  };

  if (!task) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required className="border p-2 w-full" />
      <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} className="border p-2 w-full" />
      <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })} className="border p-2 w-full">
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input type="date" value={task.dueDate || ''} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} className="border p-2 w-full" />
      <div className="space-x-2">
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
        <button onClick={onCancel} className="bg-gray-300 p-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
