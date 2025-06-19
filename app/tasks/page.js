"use client";
import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../../src/utils/api';
import TaskList from '../../src/components/TaskList';
import AddTaskForm from '../../src/components/AddTaskForm';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/tasks/edit/${id}`);
  };

  const handleTaskAdded = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <main className="p-4 main-container">
      <h1 className="main-heading text-2xl font-bold mb-4">Tasks Management</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
}
