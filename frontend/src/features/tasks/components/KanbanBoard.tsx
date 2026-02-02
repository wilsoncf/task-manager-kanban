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
    <div className="p-4 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Task Manager
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Create Task
        </button>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory flex gap-4 sm:gap-6 custom-scrollbar">
        
        <div className="flex-shrink-0 w-[85vw] sm:w-80 md:w-96 snap-center">
          <Column title="To Do" tasks={columns.TODO ?? []} onEditTask={handleOpenModal} />
        </div>

        <div className="flex-shrink-0 w-[85vw] sm:w-80 md:w-96 snap-center">
          <Column title="In Progress" tasks={columns.DOING ?? []} onEditTask={handleOpenModal} />
        </div>

        <div className="flex-shrink-0 w-[85vw] sm:w-80 md:w-96 snap-center">
          <Column title="Done" tasks={columns.DONE ?? []} onEditTask={handleOpenModal} />
        </div>

        <div className="w-2 sm:hidden flex-shrink-0" />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedTask ? 'Edit Task' : 'Create Task'}>
        <TaskForm onSuccess={handleCloseModal} task={selectedTask} />
      </Modal>
    </div>
  );
}