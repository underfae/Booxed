import { Component, Inject, OnInit } from '@angular/core';
import { Library } from '../../../core/points/library/library.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddToBookshelfDialogData } from '../add-to-bookshelf-dialog/add-to-bookshelf-dialog.component';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.scss'],
})
export class AddLibraryComponent implements OnInit {
  selectedLibraries = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddLibrariesDialogData) {}

  ngOnInit(): void {}
}
export class AddLibrariesDialogData {
  libraries: Library[];
}
