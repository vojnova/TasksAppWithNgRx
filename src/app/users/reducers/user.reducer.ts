import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user';
import { createReducer, on, Action, createSelector } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import * as TaskActions from '../../tasks/actions/tasks.actions';
import { v4 as uuid } from 'uuid';

export interface State extends EntityState<User> {}

export const adapter = createEntityAdapter<User>();
export const intialState = adapter.getInitialState();

const userReducer = createReducer(
  intialState,
  on(UserActions.CreateUser, (state, { user }) =>
    adapter.addOne({ ...user, id: uuid() }, state)
  ),

  on(TaskActions.CreateTask, (state, { task }) => {
    const users = task.users;
    const stateEntities = { ...state.entities };

    const updatedEntities = {}

    for (const user of users) {
      const stateUser = {...stateEntities[user.id]};
      stateUser.tasksIds = [...stateUser.tasksIds, task.id];

      updatedEntities[stateUser.id] = stateUser;
    }

    return { ...state, entities: {...stateEntities, ...updatedEntities} };
  }),

  on(UserActions.CreateMultipleUsers, (state, { users }) =>
    adapter.addMany(users, state)
  ),

  on(UserActions.EditUser, (state, { updates }) =>
    adapter.updateOne(updates, state)
  ),
  on(UserActions.RemoveUser, (state, { userId }) =>
    adapter.removeOne(userId, state)
  )
);

export const reducer = (state: State, action: Action) =>
  userReducer(state, action);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export const selectById = (id) =>
  createSelector(selectEntities, (entities) => entities[id]);
