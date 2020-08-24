import { Component, OnInit, Input } from '@angular/core';
import { CreateTaskPageComponent } from '../../pages/create-task-page/create-task-page.component';
import { Task } from '../../models/task';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root.state';
import { MatDialog } from '@angular/material/dialog';

import * as TaskActions from '../../actions/tasks.actions';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() forUser: User;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  openCreateTaskDialog() {
    this.dialog.open(CreateTaskPageComponent, {
      panelClass: 'no-dialog-background',
    });
  }

  onTaskEdit(task: Task) {
    this.dialog.open(CreateTaskPageComponent, {
      panelClass: 'no-dialog-background',
      data: task,
    });
  }

  onTaskDelete(task: Task) {
    this.store.dispatch(TaskActions.RemoveTask({ taskId: task.id }));
  }

  ngOnInit(): void {}
}
