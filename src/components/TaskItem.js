import { useRouter } from 'next/navigation';

export default function TaskItem({ task, onDelete }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  return (
    <div className='box-container'>
      <div className="list-items-container border-[3px] rounded-[10px] border-gray-300 p-4 rounded shadow-md mb-2">
        <h3 className="text-lg font-semibold">Title : {task.title}</h3>
        <p className="text-sm">Status: {task.status}</p>
        {task.dueDate && <p className="text-sm">Due: {task.dueDate}</p>}
        <div className="mt-2 space-x-2">
          <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">Edit</button>
          <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
