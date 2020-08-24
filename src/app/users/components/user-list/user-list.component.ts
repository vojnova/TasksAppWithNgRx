import {
  Component,
  OnInit,
  ViewChild,
  ComponentRef,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, selectAllUsers, selectUsersWithTasks } from 'src/app/root.state';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import * as UserActions from '../../actions/user.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  @ViewChild('confirmDialog') public confirmDialogRef: TemplateRef<HTMLElement>;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {
    this.users$ = this.store
      .select(selectUsersWithTasks)
      .pipe(tap((users) => console.log(users)));
  }

  ngOnInit(): void {}

  openCreateUserDialog() {}

  onUserRemove(user: User) {
    const dialogRef = this.dialog.open(this.confirmDialogRef);
    dialogRef.afterClosed().subscribe((remove) => {
      if (remove) {
        this.store.dispatch(UserActions.RemoveUser({ userId: user.id }));
      }
    });
  }
  onUserEdit(user: User) {}
}
