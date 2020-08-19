import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskSatus } from '../../models/task-status';
import { Store } from '@ngrx/store';
import { RootState, selectTaskById } from '../../../root.state';
import * as TaskActions from '../../actions/tasks.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss'],
})
export class CreateTaskPageComponent implements OnInit {
  public createTaskForm: FormGroup;

  public taskStatus = ['PENDING', 'IN_PROGRESS', 'DONE', 'DISCARDED'];
  public isEdit = false;
  private taskId;

  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    private route: ActivatedRoute
  ) {
    this.createTaskForm = this.fb.group({
      name: '',
      description: '',
      status: TaskSatus.PENDING,
      userId: null,
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.taskId = params.get('id');
        this.isEdit = true;
        this.store
          .select(selectTaskById(this.taskId))
          .subscribe((task) => this.createTaskForm.patchValue(task));
      }
    });
  }

  submit() {
    if (this.isEdit) {
      this.store.dispatch(
        TaskActions.EditTask({
          updates: { id: this.taskId, changes: this.createTaskForm.value },
        })
      );
    } else {
      this.store.dispatch(
        TaskActions.CreateTask({ task: this.createTaskForm.value })
      );
    }
  }

  ngOnInit(): void {}
}
