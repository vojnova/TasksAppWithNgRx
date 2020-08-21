import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskPageComponent } from './tasks/pages/create-task-page/create-task-page.component';
import { TasksDashboardComponent } from './tasks/pages/tasks-dashboard/tasks-dashboard.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { UserListComponent } from './users/components/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      { path: '', component: TasksDashboardComponent },
      { path: 'create', component: CreateTaskPageComponent },
      { path: 'edit/:id', component: CreateTaskPageComponent },
    ],
  },

  {
    path: 'users',
    children: [
      { path: '', component: UserListComponent },
      { path: 'create', component: CreateUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
