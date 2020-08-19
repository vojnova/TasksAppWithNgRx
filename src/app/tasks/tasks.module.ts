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

@NgModule({
  declarations: [
    CreateTaskPageComponent,
    TaskComponent,
    TasksDashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('tasks', fromTasks.reducer),
  ],
})
export class TasksModule {}
