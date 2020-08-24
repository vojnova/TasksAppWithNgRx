import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './root.state';
import { CreateMultipleUsers } from './users/actions/user.actions';
import { createTestUser } from './users/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tasks';

  constructor(private store: Store<RootState>) {
    const testUsers = new Array(this.getRandomInt(10))
      .fill(0)
      .map((_) => createTestUser());
    console.log(testUsers);

    this.store.dispatch(CreateMultipleUsers({users: testUsers}))
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
