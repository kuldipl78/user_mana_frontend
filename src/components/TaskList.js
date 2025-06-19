import React from 'react';
import TaskItem from './TaskItem'; 

export default function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="mt-4 list-items-container">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}