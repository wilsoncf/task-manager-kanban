import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services/taskService';
import type { TaskRequest } from '../types/task';

export function useUpdateTask(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskRequest }) => updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.error("Failed to update task", error);
    }
  });
}
