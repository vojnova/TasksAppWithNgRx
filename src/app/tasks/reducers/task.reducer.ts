import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task';
import { createReducer, on, Action, createSelector } from '@ngrx/store';

import * as TaskActions from '../actions/tasks.actions';
import { v4 as uuid } from 'uuid';

export interface State extends EntityState<Task> {
  selectedTaskId: number | string;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

const initialState: State = adapter.getInitialState({ selectedTaskId: null });

const tasksReducer = createReducer(
  initialState,
  on(TaskActions.CreateTask, (state, { task }) => {
    const { users, ...rest } = task;

    return adapter.addOne(
      { ...rest, userIds: users.map((user) => user.id) },
      state
    );
  }),
  on(TaskActions.EditTask, (state, { updates }) =>
    adapter.updateOne(updates, state)
  ),
  on(TaskActions.RemoveTask, (state, { taskId }) =>
    adapter.removeOne(taskId, state)
  )
);

export const reducer = (state: State, acion: Action) => {
  return tasksReducer(state, acion);
};

export const { selectEntities } = adapter.getSelectors();

// equal to the select all function from adapter.getSelectors()
export const selectAll = (state: EntityState<Task>) =>
  (state.ids as number[]).map((id) => state.entities[id]);

export const selectById = (id) =>
  createSelector(selectEntities, (taskEntities) => taskEntities[id]);
