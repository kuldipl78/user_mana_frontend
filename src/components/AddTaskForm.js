"use client";
import React, { useState } from 'react';
import { addTask } from '../utils/api';

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await addTask({ title, description, status, dueDate });
    onTaskAdded(newTask);

    setTitle('');
    setDescription('');
    setStatus('todo');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="border p-2 w-full" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full" />
      <select style={{backgroundColor: "black"}} value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </form>
  );
}