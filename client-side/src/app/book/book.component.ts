import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddToBookshelfDialogComponent } from '../shared/components/add-to-bookshelf-dialog/add-to-bookshelf-dialog.component';
import { BooksService } from '../core/books/books.service';
import { BookshelfService } from '../core/bookshelves/bookshelf.service';
import { ModifiedUser, User } from '../core/user/user.model';
import { Movie } from '../core/shared/movie.model';
import { PreviewBook } from '../core/books/book.model';
import { SharedService } from '../core/shared/shared.service';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  movies: Movie[] = [];
  book: any;
  id: string;
  user: User;

  constructor(
    private route: ActivatedRoute,
    protected booksService: BooksService,
    protected userService: UserService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected bookshelfService: BookshelfService,
    protected sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.booksService.getBookById(this.id).subscribe((result: any) => {
        this.book = result;
        if (this.book) {
          this.sharedService
            .getMovies(this.book.volumeInfo.title)
            .subscribe((result: any) => {
              this.movies = result;
            });
        }
      });
    }
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user;
    });
  }

  getRatingValue(value) {
    return (value / 5.0) * 100;
  }

  checkIfLikedOrRead(checkValue: string): boolean {
    if (this.book) {
      if (checkValue === 'liked') {
        return this.user?.liked?.some((x) => x.id_book === this.book?.id);
      } else if (checkValue === 'read') {
        return this.user?.read?.some((x) => x.id_book === this.book?.id);
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddToBookshelfDialogComponent, {
      width: '400px',
      height: '400px',
      data: { id: [], id_user: this.user._id, id_book: this.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addToBookshelf(result);
      }
    });
  }

  addToBookshelf(id: string[]) {
    id.forEach((id: string) => {
      let previewBook = new PreviewBook();
      previewBook.id_book = this.book?.id;
      previewBook.image = this.book.volumeInfo.imageLinks.smallThumbnail;
      previewBook.authors = this.book.volumeInfo.authors;
      previewBook.title = this.book.volumeInfo.title;
      this.bookshelfService
        .addBookToBookshelf(previewBook, id)
        .subscribe((result: any) => {
          console.log(result);
        });
    });
  }

  addToLikedOrRead(action: string) {
    const modifiedUser = new ModifiedUser();
    const newBook = new PreviewBook();

    newBook.id_book = this.book?.id;
    newBook.authors = this.book?.volumeInfo?.authors;
    newBook.title = this.book?.volumeInfo?.title;
    newBook.image = this.book?.volumeInfo?.imageLinks?.smallThumbnail;

    modifiedUser.points = this.user.points;
    modifiedUser.id = this.user._id;
    modifiedUser.liked = this.user.liked;
    modifiedUser.read = this.user.read;

    if (action === 'liked') {
      modifiedUser.liked.push(newBook);
    } else if (action === 'read') {
      modifiedUser.read.push(newBook);
      modifiedUser.points += 3;
    }
    this.userService.modifyUser(modifiedUser).subscribe(
      () => {
        this.snackBar.open('List succesfully updated', 'OK', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('List could not be updated', 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
