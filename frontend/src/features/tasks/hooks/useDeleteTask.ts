import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../services/taskService';
import toast from 'react-hot-toast';

export function useDeleteTask(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully!');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.error("Failed to delete task", error);
      toast.error('Failed to delete task.');
    }
  });
}
