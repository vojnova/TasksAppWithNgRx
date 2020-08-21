import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task';
import { Update } from '@ngrx/entity';

export const CreateTask = createAction(
  '[Tasks] Create Action',
  props<{ task: Task }>()
);

export const EditTask = createAction(
  '[Tasks] Edit Task',
  props<{ updates: Update<Task> }>()
);

export const RemoveTask = createAction(
  '[Tasks] Remove Task',
  props<{ taskId: string }>()
);
