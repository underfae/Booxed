import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Library } from '../../../core/points/library/library.model';

@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.scss'],
})
export class AddLibraryComponent {
  selectedLibraries = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddLibrariesDialogData) {}
}

export class AddLibrariesDialogData {
  libraries: Library[];
}
