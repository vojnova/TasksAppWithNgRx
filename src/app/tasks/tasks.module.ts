import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { TaskComponent } from './components/task/task.component';
import { TasksDashboardComponent } from './pages/tasks-dashboard/tasks-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as fromTasks from './reducers/task.reducer';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../components/shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    CreateTaskPageComponent,
    TaskComponent,
    TasksDashboardComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('tasks', fromTasks.reducer),
  ],
  exports: [TaskComponent, TaskListComponent],
  entryComponents: [CreateTaskPageComponent],
})
export class TasksModule {}
