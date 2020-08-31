import { Injectable } from '@angular/core';
import { Task } from './models/task';
import { of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  public createTask(task: Task) {
    console.log('creating task')
    const id = uuid();
    return of({ ...task, id }).pipe(delay(1000));
  }
}
