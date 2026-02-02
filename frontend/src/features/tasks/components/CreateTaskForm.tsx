import { useForm } from 'react-hook-form';
import type { TaskRequest } from '../types/task'; 
import { useCreateTask } from '../hooks/useCreateTask'; 

interface CreateTaskFormProps {
  onSuccess?: () => void;
}

export function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskRequest>();
  
  const { mutate, isPending, isError } = useCreateTask(() => {
    reset(); 
    if (onSuccess) onSuccess();
  });

  const onSubmit = (data: TaskRequest) => {
    const formattedData = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined
    };

    mutate(formattedData as TaskRequest);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Exibe erro genérico se a API falhar */}
      {isError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          Erro ao criar tarefa. Tente novamente.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date" // O browser retorna string "YYYY-MM-DD"
            {...register('dueDate', { required: 'Due date is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            {...register('priority', { required: 'Priority is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
          >
            <option value="">Select...</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
          >
            <option value="TODO">To Do</option>
            <option value="DOING">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving...' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}