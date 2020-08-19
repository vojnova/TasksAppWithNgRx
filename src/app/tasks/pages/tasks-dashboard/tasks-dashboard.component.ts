import { Component, OnInit } from '@angular/core';
import { RootState, selectAllTasks } from 'src/app/root.state';
import { Store } from '@ngrx/store';
import { selectAll, State } from '../../reducers/task.reducer';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
})
export class TasksDashboardComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private store: Store<RootState>) {
    this.store
      .select(selectAllTasks)
      .subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnInit(): void {}
}
