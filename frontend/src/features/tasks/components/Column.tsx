import type { Task } from '../types/task';

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-2 rounded shadow">
            {/* TaskCard will go here */}
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
