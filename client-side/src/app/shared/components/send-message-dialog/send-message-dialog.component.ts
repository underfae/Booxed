import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss'],
})
export class SendMessageDialogComponent {
  subject: string = '';
  text: string = '';

  constructor(protected dialogRef: MatDialogRef<SendMessageDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
