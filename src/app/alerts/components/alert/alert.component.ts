import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Alert, private alertRef: MatSnackBarRef<AlertComponent>) {}

  ngOnInit(): void {
  }

  close() {
    this.alertRef.dismiss()
  }

  confirm() {
    this.alertRef.dismissWithAction()
  }
}
