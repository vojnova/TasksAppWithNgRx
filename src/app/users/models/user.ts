import { Task } from '../../tasks/models/task';

export interface User {
  name: string;
  email: string;
  tasks: Task[];
}
