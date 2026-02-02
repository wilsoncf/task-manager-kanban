import type { Task } from '../types/task';
import { Calendar, AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import clsx from 'clsx'; 

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const priorityConfig = {
    LOW: {
      color: 'text-green-600 bg-green-50 border-green-200',
      icon: <ArrowDown size={14} />,
      label: 'Low'
    },
    MEDIUM: {
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      icon: <Minus size={14} />,
      label: 'Medium'
    },
    HIGH: {
      color: 'text-red-600 bg-red-50 border-red-200',
      icon: <ArrowUp size={14} />,
      label: 'High'
    },
  };

  const config = priorityConfig[task.priority];
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'DONE';

  return (
    <button
      onClick={() => onEdit(task)}
      className="group w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-left hover:shadow-md hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 ease-in-out relative overflow-hidden"
    >
      <div className={clsx("absolute left-0 top-0 bottom-0 w-1", config.color.split(' ')[2].replace('border', 'bg'))} />

      <div className="pl-2">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}
          >
            {config.icon}
            {config.label}
          </span>
          {isOverdue && (
            <span className="text-red-500" title="Overdue">
              <AlertCircle size={16} />
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
          {task.title}
        </h3>
        
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 min-h-[2.5em]">
          {task.description || "No description provided."}
        </p>

        <div className="flex items-center text-xs text-slate-400 border-t border-slate-100 pt-2 mt-auto">
          <Calendar size={12} className="mr-1.5" />
          <span className={isOverdue ? "text-red-500 font-medium" : ""}>
             {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>
    </button>
  );
}