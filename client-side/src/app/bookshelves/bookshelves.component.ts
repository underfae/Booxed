import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Bookshelf } from '../core/bookshelves/bookshelf.model';
import { BookshelfDialogComponent } from '../shared/components/bookshelf-dialog/bookshelf-dialog.component';
import { BookshelfService } from '../core/bookshelves/bookshelf.service';
import { CreateBookshelfDialogComponent } from '../shared/components/create-bookshelf-dialog/create-bookshelf-dialog.component';
import { User } from '../core/user/user.model';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.scss'],
})
export class BookshelvesComponent implements OnInit {
  addedBookshelf = new Bookshelf();
  bookshelves: Bookshelf[] = [];
  description: string;
  name: string;
  user = new User();

  constructor(
    protected bookshelfService: BookshelfService,
    protected cdr: ChangeDetectorRef,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user;
      if (this.user) {
        this.bookshelfService
          .getBookshelves(this.user._id)
          .subscribe((result: Bookshelf[]) => {
            this.bookshelves = result;
          });
      }
    });
  }

  addBookshelf(): void {
    this.addedBookshelf.books = [];
    this.addedBookshelf.creation_date = new Date();
    this.addedBookshelf.id_user = this.user._id;

    this.bookshelfService.addBookshelf(this.addedBookshelf).subscribe(
      (result: Bookshelf) => {
        this.snackBar.open('Bookshelf added succesfully.', 'OK', {
          duration: 2000,
        });
        this.bookshelves.push(result);
        this.cdr.detectChanges();
      },
      () => {
        this.snackBar.open('Could not add a bookshelf', 'OK', {
          duration: 4000,
        });
      }
    );
  }

  deleteBookshelf(id: string): void {
    event.stopPropagation();
    if (id) {
      this.bookshelfService.deleteBookshelf(id).subscribe(
        () => {
          this.snackBar.open('Bookshelf deleted succesfully.', 'OK', {
            duration: 2000,
          });
          this.bookshelves.splice(
            this.bookshelves.findIndex(function (i) {
              return i._id === id;
            }),
            1
          );
        },
        () => {
          this.snackBar.open('Could not delete a bookshelf', 'OK', {
            duration: 4000,
          });
        }
      );
    }
  }

  openBookshelfDialog(bookshelf: Bookshelf): void {
    this.dialog.open(BookshelfDialogComponent, {
      width: '600px',
      maxHeight: '600px',
      data: { bookshelf: bookshelf },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBookshelfDialogComponent, {
      width: '400px',
      height: '400px',
      data: { name: this.name, description: this.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedBookshelf = result;
        this.addBookshelf();
      }
    });
  }
}
