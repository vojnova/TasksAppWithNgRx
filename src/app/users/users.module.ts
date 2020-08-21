import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';

import * as fromUsers from './reducers/user.reducer';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateUserComponent, UserListComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', fromUsers.reducer)
  ]
})
export class UsersModule { }
