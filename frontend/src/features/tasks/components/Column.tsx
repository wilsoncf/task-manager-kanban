import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const columnHeaderStyles = {
  'To Do': 'bg-red-50 text-red-700 border-red-100',
  'In Progress': 'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Done': 'bg-green-50 text-green-700 border-green-100',
};

export function Column({ title, tasks, onEditTask }: ColumnProps) {
  const headerStyle = columnHeaderStyles[title as keyof typeof columnHeaderStyles] || 'bg-slate-100';

  return (
    <div className="flex flex-col h-full bg-slate-100/50 rounded-2xl border border-slate-200/60 p-2 min-h-[500px]">
      <div className={`flex items-center justify-between p-3 mb-2 rounded-xl border ${headerStyle}`}>
        <h2 className="text-sm font-bold uppercase tracking-wider">
          {title}
        </h2>
        <span className="bg-white/50 px-2 py-0.5 rounded-md text-xs font-bold border border-black/5">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 p-1 overflow-y-auto custom-scrollbar">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}

      </div>
    </div>
  );
}