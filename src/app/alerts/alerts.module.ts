import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from '../material/material.module';
import { EffectsModule } from '@ngrx/effects';

import { AlertEffects } from './effects/alert.effects';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([AlertEffects]),
  ],
})
export class AlertsModule {}
