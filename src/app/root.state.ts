import * as fromTasks from './tasks/reducers/task.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RootState {
  tasks: fromTasks.State;
  users: [];
}

export const selectTasksState = createFeatureSelector('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  fromTasks.selectAll
);

export const selectTaskById = (taskId) =>
  createSelector(selectTasksState, fromTasks.selectById(taskId));
