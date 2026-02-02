import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { Task, TaskRequest } from '../types/task';
import { useCreateTask } from '../hooks/useCreateTask';
import { useUpdateTask } from '../hooks/useUpdateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

export function TaskForm({ task, onSuccess }: TaskFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskRequest>();

  const { mutate: createTask, isPending: isCreating } = useCreateTask(onSuccess);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(onSuccess);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(onSuccess);

  const isPending = isCreating || isUpdating || isDeleting;

  useEffect(() => {
    if (task) {
      // Pre-fill form when editing
      const taskData = {
        ...task,
        dueDate: task.dueDate.split('T')[0], // Format for <input type="date">
      };
      reset(taskData);
    } else {
      // Clear form when creating
      reset({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'TODO',
      });
    }
  }, [task, reset]);

  const onSubmit = (data: TaskRequest) => {
    const formattedData = {
      ...data,
      dueDate: new Date(data.dueDate).toISOString(),
    };
    
    if (task) {
      updateTask({ id: task.id, task: formattedData });
    } else {
      createTask(formattedData);
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="form-input mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
          <input
            id="dueDate"
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            className="form-input mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
          <select
            id="priority"
            {...register('priority', { required: 'Priority is required' })}
            className="form-select mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
          <select
            id="status"
            {...register('status', { required: 'Status is required' })}
            className="form-select mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="TODO">To Do</option>
            <option value="DOING">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="form-textarea mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div>
          {task && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
        <div className="flex gap-x-4">
           <button
             type="button"
             onClick={onSuccess}
             className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           >
            Cancel
           </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
          </button>
        </div>
      </div>
    </form>
  );
}