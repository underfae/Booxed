import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Bookshelf} from "../../../core/bookshelves/bookshelf.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookshelfService} from "../../../core/bookshelves/bookshelf.service";

@Component({
  selector: 'app-bookshelf-dialog',
  templateUrl: './bookshelf-dialog.component.html',
  styleUrls: ['./bookshelf-dialog.component.scss']
})
export class BookshelfDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BookshelfDialogData,
              protected router: Router,
              protected dialogRef: MatDialogRef<BookshelfDialogComponent>,
              protected snackBar: MatSnackBar,
              protected bookshelfService: BookshelfService
  ) {
  }

  ngOnInit(): void {
  }

  navigateToDetails(id: string) {
    this.dialogRef.close()
    this.router.navigateByUrl('/booxed/search/' + id)
  }

  deleteBook(id_book: string) {
    if (id_book) {
      this.bookshelfService.deleteBookFromBookshelf(id_book, this.data.bookshelf._id).subscribe(
        () => {
          this.snackBar.open('Book successfully deleted', 'OK', {duration: 2000});
          this.data.bookshelf.books.splice(this.data.bookshelf.books.findIndex(function (i) {
            return i.id_book === id_book;
          }), 1);
        },
        () => {
          this.snackBar.open('Book could not be deleted', 'OK', {duration: 4000});
        })
    }
  }
}

export class BookshelfDialogData {
  bookshelf: Bookshelf
}
