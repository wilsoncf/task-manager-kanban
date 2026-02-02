import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../services/taskService';
import { Column } from './Column';
import type { Status, Task } from '../types/task';
import { useMemo, useState } from 'react';
import { Modal } from './Modal';
import { TaskForm } from './TaskForm';
import { Spinner } from './Spinner';

export function KanbanBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

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

  const handleOpenModal = (task?: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(undefined);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">
          Failed to load tasks. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Task
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 items-start h-full">
        <div className="min-w-[280px] w-full md:w-1/3 flex-shrink-0">
          <Column title="To Do" tasks={columns.TODO ?? []} onEditTask={handleOpenModal} />
        </div>
        <div className="min-w-[280px] w-full md:w-1/3 flex-shrink-0">
          <Column title="In Progress" tasks={columns.DOING ?? []} onEditTask={handleOpenModal} />
        </div>
        <div className="min-w-[280px] w-full md:w-1/3 flex-shrink-0">
          <Column title="Done" tasks={columns.DONE ?? []} onEditTask={handleOpenModal} />
        </div>
        
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedTask ? 'Edit Task' : 'Create Task'}>
        <TaskForm onSuccess={handleCloseModal} task={selectedTask} />
      </Modal>
    </div>
  );
}