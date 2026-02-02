import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../services/taskService';

export function KanbanBoard() {
  const { data: tasks, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Columns will go here */}
      </div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
