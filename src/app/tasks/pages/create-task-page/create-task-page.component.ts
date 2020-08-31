import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskSatus } from '../../models/task-status';
import { Store } from '@ngrx/store';
import { RootState, selectTaskById, selectAllUsers } from '../../../root.state';
import * as TaskActions from '../../actions/tasks.actions';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';
import { User, createTestUser } from 'src/app/users/models/user';
import { v4 as uuid } from 'uuid';
import { AlertService } from '../../../alerts/alert.service';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss'],
})
export class CreateTaskPageComponent implements OnInit {
  public createTaskForm: FormGroup;

  public taskStatus = ['PENDING', 'IN_PROGRESS', 'DONE', 'DISCARDED'];
  public isEdit = false;
  public allUsers: Observable<User[]>;

  private taskId;

  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    private route: ActivatedRoute,
    @Optional() private dialogRef: MatDialogRef<CreateTaskPageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Task,
    private alertService: AlertService
  ) {
    this.createTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: TaskSatus.PENDING,
      users: [[]],
    });

    this.allUsers = this.store.select(selectAllUsers);

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
    if (this.createTaskForm.valid) {
      if (this.isEdit) {
        const { users, ...updatedTask } = this.createTaskForm.value;

        this.store.dispatch(
          TaskActions.EditTask({
            updates: { id: this.taskId, changes: updatedTask },
          })
        );
      } else {
        this.store.dispatch(
          TaskActions.CreateTask({
            task: { ...this.createTaskForm.value },
          })
        );
      }
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.isEdit = true;
      this.taskId = this.dialogData.id;
      this.createTaskForm.patchValue(this.dialogData);
    }
  }
}
