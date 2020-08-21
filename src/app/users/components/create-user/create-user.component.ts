import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RootState } from 'src/app/root.state';
import { Store } from '@ngrx/store';

import * as UserActions from '../../actions/user.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public createUserForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<RootState>) {
    this.createUserForm = this.fb.group({
      name: '',
      email: '',
      title: '',
    });
  }

  ngOnInit(): void {}

  createUser() {
    console.log(this.createUserForm.value);
    if (this.createUserForm.valid) {
      this.store.dispatch(
        UserActions.CreateUser({ user: this.createUserForm.value })
      );
    }
  }
}
