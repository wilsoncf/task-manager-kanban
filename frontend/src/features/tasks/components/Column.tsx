import type { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
