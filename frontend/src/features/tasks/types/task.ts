export type Status = 'TODO' | 'DOING' | 'DONE';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}

export interface TaskRequest {
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  dueDate: string;
}
