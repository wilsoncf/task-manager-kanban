import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../services/taskService';
import { Column } from './Column';
import type { Status, Task } from '../types/task';
import { useMemo } from 'react';
import { CreateTaskForm } from './CreateTaskForm';

export function KanbanBoard() {
  const { data: tasks, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const columns = useMemo(() => {
    const groupedTasks = (tasks ?? []).reduce((acc, task) => {
      acc[task.status] = [...(acc[task.status] ?? []), task];
      return acc;
    }, {} as Record<Status, Task[]>);
    return groupedTasks;
  }, [tasks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <CreateTaskForm />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Column title="To Do" tasks={columns.TODO ?? []} />
        <Column title="In Progress" tasks={columns.DOING ?? []} />
        <Column title="Done" tasks={columns.DONE ?? []} />
      </div>
    </div>
  );
}
