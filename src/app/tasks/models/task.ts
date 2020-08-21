import { TaskSatus } from './task-status';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskSatus;
  userId: string;
}
