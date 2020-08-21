import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user';
import { createReducer, on, Action, createSelector } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { v4 as uuid } from 'uuid';

export interface State extends EntityState<User> {}

export const adapter = createEntityAdapter<User>();
export const intialState = adapter.getInitialState();

const userReducer = createReducer(
  intialState,
  on(UserActions.CreateUser, (state, { user }) => adapter.addOne({...user, id: uuid()}, state)),
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
