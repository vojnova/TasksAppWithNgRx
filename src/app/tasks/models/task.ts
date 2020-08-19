import { TaskSatus } from './task-status';

export interface Task {
  id: string | number;
  name: string;
  description: string;
  status: TaskSatus;
  userId: string;
}
