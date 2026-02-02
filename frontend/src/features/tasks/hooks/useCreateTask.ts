import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../services/taskService'; 
import type { TaskRequest } from '../types/task'; 

export function useCreateTask(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskRequest) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      console.error("Failed to create task", error);
    }
  });
}