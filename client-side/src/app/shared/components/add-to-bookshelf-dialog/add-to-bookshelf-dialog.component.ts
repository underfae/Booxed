import {Component, Inject, OnInit} from '@angular/core';
import {Bookshelf} from "../../../core/bookshelves/bookshelf.model";
import {BookshelfService} from "../../../core/bookshelves/bookshelf.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-to-bookshelf-dialog',
  templateUrl: './add-to-bookshelf-dialog.component.html',
  styleUrls: ['./add-to-bookshelf-dialog.component.scss']
})
export class AddToBookshelfDialogComponent implements OnInit {

  bookshelves: Bookshelf[]
  selectedBookshelves=[];
  constructor(protected bookshelfService: BookshelfService, @Inject(MAT_DIALOG_DATA) public data: AddToBookshelfDialogData, protected snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.bookshelfService.getBookshelves(this.data.id_user).subscribe(
      (result:any) => {
        this.bookshelves = result
      },
      () => {
        this.snackBar.open('Could not fetch the bookshelves', 'OK', {duration: 2000})
      }
    )
  }

}

export class AddToBookshelfDialogData{
  id: string[];
  id_user: string
}
