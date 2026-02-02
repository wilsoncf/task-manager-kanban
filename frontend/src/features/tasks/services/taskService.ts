import { api } from '../../../lib/axios';
import  type { Task, TaskRequest } from '../types/task';

const BASE_URL = '/api/v1/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const createTask = async (task: TaskRequest): Promise<Task> => {
  const response = await api.post(BASE_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: TaskRequest): Promise<Task> => {
  const response = await api.put(`${BASE_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
