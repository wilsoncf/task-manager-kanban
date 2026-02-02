import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    LOW: 'bg-green-200 text-green-800',
    MEDIUM: 'bg-yellow-200 text-yellow-800',
    HIGH: 'bg-red-200 text-red-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
      <p className="text-sm text-gray-500 mt-2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-2 py-1 text-xs font-bold rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}
