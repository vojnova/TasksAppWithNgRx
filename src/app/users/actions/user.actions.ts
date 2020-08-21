import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
import { Update } from '@ngrx/entity';

export const CreateUser = createAction(
  '[Users] Create User',
  props<{ user: User }>()
);

export const RemoveUser = createAction(
  '[Users] Remove User',
  props<{ userId: string }>()
);

export const EditUser = createAction(
  '[Users] Edit User',
  props<{ updates: Update<User> }>()
);
