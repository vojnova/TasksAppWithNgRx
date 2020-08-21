import { Task } from '../../tasks/models/task';

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  tasks: Task[];
}
