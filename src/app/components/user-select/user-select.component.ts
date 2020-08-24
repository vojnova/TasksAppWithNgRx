import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  forwardRef,
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true,
    },
  ],
})
export class UserSelectComponent implements OnInit, ControlValueAccessor {
  userControl = new FormControl();
  filteredUsers: Observable<User[]>;
  users: User[] = [];

  @Input() allUsers: User[];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public OnChange: (value) => {};
  public OnTouch: () => {};

  public disabled = false;

  constructor() {
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(null),
      map((username: string | null) => {
        return username && username.length
          ? this._filter(username)
          : this.allUsers.slice();
      })
    );
  }

  writeValue(obj: any): void {
    console.log(obj);
    this.users = obj;
  }
  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.OnTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;

    this.disabled ? this.userControl.disable() : this.userControl.enable();
  }

  ngOnInit() {}

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
      this.OnChange(this.users);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.OnChange(this.users);
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
  }

  private _filter(username: string): User[] {
    const filterValue = username.toLowerCase();

    return this.allUsers.filter(
      (user) => user.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
