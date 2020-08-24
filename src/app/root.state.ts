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
export const selectTaskEntities = createSelector(
  selectTasksState,
  fromTasks.selectEntities
);

export const selectTaskById = (taskId) =>
  createSelector(selectTasksState, fromTasks.selectById(taskId));

// Users
export const selectUsersState = createFeatureSelector('users');
export const selectUserEntities = createSelector(
  selectUsersState,
  fromUser.selectEntities
);

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUser.selectAll
);
export const selectUserById = (userId) =>
  createSelector(selectUsersState, fromUser.selectById(userId));

// Users and Tasks mapping
export const selectTasksWithUsers = createSelector(
  selectUserEntities,
  selectAllTasks,
  (userEntities, allTasks) => {
    return allTasks.map((task) => {
      const userIds = task.userIds;

      const realUsers = userIds.map((uId) => userEntities[uId]);

      return { ...task, users: realUsers };
    });
  }
);

export const selectUsersWithTasks = createSelector(
  selectTaskEntities,
  selectAllUsers,
  (taskEntities, allUsers) => {
    return allUsers.map((user) => {
      const taskIds = user.tasksIds;
      const realTasks = taskIds.map((taskId) => taskEntities[taskId]);

      return { ...user, tasks: realTasks };
    });
  }
);
