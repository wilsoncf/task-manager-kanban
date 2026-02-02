import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const priorityStyles = {
    LOW: {
      pill: 'bg-green-100 text-green-800',
      border: 'border-l-green-500',
    },
    MEDIUM: {
      pill: 'bg-yellow-100 text-yellow-800',
      border: 'border-l-yellow-500',
    },
    HIGH: {
      pill: 'bg-red-100 text-red-800',
      border: 'border-l-red-500',
    },
  };

  return (
    <button
      onClick={() => onEdit(task)}
      className={`w-full bg-white p-4 rounded-lg shadow-sm border-l-4 ${priorityStyles[task.priority].border} text-left hover:shadow-md hover:translate-y-[-2px] transition-all duration-200`}
    >
      <h3 className="text-base font-semibold text-slate-800">{task.title}</h3>
      <p className="text-sm text-slate-600 mt-2 break-words">{task.description}</p>
      <p className="text-xs text-slate-500 mt-3">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
            priorityStyles[task.priority].pill
          }`}
        >
          {task.priority}
        </span>
      </div>
    </button>
  );
}
