import { Component, OnInit } from '@angular/core';
import { RootState, selectAllTasks, selectTasksWithUsers } from 'src/app/root.state';
import { Store } from '@ngrx/store';
import { selectAll, State } from '../../reducers/task.reducer';
import { Task } from '../../models/task';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPageComponent } from '../create-task-page/create-task-page.component';

import * as TaskActions from '../../actions/tasks.actions';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
})
export class TasksDashboardComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private store: Store<RootState>, private dialog: MatDialog) {
    this.store
      .select(selectTasksWithUsers)
      .subscribe((tasks) => {
        (this.tasks = tasks);
        console.log(this.tasks)
      });
  }



  ngOnInit(): void {}
}
