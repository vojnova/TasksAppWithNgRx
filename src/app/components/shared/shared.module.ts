import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSelectComponent } from '../user-select/user-select.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserSelectComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [UserSelectComponent],
})
export class SharedModule {}
