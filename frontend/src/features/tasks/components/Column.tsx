import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const columnStyles = {
  'To Do': 'border-t-red-500',
  'In Progress': 'border-t-yellow-500',
  'Done': 'border-t-green-500',
}

export function Column({ title, tasks, onEditTask }: ColumnProps) {
  return (
    <div className={`bg-slate-50 rounded-lg shadow-md ${columnStyles[title as keyof typeof columnStyles]}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-700 uppercase tracking-wider">{title} ({tasks.length})</h2>
      </div>
      <div className="p-4 space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
}
