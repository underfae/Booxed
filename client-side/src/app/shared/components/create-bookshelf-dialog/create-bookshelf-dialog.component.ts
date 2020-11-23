import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-bookshelf-dialog',
  templateUrl: './create-bookshelf-dialog.component.html',
  styleUrls: ['./create-bookshelf-dialog.component.scss']
})
export class CreateBookshelfDialogComponent {

  constructor(protected dialogRef: MatDialogRef<CreateBookshelfDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: bookshelfDialogData) {
  }

  close(){
    this.dialogRef.close();
  }
}

export interface bookshelfDialogData{
  name: string;
  description: string;
}
