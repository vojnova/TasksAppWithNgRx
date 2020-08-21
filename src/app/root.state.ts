import * as fromTasks from './tasks/reducers/task.reducer';
import * as fromUser from './users/reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RootState {
  tasks: fromTasks.State;
  users: fromUser.State;
}

// Tasks
export const selectTasksState = createFeatureSelector('tasks');
export const selectAllTasks = createSelector(
  selectTasksState,
  fromTasks.selectAll
);
export const selectTaskById = (taskId) =>
  createSelector(selectTasksState, fromTasks.selectById(taskId));

// Users
export const selectUsersState = createFeatureSelector('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUser.selectAll
);
export const selectUserById = (userId) =>
  createSelector(selectUsersState, fromUser.selectById(userId));
